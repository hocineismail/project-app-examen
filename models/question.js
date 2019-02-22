var mongoose = require("mongoose");

var Schema = mongoose.Schema
var questionSchema = Schema({
 Question: { type: String},
 Response: { type: String, required: true},
 QuestionImage: { type: String},
 NameOfCourse:  { type: String, required: true  },
 TypeOfQuestion:  { type: String, required: true  },
 Chapiter:  { type: String, required: true  },
 LevelOfQuestion:  { type: String },
 Difficulty: {type: String, required: true },
 NotValid:  { type: Boolean, default: false  },
 IsValidOne:  { type: Boolean, default: false  },
 TeacherOne:  { type: String,  },
 IsValidTwo:  { type: Boolean, default: false  },
 TeacherTwo:  { type: String,  },
 IsValidFinal:  { type: Boolean, default: false  },
 TeacherFinal:  { type: String,  },
 ErrorMessage:  { type: String, },
 createdAt: { type: Date, default: Date.now },
 exam: {
    type: Schema.Types.ObjectId,
    ref: 'Exam'
  }
  
});

var Question = mongoose.model("Question", questionSchema);
module.exports = Question;