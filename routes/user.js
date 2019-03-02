var express = require("express");
var user = express.Router();
var async =  require("async");
var nodemailer = require('nodemailer');
var User = require("../models/user")
var Phase = require("../models/phase");
var Pub = require("../models/pub");
 var Semster = require("../models/semster");
 var Level = require("../models/level");
 var Module = require("../models/module");
 var Exam = require("../models/exam");
 var passport = require("passport");

 var Question = require("../models/question");
 var Teacher = require("../models/teacher");
 var Response = require("../models/response");
 var Student = require("../models/student");
var crypto = require("crypto");

user.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.errors = req.flash("error");
    res.locals.infos = req.flash("info");
    next();
   });
	 
	

   user.get("/",function(req,res){
   
	Pub.find({},function(err, pub){
	if (err){console.log("this is error ")}
	if (pub){ 
		console.log(" makan walo ",pub)
		res.render("login",{pub: pub})}
	})
   
})


user.get("/forgot",function(req,res){
    res.render("forgot")
})

user.get("/signup/admin", ensureAuthenticated ,function(req, res){
	res.render("signupAdmin")
})

user.get("/signup",function(req,res){
	User.countDocuments({}, function(err, count) { 
		if (count === 0) {
           res.render("signupAdmin")
		} else {
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
		 }
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
	if (
		 (( req.body.Role === "Student") && (req.body.Phase != null)  && (req.body.Level != null)) 

		 ||

		  (( req.body.Role === "Teacher") && (req.body.Phase != null) && (req.body.Speciality != null))

		 

		 ||

		 (( req.body.Role === "Admin") )

		 ) { 
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

			} else if (newUser.Role === "Teacher") {

				var newTeacher = new Teacher({
					Speciality: req.body.Speciality,
					Count: 0, 
					phase: req.body.Phase,
					user: newUser._id,
				 });
				 newTeacher.save();
				 console.log(newTeacher)


					
			}
			res.redirect("/routes")
		 }
	
			});
		} else {
			req.flash('error', ' dsl mazal madernaqch site ')
			res.redirect("/signup")
		}	});	

 },passport.authenticate("login", {
	 
	successRedirect: "/routes",
	failureRedirect: "/signup",
	failureFlash: true
 }));


user.get("/logout", function(req, res) {

	req.logout();
	res.redirect("/");
 });


user.post("/login", passport.authenticate("login", {
	successRedirect: "/routes",
	failureRedirect: "/",
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
	


	user.get("/admin",ensureAuthenticated, function(req,res){
	
		if (  req.user.Role === "Admin") {
		var phases;
    var levels;
    var semsters;
    var modules;
	var admins;
	var pubs;
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
			Pub.find({},function(err,pub){
					if(err) return callback(err);
					pubs = pub;
				
					callback(null,pubs);
			})	
	},function(callback){
        Module.find({},function(err,module){
            if(err) return callback(err);
            modules = module;
            callback(null,modules);
        })
    }
    ],function(err){
		console.log(pubs)
  
        res.render("admin",{pub: pubs,CountStudents: students, CountTeachers: teachers ,CountAdmins: admins ,phases: phases, levels: levels,semsters: semsters , modules: modules});
			})
		
	
		} else {
			res.redirect("/routes")
		}
		 
	});

// this url for interface teacher
   user.get("/teacher",ensureAuthenticated,function(req,res){
	   if (req.user.Role === "Teacher" ) {
		Teacher.find({user: req.user._id }).
		populate("user").
		exec(function(err,teacher){

			if (err) { res.redirect("/routes")  }
			
	 res.render("teacher/teacher",{teachers: teacher})

		})
	   } else {
		   //this link will do edit 
		res.redirect("/routes")  

	   }
  })
	 

	user.get("/list/teachers",ensureAuthenticated,async  function(req,res){
		if (  req.user.Role === "Admin") {	
		Teacher.find({}).
		populate("user"). 
		populate("phase").
		exec(function(err,teacher){
			if (err) { res.redirect("/routes")  }
			console.log(teacher)
					res.render("listTeacher",{teachers: teacher})
		 
				})
		} else {
			res.redirect("/routes")
		}	
	});




user.get("/list/demande",ensureAuthenticated,async  function(req,res){
	if (  req.user.Role === "Admin") {
	Teacher.find({Actif: false}).
		populate("user"). 
		exec(function(err,teacher){
			if (err) { res.redirect("/routes")  }
			console.log(teacher)
				res.render("listDemande",{
						teachers: teacher})
					})
				} else {
					res.redirect("/routes")
				}		
			});

user.get("/list/students",ensureAuthenticated,async  function(req,res){
	if (req.user.Role === "Admin") {
		Student.find({}).
		populate("user"). 
		populate("Phase").
		populate("Level").
		exec(function(err,student){
			console.log(student)
					res.render("listStudent",{students: student})
		 
				})
			
} else {
	res.redirect("/routes")
}	
});





user.get("/list/Admins",ensureAuthenticated,  function(req,res){
	if (  req.user.Role === "Admin") {
User.find({Role: "Admin"},function(err, admin){
	console.log(admin)
	if (err) {return res.redirect("/admin")}
	
	res.render("listAdmins",{admins: admin})
})

} else {
	res.redirect("/routes")
}	
});

user.get("/static",ensureAuthenticated,  function(req,res){
	if (  req.user.Role === "Admin") {
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
	Question.countDocuments({IsValidOne: true },function(err,validOne){
				if(err) return callback(err);
				CountValidOne = validOne;
				console.log(CountValidOne)
				callback(null,CountValidOne );
		})
},function(callback){
	Question.countDocuments({IsValidTwo: true},function(err,validTwo){
				if(err) return callback(err);
				CountValidTwo = validTwo;
				callback(null,CountValidTwo);
		})
},function(callback){
	Question.countDocuments({IsValidFinal: true},function(err,validFinal){
				if(err) return callback(err);
				CountValidFinal  = validFinal;
				callback(null,CountValidFinal);
		})
}
],function(err){
	

		res.render("static",{CountQuestions: CountQuestions, CountValidOne: CountValidOne,CountValidTwo: CountValidTwo,CountValidFinal: CountValidFinal});
	}) 
} else {
	res.redirect("/routes")
}
	});
	
user.get("/admin/deletephase/:_id",ensureAuthenticated,   function(req, res, next) {
	if (  req.user.Role === "Admin") {
	Phase.findOneAndRemove( { _id: req.params._id } , function(err, phase) {
			if (err) { return next(err); }
			if (!phase) { return next(404); }
	 
			req.flash("error", "تم الحدف");
			res.redirect("/admin")
			
		 
		})
	} else {
		res.redirect("/routes")
	}
	});
		user.post("/admin/updatephase/:_id",ensureAuthenticated,   function(req, res, next) {
			if (  req.user.Role === "Admin") {
			Phase.findOne({ _id: req.params._id } , function(err, phase) {
					if (err) { return next(err); }
					if (!phase) { return next(404); }
					
					phase.Phase = req.body.Phase
					phase.save();

					req.flash("error", "update ");
					res.redirect("/admin")
					
				 
				})
			} else {
				res.redirect("/routes")
			}
			});
		
				user.post("/admin/updatelevel/:_id",ensureAuthenticated,   function(req, res, next) {
					if (  req.user.Role === "Admin") {
					Level.findOne({ _id: req.params._id } , function(err, level) {
							if (err) { return next(err); }
							if (!level) { return next(404); }
							
							level.Level = req.body.Level
							level.save();
		
							req.flash("error", "update ");
							res.redirect("/admin")
					
						 
						})
					} else {
						res.redirect("/routes")
					}
				});
		user.get("/admin/deletelevel/:_id",ensureAuthenticated,   function(req, res, next) {
			if (  req.user.Role === "Admin") {
	
			Level.findOneAndRemove( { _id: req.params._id } , function(err, level) {
					if (err) { return next(err); }
					if (!level) { return next(404); }
			 
					req.flash("error", "تم الحدف");
					res.redirect("/admin")
					
				 
				})
			
			} else {
				res.redirect("/routes")
			}
		});
				
				user.get("/admin/:module/deleteexam/:id",ensureAuthenticated,   function(req, res, next) {
					if (  req.user.Role === "Admin") {
					Exam.findOneAndRemove( { _id: req.params.id } , function(err, exam) {
							if (err) { return next(err); }
							if (!exam) { return next(404); }
					 
							req.flash("error", "تم الحدف");
							res.redirect("/admin/exam/" + req.params.module)
							
						 
						})
					
					} else {
						res.redirect("/routes")
					}
				});

				user.post("/admin/updatesemster/:_id",ensureAuthenticated,  function(req, res, next) {
					if (  req.user.Role === "Admin") {
					Semster.findOne({ _id: req.params._id } , function(err, semster) {
							if (err) { return next(err); }
							if (!semster) { return next(404); }
							
							semster.Semster = req.body.Semster
							semster.save();
		
							req.flash("error", "update ");
							res.redirect("/admin")
							
						 
						})
						
					} else {
						res.redirect("/routes")
					}
				});


		user.get("/admin/:level/deletesemster/:_id",ensureAuthenticated,   function(req, res, next) {
			if (  req.user.Role === "Admin") {
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
					res.redirect("/admin/phase/" + req.params.level)
					
				})
			} else {
				res.redirect("/routes")
			}
			});



	user.get("/admin/phase/:level",ensureAuthenticated,async function(req,res){
		if (  req.user.Role === "Admin") {
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
}
} else {
	res.redirect("/routes")
}
} );


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

	

user.post("/admin/:level/:_id/updatemodule",ensureAuthenticated, function(req,res,next){
	if (  req.user.Role === "Admin") {
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
} else {
	res.redirect("/routes")
}

	 });


//req update semster

user.post("/admin/:level/:_id/updatesemster",ensureAuthenticated, function(req,res,next){
	if (  req.user.Role === "Admin") {
	var  semster = req.body.Semster;
	var  numberOfSemster= req.body.NumberOfSemster;
Semster.findOne({_id: req.params._id},function(err,semsters){
	semsters.Semster =  semster
	semsters.NumberOfSemster =   numberOfSemster

	semsters.save(function(err,done){
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
} else {
	res.redirect("/routes")
}

	 });



user.get("/admin/exam/:id",ensureAuthenticated, function(req,res){
	if (  req.user.Role === "Admin") {

		Module.findOne({_id: req.params.id},function(err,onemodule){
			if (!onemodule) {return res.redirect("/admin")}
                 Exam.find({module: onemodule._id},function(err,exam){
			
					res.render("exam",{exams: exam,onemodules: onemodule}) 
				
			
				})
			})
			} else {
				res.redirect("/routes")
			}
	
	});
	
		
  user.get("/admin/deletesemster/:_id",ensureAuthenticated,   function(req, res, next) {
	if (  req.user.Role === "Admin") {
	Exam.findOneAndRemove( {semster: req.params._id } , function(err, exam) {
			if (err) { return next(err); }
		})
		Semster.findOneAndRemove( { _id: req.params._id } , function(err, semster) {
				if (err) { return next(err); }
				if (!semster) { return next(404); }
		 
				req.flash("error", "تم الحدف");
				res.redirect("/admin")
				
			 
			})
		} else {
			res.redirect("/routes")
		}

	});

			user.get("/admin/:level/deletemodule/:_id",ensureAuthenticated,   function(req, res, next) {
				if (  req.user.Role === "Admin") {
				Module.findOneAndRemove( { _id: req.params._id } , function(err, modules) {
						if (err) { return next(err); }
						if (!modules) { return next(404); }
				 
						req.flash("error", "تم الحدف");
						return  res.redirect('/admin/phase/' + req.params.level ) 
						
					 
					})
				} else {
					res.redirect("/routes")
				}
			});
			function ensureAuthenticated(req, res, next) {
				if (req.isAuthenticated()) {
				next();
				} else {
			 
				res.redirect("/");
				}
			 }

//this req for ajax
		user.post("/searchlevel",function(req, res){
			if (req.body.Phase != undefined) { 
				console.log(req.body.Phase);
				Phase.findOne({Phase: req.body.Phase}, function(err, phase){
					Level.find({phase:  phase._id},function(err , data){
					
							res.send(data);
					})
				})
			}
			 
		})	

	

		user.post("/searchlevelsignup",function(req, res){
			if (req.body.Phase != undefined) { 
				console.log(req.body.Phase);
				Phase.findOne({_id: req.body.Phase}, function(err, phase){
					Level.find({phase:  phase._id},function(err , data){
					
							res.send(data);
					})
				})
			}
			 
		})	


		user.post("/searchsemstersignup",function(req, res){
			if (req.body.Level != undefined) { 
				console.log(req.body.Level);
				Level.findOne({_id: req.body.Level}, function(err, level){
					if (!err) {
					console.log(level)
					Semster.find({level:  level._id},function(err , data){
					
							res.send(data);
					}) }
				})
			}
			 
		})	

//this req for etat exam
user.get("/exam/update/:link/etat/:id",function(req,res){
	if (  req.user.Role === "Admin") {
	Exam.findOne({_id: req.params.id},function(err,exam){
		if (err){console.log("error bitchj ")}
		if (exam){
			if (exam.Etat === true){
				exam.Etat = false
				exam.save()
			} else {
				exam.Etat = true
				exam.save()
			}
			res.redirect("/admin/exam/" + req.params.link)
		}
	})
} else {
	res.redirect("/routes")
}
})			
//This req for updqte exam 
	 
user.post("/admin/update/:link/exam/:id",function(req,res){
	if (  req.user.Role === "Admin") {
	Exam.findOne({_id: req.params.id},function(err,exam){
		if (err){console.log("error bitchj ")}
		if (exam){
			exam.Exam = req.body.Exam,
			exam.NumberOfExam = req.body.NumberOfExam,
			exam.IsOfficial = req.body.IsOfficial,
			exam.Time = req.body.Time
            exam.save()
			
			res.redirect("/admin/exam/" + req.params.link)
		}
	})
} else {
	res.redirect("/routes")
}
})	

//This route for interface  exam display all question ref exam
user.get("/admin/exam/question/:id",async function(req,res){
	if (  req.user.Role === "Admin") {
	try{
	
		const question = await Question.find({exam: req.params.id}).populate("Author").populate("TeacherOne").populate("TeacherTwo").populate("TeacherFinal");
		let responses = [];

	
		for(let i = 0; i < question.length; i++){
			
			let response = await Response.find({question: question[i]._id });
			responses.push(...response)
			console.log("error is her", responses)
		};

		res.render("displayQuestion",{questions: question, responses: responses})
		
	}
	catch(err){
		res.status(500).render("/uhOhPage",{
				message: err.message
		})
}
} else {
	res.redirect("/routes")
}
})
// this route for deversite of users
user.get("/routes",ensureAuthenticated , function(req,res){
	if ( req.user.Role === "Teacher" ) {
		res.redirect("/teacher")

	} else if ( req.user.Role === "Student" ) {
		//this route for student
		res.redirect("/siginstudent")
	} else if ( req.user.Role === "Admin" ) {
		res.redirect("/admin")
	}
})
module.exports = user;