var mongoose = require("mongoose");

var Schema = mongoose.Schema
var pubSchema = Schema({
 Pub: { type: String, required: true },
 createdAt: { type: Date, default: Date.now }
});

var Pub = mongoose.model("Pub", pubSchema);
module.exports = Pub;