var express = require("express");
var user = express.Router();
var async =  require("async");
var nodemailer = require('nodemailer');
var User = require("../models/user")
var Phase = require("../models/phase");
 var Semster = require("../models/semster");
 var Level = require("../models/level");
 var Module = require("../models/module");
 var Exam = require("../models/exam");
var crypto = require("crypto");
user.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.errors = req.flash("error");
    res.locals.infos = req.flash("info");
    next();
   });
	 
	


user.get("/login",function(req,res){
    res.render("login")
})
user.get("/forgot",function(req,res){
    res.render("forgot")
})
user.get("/signup",function(req,res){
	res.render("signup")
})



user.post('/forgot', function(req, res, next) {
	async.waterfall([
	  function(done) {
		crypto.randomBytes(20, function(err, buf) {
		  var token = buf.toString('hex');
		  done(err, token);
		});
	  },
	  function(token, done) {
		User.findOne({ email: req.body.email }, function(err, user) {
		  if (!user) {
			req.flash('error', 'No account with that email address exists.');
			return res.redirect('/forgot');
		  }
  
		  user.resetPasswordToken = token;
		  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  
		  user.save(function(err) {
			done(err, token, user);
		  });
		});
	  },
	  function(token, user, done) {
		var smtpTransport = nodemailer.createTransport({
		  service: 'Gmail',
		  auth: {
			user: 'maelrolland03@gmail.com',
			pass: 'fuck1love'
		  }
		});
		var mailOptions = {
		  to: user.email,
		  from: 'maelrolland@gmail.com',
		  subject: 'Node.js Password Reset',
		  text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
			'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
			'http://' + req.headers.host + '/reset/' + token + '\n\n' +
			'If you did not request this, please ignore this email and your password will remain unchanged.\n'
		};
		smtpTransport.sendMail(mailOptions, function(err) {
		  req.flash('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
		  done(err, 'done');
		});
	  }
	], function(err) {
	  if (err) return next(err);
	  res.redirect('/forgot');
	});
  });




	// the route for reset the password
  user.get('/reset/:token', function(req, res) {
	User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
	  if (!user) {
		req.flash('error', 'Password reset token is invalid or has expired.');
		return res.redirect('/forgot');
	  }
	  res.render('reset', {token: req.params.token
	  });
	});
  });
  user.post('/reset/:token', function(req, res) {
	async.waterfall([
	  function(done) {
		User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
		  if (!user) {
			req.flash('error', 'Password reset token is invalid or has expired.');
			return res.redirect('back');
		  }
          console.log(req.body.password)

		  user.password = req.body.password;
		  user.resetPasswordToken = undefined;
		  user.resetPasswordExpires = undefined;
         		  user.save(function(err) {
			req.logIn(user, function(err) {
			  done(err, user);
			});
		  });
		});
	  },
	  function(user, done) {
		var smtpTransport = nodemailer.createTransport({
		  service: 'Gmail',
		  auth: {
			user: 'maelrolland03@gmail.com',
			pass: 'fuck1love'
		  }
		});
		var mailOptions = {
		  to: user.email,
		  from: 'maelrolland03@gmail.com',
		  subject: 'Your password has been changed',
		  text: 'Hello,\n\n' +
			'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
		};
		smtpTransport.sendMail(mailOptions, function(err) {
		  req.flash('success', 'Success! Your password has been changed.');
		  res.redirect('/signup');
		  done(err);
		});
	  }
	], function(err) {
	  res.redirect('/');
	});
	});
	


	user.get("/admin", function(req,res){

    Phase.find({},function(err,phase){
     
        
          res.render("admin",{phases: phase}) 
        
      
    })
 
});




user.get("/admin/deletephase/:_id",   function(req, res, next) {
 
	Phase.findOneAndRemove( { _id: req.params._id } , function(err, phase) {
			if (err) { return next(err); }
			if (!phase) { return next(404); }
	 
			req.flash("error", "تم الحدف");
			res.redirect("/admin")
			
		 
		})});
		user.get("/admin/:phase", function(req,res){

			Phase.findOne({Phase: req.params.phase},function(err,onephase){
				if (!onephase) {return res.redirect("/admin")}
			 console.log(onephase)
				Level.find({phase: onephase._id},function(err,level){
					console.log(level)
						res.render("level",{levels: level,onephases: onephase}) 
					
				
					})			})
	 
	});

	user.get("/admin/phase/:level", function(req,res){

		Level.findOne({Level: req.params.level},function(err,onelevel){
			if (!onelevel) {return res.redirect("/admin")}
		 console.log(onelevel)
			Semster.find({level: onelevel._id},function(err,semster){
				console.log(semster)
					res.render("semster",{semsters: semster,onelevels: onelevel}) 
				
			
				})			})
 
});

user.get("/admin/laevel/:id", function(req,res){
console.log("dakhel hena ya namiiii")
	Semster.findOne({_id: req.params.id},function(err,onesemster){
		if (!onesemster) {return res.redirect("/admin")}
	 console.log(onesemster)
		Module.find({semster: onesemster._id},function(err,module){
			console.log(module)
				res.render("module",{modules: module,onesemsters: onesemster}) 
			
		
			})			})

});

	


user.get("/admin/exam/:id", function(req,res){
	console.log("dakhel hena ya namiiii")
		Module.findOne({_id: req.params.id},function(err,onemodule){
			if (!onemodule) {return res.redirect("/admin")}
		 console.log(onemodule)
			Exam.find({module: onemodule._id},function(err,exam){
				console.log(exam)
					res.render("exam",{exams: exam,onemodules: onemodule}) 
				
			
				})			})
	
	});
	
		
  user.get("/admin/deletesemster/:_id",   function(req, res, next) {
 
		Semster.findOneAndRemove( { _id: req.params._id } , function(err, semster) {
				if (err) { return next(err); }
				if (!semster) { return next(404); }
		 
				req.flash("error", "تم الحدف");
				res.redirect("/admin")
				
			 
			})});
module.exports = user;