const express = require('express')
const app = express.Router()

const Student = require('../models/student')
const User = require('../models/user')
const Semster = require('../models/semster')
const Level = require('../models/level')
const Phase = require('../models/phase')

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
  
})

module.exports = app
