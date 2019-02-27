const express = require('express')
const app = express.Router()
const fs = require('fs')
const ps = require('python-shell')

app.get('/:exam&:name&:date', (req, res) => {
  try {
    fs.unlinkSync(__dirname + '/output.png')
  } catch (err) {
    console.log('ERR')
  } finally {
    let examName = req.params.exam
    let studentName = req.params.name
    let date = req.params.date

    var options = {
      mode: 'text',
      pythonPath: '/Users/mac/anaconda3/bin/python3',
      pythonOptions: ['-u'],
      args: [examName, studentName, date]
    }

    ps.PythonShell.run(__dirname + '/image.py', options, (err, results) => {
      if (err) throw err

      return res.sendFile(__dirname + '/output.png')
    })
  }
})

module.exports = app
