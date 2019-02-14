
var express = require("express");
var admin = express.Router();
var express = require("express");
var async =  require("async");
var nodemailer = require('nodemailer');
var User = require("../models/user");
var Phase = require("../models/phase");
var Semster = require("../models/semster");
var Level = require("../models/level");
var Module = require("../models/module");
var Exam = require("../models/exam")

var crypto = require("crypto");
admin.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.errors = req.flash("error");
    res.locals.infos = req.flash("info");
    next();
   });
	 




admin.post("/admin/addphase", function(req,res,next){
    console.log( req.body.Phase)
        var  phase = req.body.Phase;
        var  numberOfPhase = req.body.NumberOfPhase;
    
         var newPhase = new Phase({
         Phase:  phase,
         NumberOfPhase:  numberOfPhase, 
       
        });
        newPhase.save(function(err,done){
          if (err){
              console.log( req.body.Phase)
              console.log("error")
            req.flash("error", "لم يتم ادخال كل البيانات");
        return res.redirect("/admin");
          } else {
            console.log(done)
            console.log("pas d errror")
        req.flash("info", "تم التسجيل  ");
        res.redirect("/admin");
          }
        });
    
         });
    
      



         admin.post("/admin/:_id/:phase/addlevel", function(req,res,next){
  
              var  level = req.body.Level;
              var  numberOfLevel = req.body.NumberOfLevel;
              var phase = req.params._id;
              console.log(req.params._id)
          
               var newLevel = new Level({
               Level:  level,
               NumberOfLevel:  numberOfLevel, 
               phase: phase,
             
              });
              newLevel.save(function(err,done){
                if (err){
                   
                    console.log("error")
                  req.flash("error", "لم يتم ادخال كل البيانات");
                  
              return res.redirect("/admin/");
                } else {
                  console.log(done)
                  console.log("pas d errror")
              req.flash("info", "تم التسجيل  ");
              req.flash("error", "لم يتم ادخال كل البيانات");
              Phase.findOne({Phase: req.params.phase},function(err,onephase){
                if (!onephase) {return res.redirect("/admin")}
               console.log(onephase)
                Level.find({phase: onephase._id},function(err,level){
                  console.log(level)
                   return  res.render("level",{levels: level,onephases: onephase}) 
                  
                
                  })			})
                }
              });
          
               });
          
            
      

               admin.post("/admin/:_id/:semster/addmodule", function(req,res,next){
  
                var  modulee = req.body.Module;
                var  numberOfModule = req.body.NumberOfModule;
                var semster = req.params._id;
                console.log(req.params._id)
            
                 var newModule = new Module({
                 Module:  modulee,
                 NumberOfModule:  numberOfModule, 
                 semster: semster,
               
                });
                newModule.save(function(err,done){
                  if (err){
                     
                      console.log("error")
                    req.flash("error", "لم يتم ادخال كل البيانات");
                    
                return res.redirect("/admin/");
                  } else {
                    console.log(done)
                    console.log("pas d errror")
                req.flash("info", "تم التسجيل  ");
                req.flash("error", "لم يتم ادخال كل البيانات");
                Semster.findOne({Semster: req.params.semster},function(err,onesemster){
                  if (!onesemster) {return res.redirect("/admin")}
                 console.log(onesemster)
                  Module.find({semster: onesemster._id},function(err,modulee){
                    console.log(modulee)
                     return  res.render("module",{modules: modulee,onesemsters: onesemster}) 
                    
                  
                    })			})
                  }
                });
            
                 });
 
                  admin.post("/admin/:_id/:semster/addsemster", function(req,res,next){
  
                var  semster = req.body.Semster;
                var  numberOfSemster = req.body.NumberOfSemster;
                var level = req.params._id;
                console.log(req.params._id)
            
                 var newSemster = new Semster({
                 Semster:  semster,
                 NumberOfSemster:  numberOfSemster, 
                 level: level,
               
                });
                newSemster.save(function(err,done){
                  if (err){
                     
                      console.log("error")
                    req.flash("error", "لم يتم ادخال كل البيانات");
                    
                return res.redirect("/admin/");
                  } else {
                    console.log(done)
                    console.log("pas d errror")
                req.flash("info", "تم التسجيل  ");
               
                
                 
                     return  res.redirect('/admin/phase/' + req.params._id ) 
                    
                  
                    		
                  }
                });
            
                 });




                
                  admin.post("/admin/:_id/:module/addmodule", function(req,res,next){
  
                var  module = req.body.Module;
                var  numberOfModule = req.body.NumberOfModule;
                var semster = req.params._id;
                console.log(req.params._id)
            
                 var newModule = new Module({
                 Module:  module,
                 NumberOfmodule:  numberOfModule, 
                 semster: semster,
               
                });
                newModule.save(function(err,done){
                  if (err){
                     
                      console.log("error")
                    req.flash("error", "لم يتم ادخال كل البيانات");
                    
                return res.redirect("/admin/");
                  } else {
                    console.log(done)
                    console.log("pas d errror")
                req.flash("info", "تم التسجيل  ");
                req.flash("error", "لم يتم ادخال كل البيانات");
                Semster.findOne({Semster: req.params.semster},function(err,onesemster){
                  if (!onesemster) {return res.redirect("/admin")}
                 console.log(onesemster)
                  Module.find({semster: onesemster._id},function(err,modulee){
                    console.log(modulee)
                     return  res.render("module",{modules: modulee,onesemsters: onesemster}) 
                    
                  
                    })			})
                  }
                });
            
                 }); 






                 admin.post("/admin/:_id/:module/addexam", function(req,res,next){
                  console.log(req.body.Exam)
                  console.log("-----")
                  console.log(req.body.NumberOfExam)
                  console.log("-----")
                  console.log(req.body.Date)
                  console.log("-----")
                  console.log(req.body.Time)
                  console.log("-----")
                  var  exam = req.body.Exam;
                  var  numberOfExam = req.body.NumberOfExam;
                  var etat =  req.body.Etat;
                  var isOfficial = req.body.IsOfficial;
                  var time = req.body.Time;
                  var date = req.body.Date;
                  var modulee = req.params._id;
                  console.log(req.params._id)
              
                   var newExam = new Exam({
                   Exam:  exam,
                   NumberOfExam:  numberOfExam, 
                   IsOfficial: isOfficial,
                   Date: date,
                   Time: time,
                   Etat: etat,
                   module: modulee,
                 
                  });
                  newExam.save(function(err,done){
                    if (err){
                       
                        console.log("error")
                      req.flash("error", "لم يتم ادخال كل البيانات");
                      
                  return res.redirect("/admin/");
                    } else {
                      console.log(done)
                      console.log("pas d errror")
                  req.flash("info", "تم التسجيل  ");
                  req.flash("error", "لم يتم ادخال كل البيانات");
                  Module.findOne({_id: req.params._id},function(err,onemodule){
                    if (!onemodule) {return res.redirect("/admin")}
                   console.log(onemodule)
                    Exam.find({module: onemodule._id},function(err,exam){
                      console.log(exam)
                       return  res.render("exam",{exams: exam,onemodules: onemodule}) 
                      
                    
                      })			})
                    }
                  });
              
                   });               
module.exports = admin;