var express = require("express");
var router = express.Router();
var async =  require("async");
var User = require("../models/user");
var Phase = require("../models/phase");
var Teacher = require("../models/teacher");
var Semster = require("../models/semster");
var Question = require("../models/question");
var Response = require("../models/response");
var Level = require("../models/level");
var Module = require("../models/module");
var Exam = require("../models/exam")
const multer = require("multer");
const path = require('path');

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
  next();
  } else {
 
  res.redirect("/");
  }
 }

router.get("/teacher/question",ensureAuthenticated, function(req,res){
  if ( req.user.Role === "Teacher") { 
  Teacher.findOne({user: req.user._id}, function(err,teacher){

    Phase.find({},function(err,phase){
      console.log(teacher)
      if (err) {return res.redirect("/teacher/question")}
      if (phase) {res.render("teacher/addquestion",{
          phases: phase,teacher: teacher})
     }
  })
   
  })
} else {
 res.redirect("/")
}

});


router.get("/teacher/validation",ensureAuthenticated, function(req,res){
    res.render("teacher/addquestion")
  }) 

router.post("/searchsemster",function(req, res){
    console.log(req.body.Level);
    Level.findOne({_id: req.body.Level}, function(err, level){
        Semster.find({level:  level._id},function(err , data){
        console.log(data)
                res.send(data);
        })
    })
 
})

router.post("/searchmodule",function(req, res){
    console.log(req.body.Semster);
    Semster.findOne({_id: req.body.Semster}, function(err, semster){
        console.log(semster)
        Module.find({semster:  semster._id},function(err , data){
        if (err) { console.log("errooooooooooor")}
                res.send(data);
        })
    })
 
})	


router.post("/searchexam",ensureAuthenticated,function(req, res){
    console.log(req.body.Module);
    Module.findOne({_id: req.body.Module}, function(err, module){
        Exam.find({module:  module._id},function(err , data){
        
                res.send(data);
        })
    })
 
})	


//this code for uploading file 
// Set The Storage Engine
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function(req, file, cb){
    cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Init Upload
const upload = multer({storage: storage,limits:{fileSize: 1000000},
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }}).fields([
{name: 'image1'}, 
{name: 'image2'},
{name: 'image3'},
{name: 'image4'},
{name: 'image5'},
])


// Check File Type
function checkFileType(file, cb){
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: Images Only!');
  }
}

  router.post('/upload', ensureAuthenticated , (req, res) => {
   if ( 
     (req.body.Level != "") && 
     (req.body.Phase != "")  && 
     (req.body.Module != "")  && 
     (req.body.Semster != "")  && 
     (req.body.Exam != "")  && 
     (req.body.NameOfCourse != "")  && 
     (req.body.Chapiter != "")  && 
     (req.body.TypeOfQuestion != "")  && 
     (req.body.Difficulty != "")   )
   {

     upload(req, res, function(err){
       //this code for conditioon of req image 
      
      //end
         if (err){
           console.log("rtoooooottttt")
      req.flash("error", "حدث خلل اثناء ادخال البيانات الصور...تاكد من الصور التي تريد ادخاها");
                      
      return  res.redirect('/teacher/question') 
          } else {
            
            var image1
            var image2
            var image3
            var image4
            var image5
            if (req.body.image5value === "") {
              image1 = req.body.image1value
            } else if (req.files.image1 != null) {
            image1 = req.files.image1[0].filename
                 }
                 if (req.body.image2value === "") {
                  image2 = req.body.image2value
                } else if (req.files.image2 != null) {
                image2 = req.files.image2[0].filename
                     }
              if (req.body.image3value === "") {
              image3 = req.body.image3value
            } else if (req.files.image3 != null) {
            image3 = req.files.image3[0].filename
                 }
                 if (req.body.image4value === "") {
              image4 = req.body.image4value
            } else if (req.files.image4 != null) {
            image4 = req.files.image4[0].filename
                 }
                 if (req.body.image5value === "") {
              image5 = req.body.image5value
            } else if (req.files.image5 != null) {
            image5 = req.files.image5[0].filename
                 }   
                 console.log("hena pas d erreur")         
          var  newQuestion = new Question ({
              Question: req.body.Question,
              Response: req.body.Response,
              QuestionImage: image5,
              NameOfCourse: req.body.NameOfCourse,
              TypeOfQuestion: req.body.TypeOfQuestion,
              Chapiter: req.body.Chapiter,
              Difficulty: req.body.Difficulty,
              exam:  req.body.Exam,

            });newQuestion.save(function(err,success){
              if (err){
                      
                       req.flash("error", "لم يتم ادخال كل البيانات");
                       return  res.redirect('/teacher/qauestion') 
                      }
              if (success){
                console.log(image1)
              console.log(newQuestion._id)
              var newResponse1 = new Response({
                ResponseText: req.body.ResponseText1,
                IsCorrect: false,
                ResponseImage: image1,
                question: newQuestion._id
              });newResponse1.save(function(err,succcess){
                if (err){ console.log("response 1 pas d error");
                return  res.redirect('/teacher/qauestion') 
               }
              })
              var newResponse2 = new Response({
                ResponseText: req.body.ResponseText2,
                IsCorrect: false,
                ResponseImage: image2,
                question: newQuestion._id
              });newResponse2.save(function(err,succcess){
                if (err){ console.log("response 1 pas d error");
                return  res.redirect('/teacher/qauestion') 
               }
              })
              var newResponse3 = new Response({
                ResponseText: req.body.ResponseText3,
                IsCorrect: false,
                ResponseImage: image3,
                question: newQuestion._id
              });newResponse3.save(function(err,succcess){
                if (err){ console.log("response 1 pas d error");
                return  res.redirect('/teacher/qauestion') 
               }
              })
              var newResponse4 = new Response({
                ResponseText: req.body.ResponseText4,
                IsCorrect: true,
                ResponseImage: image4,
                question: newQuestion._id
              });newResponse4.save(function(err,succcess){
                if (err){ console.log("response 1 pas d error");
                return  res.redirect('/teacher/qauestion') 
               }
              })
            }
          })
           
            res.redirect("/teacher/question")
           
           
          }
        })
    } else {
      req.flash("error", "لم يتم ادخال كل البيانات");
                      
      return  res.redirect('/teacher/qauestion') 
    }
});


router.get("/teacher/valid",ensureAuthenticated,async function(req,res){

  
    try{
    
      const question = await Question.find({IsValidFinal: false,NotValid: false});
      let responses = [];
      let exams = [];
    
    
  
      for(let i = 0; i <= question.length; i++){
        let response = await Response.find({question: question[i]._id });
        responses.push(...response)
        let exam = await Exam.find({_id: question[i].exam });
        exams.push(...exam)

        
      };
    }
      catch(err){
        res.status(500).render("/uhOhPage",{
            message: err.message
        })
    }
    try { 
      let modulee = [];
      for(let i = 0; i <= exams.length; i++){
        let modulee = await Module.find({exam: exams[i]._id });
        modules.push(...modulee)
   
        console.log(modules.length)
        console.log(exams.length)
         };
  
 
          res.render("teacher/validation",{question: question,responses: responses,exam: exams} )
      
    }
    catch(err){
      res.status(500).render("/uhOhPage",{
          message: err.message
      })
  }
})
  router.get("/teacher/notvalid",ensureAuthenticated,async function(req,res){

  
    try{
    
      const question = await Question.find({NotValid: true});
      let responses = [];
     
  
    
  
      for(let i = 0; i <= question.length; i++){
        let response = await Response.find({question: question[i]._id });
        responses.push(...response)
       
      };

  
 
          res.render("teacher/notvalid",{question: question,responses: responses})
      
    }
    catch(err){
      res.status(500).render("/uhOhPage",{
          message: err.message
      })
  }
  
})

router.get("/valid/question/:id",ensureAuthenticated, function(req,res){
  Question.findById({_id: req.params.id},function(err , question){
    if(question.IsValidOne != true) {
      question.IsValidOne = true,
      //question.TeacherOne = req.user._id
      question.save(function(err, success){
        if (err){console.log("il ya une error ")}
      })
    } else if (question.IsValidTwo != true) {
      question.IsValidTwo = true
       // question.TeacherOne = req.user._id
      question.save(function(err, success){
        if (err){console.log("il ya une error ")}
      })
    } else {
      question.IsValidFinal = true
      // question.TeacherFinal = req.user._id
     question.save(function(err, success){
       if (err){console.log("il ya une error ")}
     })
    }
 
 console.log(question)
 res.redirect("/teacher/valid")
  })
})

router.post("/invalid/question/:id",ensureAuthenticated, function(req,res){
  Question.findById({_id: req.params.id},function(err , question){
   
      question.IsValidOne = false,
      question.IsValidTwo = false,
      question.NotValid = true,
      question.ErrorMessage = req.body.message,
      //question.TeacherFinal = req.user._id
      question.save(function(err, success){
        if (err){console.log("il ya une error ")}
      })
    
 
 console.log(question)
 res.redirect("/teacher/valid")
  })
})
module.exports = router;