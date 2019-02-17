var mongoose = require("mongoose");

var Schema = mongoose.Schema
var levelSchema = Schema({
 Level: { type: String, required: true },
 NumberOfLevel: { type: Number, required: true },
 createdAt: { type: Date, default: Date.now },
 phase: {
    type: Schema.Types.ObjectId,
    ref: 'Phase'
  }
});

var Level = mongoose.model("Level", levelSchema);
module.exports = Level;