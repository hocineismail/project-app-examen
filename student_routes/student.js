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
        console.log('RESULT ', { ...userData, ...studentData })
        res.json({
          ...userData,
          ...studentData
        })
      })
  })
})

app.post('/:id', (req, res) => {
  console.log('POST')
  let id = req.params.id
  console.log('id', id)
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

  User.findById(id, (u) => {
    console.log('user: ', u)
  })
  User.update(
    { _id: id },
    { $set: bodyUser },
    (err, userQueryResult) => {
      if (err) {
        console.log(err)
        return returnErrorMessage(res, err, 400)
      }
      console.log('User updated:', userQueryResult)

      if (!_.isEmpty(bodyStudent)) {
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
                    Student.updateOne(
                      { user: id },
                      { $set: bodyStudent },
                      (err, studentQueryResult) => {
                        if (err) {
                          return returnErrorMessage(res, err, 400)
                        }
                        return res.send('Student updated')
                      }
                    )
                  }
                )
              }
            )
          }
        )
      }
    }
  )

  return res.send('Student updated')
})

module.exports = app
