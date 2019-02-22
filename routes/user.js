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
 var passport = require("passport");

 var Question = require("../models/question");
 var Teacher = require("../models/teacher");
 var Student = require("../models/student");
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
var phases;
var levels;
	async.series([function(callback){
      
		Phase.find({},function(err,phase){
				if(err) return callback(err);
				phases = phase;
				callback(null,phases);
		})
},function(callback){
		Level.find({},function(err,level){
				if(err) return callback(err);
				levels = level;
				callback(null,levels);
		})
}
],function(err){
	

	res.render("signup",{levels: levels, phases: phases})
	})
})

user.post("/signup", function(req, res) {
	var Firstname = req.body.Firstname;
	var email = req.body.username;
	var Lastname =  req.body.Lastname;
	var Birthday = req.body.Birthday;
	var Sexe = req.body.Sexe;
	var Role = req.body.Role;

	var Address =  req.body.Address;
	var Phone = req.body.Phone;

	var password = req.body.password;

	User.findOne({ email: email }, function(err, user) {
	if (err) { return next(err); }
	if (user) {
	req.flash("error", "User already exists");
	return res.redirect("/signup");
	}
	var newUser = new User({
	Firstname: Firstname,
	email: email,
	Lastname: Lastname,
	Birthday: Birthday,
	Sexe: Sexe,
	Role: Role,
	Address: Address,
	Phone: Phone,
	password: password,  
});
	newUser.save({},function(err, success){
		if (err) { console.log( "ay tnaket azebiii ")}
		if (success) {
			if ( newUser.Role === "Student"){
				var newStudent = new Student({
					Phase: req.body.Phase,
					Level: req.body.Level,
					user: newUser._id,
		
				});
				newStudent.save();
				console.log(newStudent)
			} else  {
				var newTeacher = new Teacher({
					Speciality: req.body.Speciality,
					Phase: req.body.Phase,
					user: newUser._id,
				 });
				 newTeacher.save();
				 console.log(newTeacher)
				 res.redirect("/login")
			}
		 }
	});
	});
 },passport.authenticate("login", {
	 
	successRedirect: "/",
	failureRedirect: "/signup",
	failureFlash: true
 }));
 
 user.get("/logout", function(req, res) {
	req.logout();
	res.redirect("/");
 });


user.post("/login", passport.authenticate("login", {
	successRedirect: "/admin",
	failureRedirect: "/login",
	failureFlash: true
 }));


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
	
		if ( " req.user.Firstname" != "Teacher") {
		var phases;
    var levels;
    var semsters;
    var modules;
    var admins;
		var teachers;
		var students;

    async.series([function(callback){
      
        Phase.find({},function(err,phase){
            if(err) return callback(err);
            phases = phase;
            callback(null,phases);
        })
    },function(callback){
        Level.find({},function(err,level){
            if(err) return callback(err);
            levels = level;
            callback(null,levels);
        })
    },function(callback){
        Semster.find({},function(err,semster){
            if(err) return callback(err);
            semsters = semster;
            callback(null,semsters);
        })
    },function(callback){
			User.countDocuments({Role: "Admin"},function(err,admin){
					if(err) return callback(err);
					admins = admin;
					callback(null,admins);
			})
		},function(callback){
			User.countDocuments({Role: "Teacher"},function(err,teacher){
					if(err) return callback(err);
					teachers = teacher;
					callback(null,teachers);
			})
		},function(callback){
			User.countDocuments({Role: "Student"},function(err,student){
					if(err) return callback(err);
					students = student;
					callback(null,students);
			})
	},function(callback){
        Module.find({},function(err,module){
            if(err) return callback(err);
            modules = module;
            callback(null,modules);
        })
    }
    ],function(err){
			
  
        res.render("admin",{CountStudents: students, CountTeachers: teachers ,CountAdmins: admins ,phases: phases, levels: levels,semsters: semsters , modules: modules});
			})
		
		} else if (req.user.Role === "Teacher")  {
			res.redirect("/teacher");
		} else if (req.user.Role === "Student")  {
			// this for your page using react you can edit this code 
			res.redirect("/student");
		} else {
			res.redirect("/")
		}
		 
	});

   user.get("/teacher",function(req,res){
		 Teacher.find({}).
		 populate("user"). 
		 exec(function(err,teacher){
      res.render("teacher/teacher",{teachers: teacher})
		 })
		 
	 })
	 

	user.get("/list/teachers",async  function(req,res){
		Teacher.find({}).
		populate("user"). 
		exec(function(err,teacher){
					res.render("listTeacher",{teachers: teacher})
		 
				})	});




user.get("/list/demande",async  function(req,res){
	Teacher.find({Actif: false}).
		populate("user"). 
		exec(function(err,teacher){
			console.log(teacher)
				res.render("listDemande",{
						teachers: teacher})
					})	
			});

user.get("/list/students",async  function(req,res){
	try{
	
		const user = await User.find({Role: "Student"});
		let student = [];



		for(let i = 0; i < user.length; i++){
			let student = await Student.find({user: user[i]._id });
			student.push(...student)
		};

				res.render("listStudent",{
						users: user,
					
						students: student})
		
	}
	catch(err){
		res.status(500).render("/uhOhPage",{
				message: err.message
		})
}

});





user.get("/list/Admins",  function(req,res){
User.find({},function(err, admin){
	if (err) {return res.redirect("/admin")}
	console.log(admin)
	res.render("listAdmins",{admins: admin})
})
});

user.get("/static",  function(req,res){

	var CountQuestions;
	var CountValidOne;
	var CountValidTwo;
	var CountValidFinal;
	async.series([function(callback){
      
		Question.countDocuments({},function(err,question){
				if(err) return callback(err);
				CountQuestions = question;
				callback(null,CountQuestions);
		})
},function(callback){
	Question.countDocuments({IsValideOne: true },function(err,validOne){
				if(err) return callback(err);
				CountValidOne = validOne;
				callback(null,CountValidOne );
		})
},function(callback){
	Question.countDocuments({IsValideTwo: true},function(err,validTwo){
				if(err) return callback(err);
				CountValidTwo = validTwo;
				callback(null,CountValidTwo);
		})
},function(callback){
	Question.countDocuments({IsValideFinale: true},function(err,validFinal){
				if(err) return callback(err);
				CountValidFinal  = validFinal;
				callback(null,CountValidFinal);
		})
}
],function(err){
	

		res.render("static",{CountQuestions: CountQuestions, CountValidOne: CountValidOne,CountValidTwo: CountValidTwo,CountValidFinal: CountValidFinal});
	}) 

	});
	
user.get("/admin/deletephase/:_id",   function(req, res, next) {
 
	Phase.findOneAndRemove( { _id: req.params._id } , function(err, phase) {
			if (err) { return next(err); }
			if (!phase) { return next(404); }
	 
			req.flash("error", "تم الحدف");
			res.redirect("/admin")
			
		 
		})});
		user.post("/admin/updatephase/:_id",   function(req, res, next) {
 
			Phase.findOne({ _id: req.params._id } , function(err, phase) {
					if (err) { return next(err); }
					if (!phase) { return next(404); }
					
					phase.Phase = req.body.Phase
					phase.save();

					req.flash("error", "update ");
					res.redirect("/admin")
					
				 
				})});
		
				user.post("/admin/updatelevel/:_id",   function(req, res, next) {
 
					Level.findOne({ _id: req.params._id } , function(err, level) {
							if (err) { return next(err); }
							if (!level) { return next(404); }
							
							level.Level = req.body.Level
							level.save();
		
							req.flash("error", "update ");
							res.redirect("/admin")
							
						 
						})});
		user.get("/admin/deletelevel/:_id",   function(req, res, next) {
 
			Level.findOneAndRemove( { _id: req.params._id } , function(err, level) {
					if (err) { return next(err); }
					if (!level) { return next(404); }
			 
					req.flash("error", "تم الحدف");
					res.redirect("/admin")
					
				 
				})});



				user.post("/admin/updatesemster/:_id",   function(req, res, next) {
 
					Semster.findOne({ _id: req.params._id } , function(err, semster) {
							if (err) { return next(err); }
							if (!semster) { return next(404); }
							
							semster.Semster = req.body.Semster
							semster.save();
		
							req.flash("error", "update ");
							res.redirect("/admin")
							
						 
						})});


		user.get("/admin/deletesemster/:_id",   function(req, res, next) {
			Module.find( { semster: req.params._id } , function(err, one) {
		  one.forEach(function(delet){
				console.log(delet._id)
				Module.findOneAndRemove( { semster: delet._id } , function(err, del) {
					if (err) { return next(err); }
					if (del) { return next(404); }
					console.log("deleted")
				})
			})
			
			})
			 
		
			Semster.findOneAndRemove( { _id: req.params._id } , function(err, semster) {
					if (err) { return next(err); }
					if (!semster) { return next(404); }
			 
					req.flash("error", "تم الحدف");
					res.redirect("/admin")
					
				})
			});



	user.get("/admin/phase/:level",async function(req,res){
		try{
			const onelevel = await Level.findOne({_id: req.params.level});
			const semster = await Semster.find({level: onelevel._id});
			let modules = [];


			for(let i = 0; i < semster.length; i++){
				let module = await Module.find({semster: semster[i]._id });
				modules.push(...module)
			};
	
					res.render("semster",{
							onelevels: onelevel,
							semsters: semster,
							modules: modules})
			
		}
		catch(err){
			res.status(500).render("/uhOhPage",{
					message: err.message
			})
}} );


// this code will be delete

//user.get("/admin/laevel/:id", function(req,res){
//console.log("dakhel hena ya namiiii")
//	Semster.findOne({_id: req.params.id},function(err,onesemster){
	//	if (!onesemster) {return res.redirect("/admin")}
	// console.log(onesemster)
	//	Module.find({semster: onesemster._id},function(err,module){
	//		console.log(module)
	//			res.render("module",{modules: module,onesemsters: onesemster}) 
			
		
	////		})			})

//});

	

user.post("/admin/:level/:_id/updatemodule", function(req,res,next){
  
	var  modulee = req.body.Module;
	var  numberOfModule = req.body.NumberOfModule;
Module.findOne({_id: req.params._id},function(err,modules){
	modules.Module =  modulee
	modules.NumberOfModule =   numberOfModule

	modules.save(function(err,done){
		if (err){
			 
				console.log("error of updating")
			req.flash("error", "لم يتم ادخال كل البيانات");
			
			return  res.redirect('/admin/phase/' + req.params.level ) 
		} else {
			console.log(done)
			console.log("pas d errror")
	req.flash("info", "تم التسجيل  ");
	 return  res.redirect('/admin/phase/' + req.params.level ) 
			
		
		}
	});
	});


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
		Exam.findOneAndRemove( {semster: req.params._id } , function(err, exam) {
			if (err) { return next(err); }
		})
		Semster.findOneAndRemove( { _id: req.params._id } , function(err, semster) {
				if (err) { return next(err); }
				if (!semster) { return next(404); }
		 
				req.flash("error", "تم الحدف");
				res.redirect("/admin")
				
			 
			})});

			user.get("/admin/:level/deletemodule/:_id",   function(req, res, next) {
 
				Module.findOneAndRemove( { _id: req.params._id } , function(err, modules) {
						if (err) { return next(err); }
						if (!modules) { return next(404); }
				 
						req.flash("error", "تم الحدف");
						return  res.redirect('/admin/phase/' + req.params.level ) 
						
					 
					})});
			function ensureAuthenticated(req, res, next) {
				if (req.isAuthenticated()) {
				next();
				} else {
			 
				res.redirect("/");
				}
			 }


		user.post("/searchlevel",function(req, res){
				console.log(req.body.Phase);
				Phase.findOne({Phase: req.body.Phase}, function(err, phase){
					Level.find({phase:  phase._id},function(err , data){
					
							res.send(data);
					})
				})
			 
		})			 
module.exports = user;