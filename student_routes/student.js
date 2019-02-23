const express = require('express')
const app = express.Router()

const Student = require('../models/student')
const User = require('../models/user')
const Semster = require('../models/semster')
const Level = require('../models/level')
const Phase = require('../models/phase')
const Module = require('../models/module')
const Exam = require('../models/exam')

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
      .exec((err, student) => {
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
          'email',
          'Phase',
          'Level',
          'semster'
        ])
        let studentData = _.pick(student, ['Phase', 'Level', 'semster'])
        res.json({
          ...userData,
          ...studentData
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
    'email'
  ])

  let bodyStudent = _.pick(req.body, ['Phase', 'Level', 'semster'])

  updateUser(id, bodyUser)
    .then(userQueryResult => {
      Semster.findOne(
        {
          Semster: bodyStudent.semster
        },
        (err, sem) => {
          bodyStudent.semster = sem._id
          Level.findOne(
            {
              Level: bodyStudent.Level
            },
            (err, lvl) => {
              bodyStudent.Level = lvl._id

              Phase.findOne(
                {
                  Phase: bodyStudent.Phase
                },
                (err, phase) => {
                  bodyStudent.Phase = phase._id

                  updateStudent(id, bodyStudent)
                    .then(studentQueryResult => {
                      return res.json('User updated successfully')
                    })
                    .catch(err => {
                      if (err) {
                        return returnErrorMessage(res, err, 400)
                      }
                    })
                }
              )
            }
          )
        }
      )
    })
    .catch(err => {
      if (err) {
        return returnErrorMessage(res, err, 400)
      }
    })
})

function updateUser(id, data) {
  return new Promise((resolve, reject) => {
    User.update({ _id: id }, { $set: data }, (err, userQueryResult) => {
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

  let sync = false

  Student.findOne({ user: id })
    .populate('semster')
    .exec((err, student) => {
      if (err) {
        return returnErrorMessage(res, err, 400)
      }
      console.log('1')
      Module.find({ semster: student.semster._id }).exec(
        async (err, modules) => {
          if (err) {
            return returnErrorMessage(res, err, 400)
          }
          try {
            console.log('2')
            result = Promise.all(getAllExamsOfStudent(modules)).then(completed => {
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
    if (err){
      return returnErrorMessage(res, err, 400)
    }
    return res.json(exam)
  })

})

const getAllExamsOfStudent = modules => {
  console.log('3')
  return modules.map(async module => ({
    Module: module.Module,
    Exams: await Exam.find({ module: module._id, Etat: true })
  }))
}


module.exports = app
