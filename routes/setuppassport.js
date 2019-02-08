var passport = require("passport");
var User = require("../models/user");
var LocalStrategy = require("passport-local").Strategy;

module.exports = function() {
 passport.serializeUser(function(user, done) {
 done(null, user._id);
 });
 passport.deserializeUser(function(id, done) {
 User.findById(id, function(err, user) {
 done(err, user);
 });
 });
};
passport.use("login", new LocalStrategy(
     function(email, password, done) {
     User.findOne({ email: email }, function(err, user) {
     if (err) { return done(err); }
     if (!user) {
     return done(null, false,
      { message: "No user has that email!" });
     }
     user.checkPassword(password, function(err, isMatch) {
     if (err) { return done(err); }
     if (isMatch) {
     return done(null, user);
     } else {
     return done(null, false,
     { message: "Invalid password." });
     }
     });
     });
    }));