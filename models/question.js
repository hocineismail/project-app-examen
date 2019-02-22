var mongoose = require("mongoose");

var Schema = mongoose.Schema
var questionSchema = Schema({
 Question: { type: String},
 Response: { type: String},
 QuestionImage: { type: String},
 NameOfCourse:  { type: String, required: true  },
 TypeOfQuestion:  { type: String, required: true  },
 LevelOfQuestion:  { type: String, required: true  },
 Difficulty: {type: String, required: true },
 NotValide:  { type: Boolean, default: false  },
 IsValideOne:  { type: Boolean, default: false  },
 TeacherOne:  { type: String,  },
 IsValideTwo:  { type: Boolean, default: false  },
 TeacherTwo:  { type: String,  },
 IsValideFinal:  { type: Boolean, default: false  },
 TeacherFinal:  { type: String,  },
 ErrorMessage:  { type: String, },
 createdAt: { type: Date, default: Date.now },
 exam: {
    type: Schema.Types.ObjectId,
    ref: 'Exam'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

var Question = mongoose.model("Question", questionSchema);
module.exports = Question;