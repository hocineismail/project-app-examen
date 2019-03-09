var mongoose = require("mongoose");

var Schema = mongoose.Schema
var examSchema = Schema({
 Exam: { type: String, required: true },
 Etat:  { type: Boolean },
IsValid:  { type: Boolean, default: false },
 EtatFinal:  { type: Boolean, default: false },
 NumberOfExam: { type: Number, required: true },
 IsOfficial: { type: Boolean, required: true },
 Time: {type: Number, required: true},
 Date: {type: Date, required: true},
 createdAt: { type: Date, default: Date.now },
 module: {
    type: Schema.Types.ObjectId,
    ref: 'Module'
  },
 
});

var Exam = mongoose.model("Exam", examSchema);
module.exports = Exam;