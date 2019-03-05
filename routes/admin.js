
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

const excel = require('node-excel-export');
var fs =  require('fs')
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
      if (teacher.Actif === true) {
        teacher.Actif = false;
      } else {
        teacher.Actif = true;
      }
    
   
      teacher.save(function (err, update) {
        if (err){ return res.redirect("/list/teachers")}
        if (update) { return res.redirect("/list/teachers")}
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
                      
 admin.get("/generateexcel", (req,res) => {
   console.log("pas de probleə ")
// You can define styles as json object
const styles = {
  headerDark: {
    fill: {
      fgColor: {
        rgb: 'FF000000'
      }
    },
    font: {
      color: {
        rgb: 'FFFFFFFF'
      },
      sz: 14,
      bold: true,
      underline: true
    }
  },
  cellPink: {
    fill: {
      fgColor: {
        rgb: 'FFFFCCFF'
      }
    }
  },
  cellGreen: {
    fill: {
      fgColor: {
        rgb: 'FF00FF00'
      }
    }
  }
};
 
//Array of objects representing heading rows (very top)
const heading = [
  [{value: 'a1', style: styles.headerDark}, {value: 'b1', style: styles.headerDark}, {value: 'c1', style: styles.headerDark}],
  ['a2', 'b2', 'c2'] // <-- It can be only values
];
 
//Here you specify the export structure
const specification = {
  customer_name: { // <- the key should match the actual data key
    displayName: 'Customer', // <- Here you specify the column header
    headerStyle: styles.headerDark, // <- Header style
    cellStyle: function(value, row) { // <- style renderer function
      // if the status is 1 then color in green else color in red
      // Notice how we use another cell value to style the current one
      return (row.status_id == 1) ? styles.cellGreen : {fill: {fgColor: {rgb: 'FFFF0000'}}}; // <- Inline cell style is possible 
    },
    width: 20 // <- width in pixels
  },
 
  dat: {
    displayName: 'المرحلة',
    headerStyle: styles.headerDark,

    width: 220 // <- width in pixels
  },
  dat1: {
    displayName: 'المستوى',
    headerStyle: styles.headerDark,

    width: 220 // <- width in pixels
  },
  dat2: {
    displayName: 'الفصل',
    headerStyle: styles.headerDark,

    width: 220 // <- width in pixels
   },
  dat3: {
    displayName: 'المادة',
    headerStyle: styles.headerDark,

    width: 220 // <- width in pixels
  
  },
  dat4: {
    displayName: 'السؤال',
    headerStyle: styles.headerDark,

    width: 220 // <- width in pixels
  }



}
 
// The data set should have the following shape (Array of Objects)
// The order of the keys is irrelevant, it is also irrelevant if the
// dataset contains more fields as the report is build based on the
// specification provided above. But you should have all the fields
// that are listed in the report specification
var dataset = []
for (let i = 0; i < 10 ;i++ ) {
var datase = [

  {customer_name: i, status_id: 1, dat: 'المرحلة ', dat1: 'المستوى' ,dat2: 'المستوى',dat3: 'المستوى' },

  
]
dataset.push(...datase)
}
 
// Define an array of merges. 1-1 = A:1
// The merges are independent of the data.
// A merge will overwrite all data _not_ in the top-left cell.
const merges = [
  { start: { row: 1, column: 1 }, end: { row: 1, column: 10 } },
  { start: { row: 2, column: 1 }, end: { row: 2, column: 5 } },
  { start: { row: 2, column: 6 }, end: { row: 2, column: 10 } }
]
 
// Create the excel report.
// This function will return Buffer
const report = excel.buildExport(
  [ // <- Notice that this is an array. Pass multiple sheets to create multi sheet report
    {
      name: 'Report', // <- Specify sheet name (optional)
      heading: heading, // <- Raw heading array (optional)
      merges: merges, // <- Merge cell ranges
      specification: specification, // <- Report specification
      data: dataset // <-- Report data
    }
  ]
);
console.log("heklk")
// You can then return this straight
console.log(report)
res.attachment('report.xlsx');

 // This is sails.js specific (in general you need to set headers)

 return res.send(report);


 })                  
module.exports = admin;