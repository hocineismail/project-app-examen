var mongoose = require("mongoose");

var Schema = mongoose.Schema
var phaseSchema = Schema({
 Phase: { type: String, required: true },
 NumberOfPhase: { type: Number, required: true },
 createdAt: { type: Date, default: Date.now },

});

var Phase = mongoose.model("Phase", phaseSchema);
module.exports = Phase;