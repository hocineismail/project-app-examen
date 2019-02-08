var bcrypt = require("bcrypt-nodejs");
var mongoose = require("mongoose");
var SALT_FACTOR = 10;

var userSchema = mongoose.Schema({
   Firstname: {type: String, required: true,},
   Lastname: {type: String, required: true,},
    Birthday: {type: Date,required: true, },
    Address: {type: String, required: true,},
    Phone: {type: Number, required: true,},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
     createdAt: { type: Date, default: Date.now },


});

var noop = function() {};
userSchema.pre("save", function(done) {
 var user = this;
 if (!user.isModified("password")) {
 return done();
 }
 bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
 if (err) { return done(err); }
 bcrypt.hash(user.password, salt, noop, function(err, hashedPassword) {
 if (err) { return done(err); }
 user.password = hashedPassword;
 done();
 });
 });
});
userSchema.methods.checkPassword = function(guess, done) {
    bcrypt.compare(guess, this.password, function(err, isMatch) {
    done(err, isMatch);
    });
   };
   userSchema.methods.name = function() {
    return this.displayName || this.username;
   };


   var User = mongoose.model("User", userSchema);
module.exports = User;