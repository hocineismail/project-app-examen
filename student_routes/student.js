const express = require('express')
const app = express.Router()

const Student = require('../models/student')
const User = require('../models/user')
const Semster = require('../models/semster')
const Level = require('../models/level')
const Phase = require('../models/phase')
const Module = require('../models/module')
const Exam = require('../models/exam')
const Question = require('../models/question')
const Response = require('../models/response')

const _ = require('lodash')

function returnErrorMessage(res, err, statusCode) {
  return res.status(statusCode).json({
    type: 'error',
    errorMessage: err
  })
}

app.get('/:id', (req, res) => {
  let id = _.pick(req.params, ['id']).id
  User.findById(id, (err, user) => {
    if (err) {
      return returnErrorMessage(res, err, 400)
    }
    if (!user) {
      return returnErrorMessage(res, err, 204)
    }

    Student.findOne({ user: id })
      .populate('Level')
      .populate('semster')
      .populate('Phase')
      .exec(async (err, student) => {
        if (err) {
          return errorMessage(res, err, 400)
        }
        let userData = _.pick(user, [
          'Firstname',
          'Lastname',
          'Birthday',
          'Sexe',
          'Address',
          'Phone',
          'email'
        ])
        let studentData = _.pick(student, [
          'Phase',
          'Level',
          'semster',
          'exams'
        ])
        let exams = []
        Promise.all(
          studentData.exams.map(async exam => {
            exName = await Exam.findById(exam.Exam).select('Exam')
            exams.push({
              Exam: exam._id,
              Grade: exam.Grade,
              examName: exName.Exam,
              Date: exam.Date
            })
          })
        ).then(completed => {
          studentData.exams = exams
          res.json({
            ...userData,
            ...studentData
          })
        })
      })
  })
})

app.post('/:id', (req, res) => {
  let id = req.params.id
  let bodyUser = _.pick(req.body, [
    'Firstname',
    'Lastname',
    'Birthday',
    'Sexe',
    'Address',
    'Phone',
    'password'
  ])
  let bodyStudent = _.pick(req.body, ['Phase', 'Level', 'semster'])
  updateUser(id, bodyUser)
    .then(userQueryResult => {
      if (bodyUser.Birthday) {
        User.findById(id).exec((err, dataBack) => {
          if (err) {
            return returnErrorMessage(res, err, 400)
          }
          dataBack.Birthday = new Date(bodyUser.Birthday).toISOString()
          dataBack.save()
        })
      }
      Phase.findOne({
        Phase: bodyStudent.Phase
      })
        .then(phase => {
          console.log("Phase : ", phase._id)
          bodyStudent.Phase = phase._id
          Level.findOne({
            Level: bodyStudent.Level,
            phase: bodyStudent.Phase
          })
            .then(level => {
              console.log("Level : ", level._id)
              bodyStudent.Level = level._id
              Semster.findOne({
                level: bodyStudent.Level,
                Semster: bodyStudent.semster
              })
                .then(semster => {
                  console.log("Semester : ", semster._id)
                  bodyStudent.semster = semster._id
                  updateStudent(id, bodyStudent)
                    .then(studentQueryResult => {
                      console.log(studentQueryResult)
                      return res.json('User updated successfully')
                    })
                    .catch(err => {
                      if (err) {
                        return returnErrorMessage(res, err, 400)
                      }
                    })
                })
                .catch(err => {})
            })
            .catch(err => {})
        })
        .catch(err => {})
      // Semster.findOne(
      //   {
      //     Semster: bodyStudent.semster
      //   },
      //   (err, sem) => {
      //     bodyStudent.semster = sem._id
      //     Level.findOne(
      //       {
      //         Level: bodyStudent.Level
      //       },
      //       (err, lvl) => {
      //         bodyStudent.Level = lvl._id

      //         Phase.findOne(
      //           {
      //             Phase: bodyStudent.Phase
      //           },
      //           (err, phase) => {
      //             bodyStudent.Phase = phase._id
      //           }
      //         )
      //       }
      //     )
      //   }
      // )
    })
    .catch(err => {
      if (err) {
        return returnErrorMessage(res, err, 400)
      }
    })
})

function updateUser(id, data) {
  if (data.password) {
    User.findById(id, (err, user) => {
      user.password = data.password
      user.save()
    })
  }
  return new Promise((resolve, reject) => {
    User.updateOne({ _id: id }, { $set: data }, (err, userQueryResult) => {
      if (err) {
        reject(err)
      } else {
        resolve(userQueryResult)
      }
    })
  })
}

function updateStudent(id, data) {
  return new Promise((resolve, reject) => {
    Student.updateOne(
      { user: id },
      {
        $set: data
      },
      (err, studentQuery) => {
        if (err) {
          reject(err)
        } else {
          resolve(studentQuery)
        }
      }
    )
  })
}

app.get('/modules/:id', (req, res) => {
  let id = req.params.id

  Student.findOne({ user: id })
    .populate('Level')
    .populate('semster')
    .populate('Phase')
    .exec((err, student) => {
      if (err) {
        return returnErrorMessage(res, err, 400)
      }
      Module.find({
        semster: student.semster._id
      })
        .select('Module')
        .exec((err, modules) => {
          if (err) {
            return returnErrorMessage(res, err, 400)
          }
          return res.json(modules)
        })
    })
})

app.get('/exams/:id', (req, res) => {
  let id = req.params.id
  let examsTable

  Student.findOne({ user: id })
    .populate('semster')
    .exec((err, student) => {
      if (err) {
        return returnErrorMessage(res, err, 400)
      }
      Module.find({ semster: student.semster._id }).exec(
        async (err, modules) => {
          if (err) {
            return returnErrorMessage(res, err, 400)
          }
          try {
            result = Promise.all(
              getAllExamsOfStudent(modules, student.exams)
            ).then(completed => {
              examsTable = completed
              return res.json(examsTable)
            })
          } catch (err) {
            throw err
          }
        }
      )
    })
})

app.get('/exam/:id', (req, res) => {
  let id = req.params.id

  Exam.findById(id, (err, exam) => {
    if (err) {
      return returnErrorMessage(res, err, 400)
    }
    return res.json(exam)
  })
})

app.get('/examquestions/:id', (req, res) => {
  let id = req.params.id
  Exam.findOne(
    {
      _id: id,
      Etat: true
    },
    ['Exam', 'Time', 'NumberOfExam'],
    (err, exam) => {
      if (err) {
        return returnErrorMessage(res, err, 400)
      }
      if (exam) {
        let examData = {
          examInfo: {},
          questions: []
        }
        let examId = exam._id
        examData['examInfo'] = exam
        Question.find(
          {
            exam: examId,
            IsValidFinal: true
          },
          async (err, questions) => {
            if (err) {
              return returnErrorMessage(res, err, 400)
            }
            for (let i = 0; i < questions.length; i++) {
              let rsp = await Response.find({
                question: questions[i]._id
              }).select(['ResponseText', 'ResponseImage'])
              examData.questions.push({
                question: questions[i],
                responses: rsp
              })
            }
            return res.json(examData)
          }
        )
      } else {
        return returnErrorMessage(res, err, 400)
      }
    }
  )
})

app.post('/exam/getresult/:id', async (req, res) => {
  let id = req.params.id
  let responses = _.pick(req.body, ['responses'])
  let examId = _.pick(req.body, ['examId'])
  let numberOfQuestions = req.body.questionNumber
  let score = 0
  let correctResponses = []
  console.log('POST Student')
  Promise.all(
    responses.responses.map(async response => {
      let selectedResponse = await Response.findById(response)
      console.log('RESPONSE')
      if (selectedResponse.IsCorrect) {
        score++
      }
    })
  ).then(completed => {
    studentExamOutput = {
      Exam: examId.examId,
      Grade: (score * 100) / numberOfQuestions
    }
    console.log('OUTPUT')
    console.log(studentExamOutput)
    Student.updateOne(
      { user: id },
      {
        $push: {
          exams: studentExamOutput
        }
      },
      (err, returnedQuery) => {
        if (err) {
          return returnErrorMessage(res, err, 400)
        }
        Question.find(
          {
            exam: examId.examId
          },
          (err, questions) => {
            if (err) {
              return returnErrorMessage(res, err, 400)
            }
            Promise.all(
              questions.map((question, k) => {
                console.log('GRADE')
                correctResponses.push({
                  questionNumber: k,
                  correctResponse: question.Response
                })
              })
            ).then(completed => {
              return res.json({
                message: 'Inserted Successfully',
                grade: (score * 100) / numberOfQuestions,
                correctResponses
              })
            })
          }
        )
      }
    )
  })
})

const getAllExamsOfStudent = (modules, previousExams) => {
  let previousExamsId = []
  previousExams.map(exam => {
    previousExamsId.push(exam.Exam)
  })
  return modules.map(async module => ({
    Module: module.Module,
    Exams: await Exam.find({
      module: module._id,
      Etat: true,
      _id: { $nin: previousExamsId }
    })
  }))
}

module.exports = app
