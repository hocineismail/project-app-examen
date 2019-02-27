
var express = require("express");
var admin = express.Router();
var express = require("express");
var async =  require("async");
var nodemailer = require('nodemailer');
var User = require("../models/user");
var Phase = require("../models/phase");
var Teacher = require("../models/teacher");
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
	 

admin.get("/teacherValidation/:_id",ensureAuthenticated, function(req,res){
  if (  req.user.Role === "Admin") {
  Teacher.findOne({_id: req.params._id},function(err,teacher){
    if(err) {return res.redirect("/admin")}
    if (teacher) {
      teacher.Actif = true;
   
      teacher.save(function (err, update) {
        if (err){ return res.redirect("/list/demande")}
        if (update) { return res.redirect("/list/demande")}
    });
  }
})
  } else {
    res.redirect("/routes")
  }
})


admin.post("/admin/addphase",ensureAuthenticated, function(req,res,next){
  if (  req.user.Role === "Admin") {
    console.log( req.body.Phase)
        var  phase = req.body.Phase;
        var  numberOfPhase = req.body.NumberOfPhase;
    
         var newPhase = new Phase({
         Phase:  phase,
         NumberOfPhase:  numberOfPhase, 
       
        });
        newPhase.save(function(err,done){
          if (err){
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
      } else {
        res.redirect("/routes")
      }
         });
    
      



         admin.post("/admin/:_id/:phase/addlevel",ensureAuthenticated, function(req,res,next){
          if (  req.user.Role === "Admin") {
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
                  
              return res.redirect("/admin");
                } else {
                  console.log(done)
                  console.log("pas d errror")
              req.flash("info", "تم التسجيل  ");
              
           
              return res.redirect("/admin");
                  
                
                  
                }
              });
            } else {
              res.redirect("/routes")
            }
               });
          
            
      

 
                 admin.post("/admin/:level/:_id/addmodule",ensureAuthenticated, function(req,res,next){
                  if (  req.user.Role === "Admin") {
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
                      
                      return  res.redirect('/admin/phase/' + req.params.level ) 
                    } else {
                      console.log(done)
                      console.log("pas d errror")
                  req.flash("info", "تم التسجيل  ");
                   return  res.redirect('/admin/phase/' + req.params.level ) 
                      
                    
                    }
                  });
                } else {
                  res.redirect("/routes")
                }
                   });


                   admin.post("/admin/:level/:_id/updatemodule",ensureAuthenticated, function(req,res,next){
                    if (  req.user.Role === "Admin") {
                    var  modulee = req.body.Module;
                    var  numberOfModule = req.body.NumberOfModule;
                  
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
                        
                        return  res.redirect('/admin/phase/' + req.params.level ) 
                      } else {
                        console.log(done)
                        console.log("pas d errror")
                    req.flash("info", "تم التسجيل  ");
                     return  res.redirect('/admin/phase/' + req.params.level ) 
                        
                      
                      }
                    });
                  } else {
                    res.redirect("/routes")
                  }
                     });
                   
                  admin.post("/admin/:_id/:semster/addsemster",ensureAuthenticated, function(req,res,next){
                    if (  req.user.Role === "Admin") {
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
              } else {
                res.redirect("/routes")
              }
                 });




                
          admin.post("/admin/:_id/:module/addmodule",ensureAuthenticated, function(req,res,next){
            if (  req.user.Role === "Admin") {
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
                    
                return res.redirect("/admin");
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
              } else {
                res.redirect("/routes")
              }
                 }); 






                 admin.post("/admin/:_id/:module/addexam",ensureAuthenticated, function(req,res,next){
                  if (  req.user.Role === "Admin") {
                  var  exam = req.body.Exam;
                  var  numberOfExam = req.body.NumberOfExam;
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
                   Etat: false,
                   module: modulee,
                  
                 
                  });
                  newExam.save(function(err,done){
                    if (err){
                       
                        console.log("error")
                      req.flash("error", "لم يتم ادخال كل البيانات");

                      
                  return  res.redirect("/admin/exam/" + req.params._id)
                    } else {
                      console.log(done)
                      console.log("pas d errror")
                  req.flash("info", "تم التسجيل  ");
                  res.redirect("/admin/exam/" + req.params._id)
                    }
                  });
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
                              
module.exports = admin;