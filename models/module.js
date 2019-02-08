var mongoose = require("mongoose");

var Schema = mongoose.Schema
var moduleSchema = Schema({
 Module: { type: String, required: true },
 NumberOfModule: { type: Number, required: true },
 createdAt: { type: Date, default: Date.now },
 semster: [{
    type: Schema.Types.ObjectId,
    ref: 'Semster'
  }]
});

var Module = mongoose.model("Module", moduleSchema);
module.exports = Module;