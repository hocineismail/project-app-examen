
var mongoose = require("mongoose");

var Schema = mongoose.Schema
var studentSchema = Schema({
 Phase: { type: String, required: true },
 Level:  { type: String, required: true },
 createdAt: { type: Date, default: Date.now },
 user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

var Student = mongoose.model("Student", studentSchema);
module.exports = Student;