const express = require('express')
const app = express.Router()

const Student = require('../models/student')
const User = require('../models/user')

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
        console.log(student)
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

module.exports = app
