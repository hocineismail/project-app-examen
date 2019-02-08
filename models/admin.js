
var mongoose = require("mongoose");

var Schema = mongoose.Schema
var adminSchema = Schema({
 Role: { type: String, required: true },
 createdAt: { type: Date, default: Date.now },
 user: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
});

var Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;