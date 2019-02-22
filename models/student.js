var mongoose = require('mongoose')

var Schema = mongoose.Schema
var studentSchema = Schema({
  Phase: { type: Schema.Types.ObjectId, required: true, ref: 'Phase' },
  Level: { type: Schema.Types.ObjectId, required: true, ref: 'Level' },
  createdAt: { type: Date, default: Date.now },
  semster: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Semster'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  exams: [{
    type: Schema.Types.ObjectId,
    ref: 'Exam'
  }, {
    type: Number
  }]
})

var Student = mongoose.model('Student', studentSchema)
module.exports = Student
