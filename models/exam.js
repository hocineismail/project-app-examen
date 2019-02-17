var mongoose = require("mongoose");

var Schema = mongoose.Schema
var examSchema = Schema({
 Exam: { type: String, required: true },
 Etat:  { type: Boolean, required: true  },
 NumberOfExam: { type: Number, required: true },
 IsOfficial: { type: Boolean, required: true },
 Time: {type: String, required: true},
 Date: {type: Date, required: true},
 createdAt: { type: Date, default: Date.now },
 module: {
    type: Schema.Types.ObjectId,
    ref: 'Module'
  }
});

var Exam = mongoose.model("Exam", examSchema);
module.exports = Exam;