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
router.get("/teacher/question", function(req,res){
 Phase.find({},function(err,phase){
     console.log(phase)
     if (err) {return res.redirect("/teacher/question")}
     if (phase) {res.render("teacher/addquestion",{
         phases: phase})
    }
 })
  
});


router.get("/teacher/validation", function(req,res){
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


router.post("/searchexam",function(req, res){
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

  router.post('/upload', (req, res) => {
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
          } else {var image5
            if (req.body.image5value === "") {
              image5 = req.body.image5value
            } else if (req.files.image5 != null) {
            image5 = req.files.image5[0].filename
                 }
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
                       console.log("hena kayn error on nez question")
                       req.flash("error", "لم يتم ادخال كل البيانات");
                       return  res.redirect('/teacher/qauestion') 
                      }
              if (success){
              var newResponse1 = new Response({
                ResponseText: req.body.ResponseText1,
                IsCorrect: false,
                question: newQuestion._id
              });newResponse1.save(function(err,succcess){
                if (err){ req.flash("error", "لم يتم ادخال كل البيانات");
                return  res.redirect('/teacher/qauestion') 
               }
              })
              var newResponse2 = new Response({
                ResponseText: req.body.ResponseText2,
                IsCorrect: false,
                question: newQuestion._id
              });newResponse2.save()
              var newResponse3 = new Response({
                ResponseText: req.body.ResponseText3,
                IsCorrect: false,
                question: newQuestion._id
              });newResponse3.save()
              var newResponse4 = new Response({
                ResponseText: req.body.ResponseText4,
                IsCorrect: true,
                question: newQuestion._id
              });newResponse4.save()
            }
          })
            console.log("this code is naə of picter")
            console.log(req.body.image5value)
            if (req.body.image5value === "") {
              console.log("is not null bitch ")
            } else if (req.files.image5 != null) {
              console.log(req.files.image5)
            }
            console.log(req.body.Exam)
            console.log(req.body.Module)
            res.redirect("/teacher/question")
           
           
          }
        })
    } else {
      console.log(req.files.image5)
      req.flash("error", "لم يتم ادخال كل البيانات");
                      
      return  res.redirect('/teacher/qauestion') 
    }
});


router.get("/teacher/valid",function(req,res){
  Response.find({}).populate("question").exec(function(err,success){
    console.log(success)
    
    res.render("teacher/validation")
  })
})
module.exports = router;