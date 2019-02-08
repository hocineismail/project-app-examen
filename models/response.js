var mongoose = require("mongoose");

var Schema = mongoose.Schema
var reponseSchema = Schema({
 ResponseText: { type: String,  },
 ResponseImage: { type: Number,},
 IsCorrect: { type: Boolean, required: true},
 createdAt: { type: Date, default: Date.now },
 question: [{
    type: Schema.Types.ObjectId,
    ref: 'Question'
  }]
});

var Response = mongoose.model("Response", reponseSchema);
module.exports = Response;