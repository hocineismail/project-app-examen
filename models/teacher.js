
var mongoose = require("mongoose");

var Schema = mongoose.Schema
var teacherSchema = Schema({
 Phase: { type: String, required: true },
 Speciality: {type: String, required: true },
 Actif: { type: Boolean,  default: false },
 createdAt: { type: Date, default: Date.now },
 user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

var Teacher = mongoose.model("Teacher", teacherSchema);
module.exports = Teacher;