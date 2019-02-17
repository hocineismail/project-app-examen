var mongoose = require("mongoose");

var Schema = mongoose.Schema
var semsterSchema = Schema({
 Semster: { type: String, required: true },
 NumberOfSemster: { type: Number, required: true },
 createdAt: { type: Date, default: Date.now },
 level: {
    type: Schema.Types.ObjectId,
    ref: 'Level'
  }
});

var Semster = mongoose.model("Semster", semsterSchema);
module.exports = Semster;