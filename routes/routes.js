var express = require("express");
var router = express.Router();
var async =  require("async");
var User = require("../models/user");
const excel = require('node-excel-export');
var fs =  require('fs')
var Pub = require("../models/pub");
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
var fs = require('fs');
var striptags = require('striptags');
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
 res.redirect("/routes")
}

});


router.get("/teacher/validation",ensureAuthenticated, function(req,res){
  if ( req.user.Role === "Teacher") { 
    res.render("teacher/addquestion")
  } else {
    res.redirect("/routes")
   }
  }) 

router.post("/searchsemster",ensureAuthenticated, function(req, res){

  if ( req.user.Role === "Teacher") { 
    if (req.body.Level != undefined) { 
  
    Level.findOne({_id: req.body.Level}, function(err, level){
        Semster.find({level:  level._id},function(err , data){
                res.send(data);
        })
    })
  }
  } else {
    res.redirect("/routes")
   }
})

router.post("/searchmodule",ensureAuthenticated,function(req, res){
  if ( req.user.Role === "Teacher") { 
    if (req.body.Semster != undefined) { 
    Semster.findOne({_id: req.body.Semster}, function(err, semster){
        if (err) { }
        Module.find({semster:  semster._id},function(err , data){
        if (err) { console.log("errooooooooooor")}
                res.send(data);
        })
    })
  }
} else {
  res.redirect("/routes")
 }
})	


router.post("/searchexam",ensureAuthenticated,function(req, res){
  if ( req.user.Role === "Teacher") { 
    if (req.body.Module != undefined) { 
 
    Module.findOne({_id: req.body.Module}, function(err, module){
        Exam.find({module:  module._id, EtatFinal: false},function(err , data){
        
                res.send(data);
        })
    })
  }
} else {
  res.redirect("/routes")
 }
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
const upload = multer({storage: storage, limits: { fileSize: 50000000 },
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
    if ( req.user.Role === "Teacher") { 
   if ( 
     (req.body.Level != null) && 
     (req.body.Phase != null)  && 
     (req.body.Module != null)  && 
     (req.body.Semster != null)  && 
     (req.body.Exam != null)  && 
     (req.body.NameOfCourse != null)  && 
     (req.body.Chapiter != null)  && 
     (req.body.TypeOfQuestion != null)  && 
     (req.body.Difficulty != null)   )
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
            if (req.body.image1value === "") {
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
                 var Author = req.user._id  ;  
          var  newQuestion = new Question ({
              Question: req.body.Question,
              Response: req.body.Response,
              QuestionImage: image5,
              NameOfCourse: req.body.NameOfCourse,
              TypeOfQuestion: req.body.TypeOfQuestion,
              Chapiter: req.body.Chapiter,
              Difficulty: req.body.Difficulty,
              exam:  req.body.Exam,
              Author: Author,
            });newQuestion.save(function(err,success){
              if (err){
                      
                       req.flash("error", "لم يتم ادخال كل البيانات");
                       return  res.redirect('/teacher/qauestion') 
                      }
              if (success){
                if (req.body.IsCorrect === "One" ) {
                      var IsCorrect1 = true
                } else {
                  var IsCorrect1 = false
                }
                if (req.body.IsCorrect === "Two" ) {
                  var IsCorrect2 = true
                } else {
                  var IsCorrect2 = false
                  
                }
                if (req.body.IsCorrect === "Three" ) {
                  var IsCorrect3 = true
                } else {
                  var IsCorrect3 = false
                  
                }
                if (req.body.IsCorrect === "Four" ) {
                  var IsCorrect4 = true
                } else {
                  var IsCorrect4 = false                  
                }
                console.log(image1)
              var newResponse1 = new Response({
                ResponseText: req.body.ResponseText1,
                IsCorrect: IsCorrect1,
                ResponseImage: image1,
                question: newQuestion._id
              });newResponse1.save(function(err,succcess){
                if (err){ console.log("response 1 pas d error");
                return  res.redirect('/teacher/qauestion') 
               }
              })
              var newResponse2 = new Response({
                ResponseText: req.body.ResponseText2,
                IsCorrect: IsCorrect2,
                ResponseImage: image2,
                question: newQuestion._id
              });newResponse2.save(function(err,succcess){
                if (err){ console.log("response 2 pas d error");
                return  res.redirect('/teacher/qauestion') 
               }
              })
              var newResponse3 = new Response({
                ResponseText: req.body.ResponseText3,
                IsCorrect: IsCorrect3,
                ResponseImage: image3,
                question: newQuestion._id
              });newResponse3.save(function(err,succcess){
                if (err){ console.log("response 3 pas d error");
                return  res.redirect('/teacher/qauestion') 
               }
              })
              var newResponse4 = new Response({
                ResponseText: req.body.ResponseText4,
                IsCorrect: IsCorrect4,
                ResponseImage: image4,
                question: newQuestion._id
              });newResponse4.save(function(err,succcess){
                if (err){ console.log("response 4 pas d error");
                return  res.redirect('/teacher/qauestion') 
               }
               if (succcess){
                 Teacher.findOne({user: req.user._id},function(err,user) {
                 user.Count =  user.Count + 1
                 console.log(user.Count)
                 user.save()
                 Question.countDocuments({exam: req.body.Exam},function(err, count){
                 Exam.findById({_id: req.body.Exam},function(err, success){
                   if ( count === success.NumberOfExam){
                    success.EtatFinal = true
                    if (success.IsOfficial != true) {
                      success.Etat  = true
                    }
                    success.save()
                   }
                }) 
               })
               })

               }
              })
            }
          })
           
            res.redirect("/teacher/question")
           
           
          }
        })
    } else {
      console.log("hena errroror bitch")
      req.flash("error", "لم يتم ادخال كل البيانات");
                      
      res.redirect("/teacher/question")
    }
  } else {
    res.redirect("/routes")
   }
});


router.get("/teacher/valid",ensureAuthenticated , async function(req,res){
  if ( req.user.Role === "Teacher") { 
  
    try{
      var user = await Teacher.findOne({user: req.user._id})
     const phases =  await Phase.find({});
     const levels =  await Level.find({});
     const semsters =  await Semster.find({});
     const modules =  await Module.find({});
     if (user.Speciality === "معلم") {
      var question = await Question.find({IsValidFinal: false,NotValid: false}).
      populate("Author").
      populate("exam").
      populate("TeacherOne").
      populate("TeacherTwo").
      populate("TeacherFinal").
      limit(30);
     } else if(user.Speciality === "خبير") {
      var question = await Question.find({IsValidOne: true, IsValidTwo: true,IsValidFinal: false,NotValid: false}).
      populate("Author").
      populate("exam").
      populate("TeacherOne").
      populate("TeacherTwo").
      populate("TeacherFinal").
      limit(30);
     }
     
      let responses = [];
   
    
    
  
      for(let i = 0; i < question.length; i++){
        let response = await Response.find({question: question[i]._id });
        responses.push(...response)
        
        };

 
          res.render("teacher/validation",{question: question,
                                           responses: responses,
                                            phases: phases,
                                            levels: levels,
                                            semsters: semsters,
                                            modules: modules   } )
      
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

//this route for question not valid
  router.get("/teacher/notvalid",ensureAuthenticated,async function(req,res){
    if ( req.user.Role === "Teacher") { 
    try{
      var user = req.user._id ;
      const  exams = [];
      const phases =  await Phase.find({});
      const levels =  await Level.find({});
      const semsters =  await Semster.find({});
      const modules =  await Module.find({});
     
       const question = await Question.find({NotValid: true,Author: user }).limit(1).
                                       populate("Author").
                                       populate("teacherOne").
                                       populate("TeacherTwo").
                                       populate("TeacherFinal");
       let responses = [];
   
     
   
       for(let i = 0; i < question.length; i++){
         let response = await Response.find({question: question[i]._id });
         responses.push(...response)
         let exam = await Exam.find({_id: question[i].exam });
        exams.push(...exam)
      
         };
      
           res.render("teacher/notvalid",{question: question,
                                            responses: responses,
                                             exam: exams,
                                             phases: phases,
                                             levels: levels,
                                             semsters: semsters,
                                             modules: modules   } )
       
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

router.get("/valid/question/:id",ensureAuthenticated,async function(req,res){
  if ( req.user.Role === "Teacher") { 
  Question.findById({_id: req.params.id},function(err , question){
    Teacher.findOne({user: req.user._id},(err,userRole)=> {

   
    var user = req.user._id 
   console.log(userRole.Speciality)
   console.log(req.user._id)
    if ( (user != question.TeacherOne)  && (user != question.TeacherTwo) && (userRole.Speciality === "معلم") ) { 
    if(question.IsValidOne != true) {
      question.IsValidOne = true,
      question.TeacherOne = req.user._id  ;
      question.save(function(err, success){
        if (err){console.log("il ya une error ")}
      })
    } else if (question.IsValidTwo != true) {
      question.IsValidTwo = true
      question.TeacherTwo = req.user._id ;
      console.log(question.TeacherTwo)
      question.save(function(err, success){
        if (err){console.log("il ya une error ")}
      })
    
    } 
    res.redirect("/teacher/valid")
   }
     else if (( question.IsValidFinal != true) && (userRole.Speciality === "خبير")) {
    question.IsValidFinal = true
     question.TeacherFinal = req.user._id  ;
     question.save(function(err, success){
       if (err){console.log("il ya une error ")}
       if (success){
       Question.find({exam: question.exam},(err,questions)=>{
           var IsValid = true
           for (let i = 0 ; i < questions.length; i++){
           if (questions[i].IsValidFinal === false ){
             IsValid = false
           }

           }
           console.log(IsValid)
           if (IsValid === true) {
            Exam.findOne({_id: question.exam}, (err,exam)=> {
                   exam.IsValid = IsValid
                   exam.save()
             })
           }

         })
        
       }
     })
    
    console.log(question)
    res.redirect("/teacher/valid")
  } else {
    // will be write message error 
    res.redirect("/teacher/valid")
  }

  })}) 
} else {
  res.redirect("/routes")
 }
})


//this routes for delete question 
router.get("/delete/question/:id",ensureAuthenticated, (req , res) => {
  Question.findOne( { _id: req.params.id } , function(err, questions) { 
    if (err){
      if ( req.user.Role === "Teacher"){
        req.flash("error", "تم الحذف");
        res.redirect("/teacher/notvalid")
    
      } else {
        req.flash("error", "تم الحدف");
        res.redirect("/admin/exam/" + exam.module)
      }
     }
     if (questions.QuestionImage != '') {
      var image = "public/uploads/" + questions.QuestionImage
      fs.unlink(image,function(err){
        if(err) return console.log(err);
        console.log('file deleted successfully');
      });
     }
    
  Question.findOneAndRemove( { _id: req.params.id } , function(err, question) {
    if (err) { 
      console.log("erro ta3saving question")
       }
    if (!question) {  }
    console.log("re,ove question ")
    //Delete image fil from uplauds
    Response.find({ question: req.params.id}, function(err,responseimages){
     for (let i = 0 ; i < responseimages.length ; i++ ) {
       if (responseimages[i].ResponseImage != '' ){
         console.log(responseimages[i].ResponseImage)
        var image = "public/uploads/" + responseimages[i].ResponseImage
        fs.unlink(image,function(err){
          if(err) return console.log(err);
          console.log('file deleted successfully');
        });
       }
     
  

     }
   
     
    })
    Response.deleteMany({ question: req.params.id } , function(err, response) {
      if (err) { 
        console.log("erro ta3saving reponse")
         }
      if (!response) {  }
      if (response){
        console.log("re,ove response ")


        Exam.findOne({_id: questions.exam}, (err ,exam ) => {
          if (exam.EtatFinal === true){
            exam.EtatFinal = false
            exam.save(function(err , success){
              if (err){
                    console.log("erro ta3saving exam")
              }
              if (success){
                console.log(",atbadltch")
                      if ( req.user.Role === "Teacher"){
                     req.flash("error", "تم الحدف");
                     res.redirect("/teacher/notvalid")
  
                     } else {
                     req.flash("error", "تم الحدف");
                     res.redirect("/admin/exam/" +  exam.module)
                    }
                   }
            })
          } else {
            console.log("change etat  response ")
            if ( req.user.Role === "Teacher"){
              req.flash("error", "تم الحدف");
              res.redirect("/teacher/notvalid")
  
            } else {
              req.flash("error", "تم الحدف");
              res.redirect("/admin/exam/" + exam.module)
            }

          }
        })

      }
     
      
     
    })
    })

    
   
  })

})

//QUESTION VQLID
router.post("/invalid/question/:id",ensureAuthenticated, function(req,res){
  if ( req.user.Role === "Teacher") { 
  Question.findById({_id: req.params.id},function(err , question){
   
    question.IsValidOne = false;
    question.IsValidTwo = false; 
    question.NotValid = true;
    question.ErrorMessage = req.body.message;
      question.save(function(err, success){
        if (err){console.log("il ya une error ")}
        if (success){ console.log(question)
          res.redirect("/teacher/valid")
        }
      })
    


  })
} else {
  res.redirect("/routes")
 }
})


//POST Pub 
router.post("/addpub",function(req,res){
  if ( req.user.Role === "Admin") { 
  Pub.countDocuments({},function(err,count){
    if (!err){
             if (count === 0 ){
              var newPub  =  new Pub({
                Pub: req.body.Pub,
              });newPub.save(function(err,success){
                // i will edit this message
                if(err){
                  console.log("this error ")
                  req.flash("error", "errros");
                  return res.redirect("/admin")}
                if (success){req.flash("info", "updating");
                return res.redirect("/admin")} 
              })
             } else {
               Pub.remove({},function(err,s){
                 if (err){ return res.redirect("/")}
                 if (s){
                  var newPub  =  new Pub({
                    Pub: req.body.Pub,
                  });newPub.save(function(err,success){
                    // i will edit this message
                    if(err){
                      console.log("this error ")
                      req.flash("error", "errros");
                      return res.redirect("/admin")}
                    if (success){req.flash("info", "updating");
                    return res.redirect("/admin")} 
                  })
                 }
               })
             }
        
    }
  })
} else {
  res.redirect("/routes")
 }
 
})
router.get("/pub/delete/:id",function(req,res){
  if ( req.user.Role === "Admin") { 
  Pub.findOneAndRemove( { _id: req.params.id } , function(err, pyb) {
    if (err) { return next(err); }
    if (!pyb) { return next(404); }
    req.flash("info", "pub bien suprin2");
                  
  res.redirect("/admin")
  }) 
} else {
  res.redirect("/routes")
 }
 
})

router.post("/update/question/:id",ensureAuthenticated,async function(req,res){
  Question.findById({_id: req.params.id},function(err, question){
    if (!err){
      upload(req, res, (err) => {
        if(err){
          res.redirect("/teacher/notvalid")
        } else {
       
      if (req.body.Chapiter != question.Chapiter){
        console.log(req.body.Chapiter)
        question.Chapiter = req.body.Chapiter
      }
     
      if (req.body.TypeOfQuestion != question.TypeOfQuestion){
        question.TypeOfQuestion = req.body.TypeOfQuestion
      }
      if (req.body.Difficulty != question.Difficulty){
        question.Difficulty = req.body.Difficulty
      }
      if (req.body.Course != question.NameOfCourse){
        question.NameOfCourse = req.body.Course
      }
      if (req.body.Question != question.Question){
        question.Question = req.body.Question
      }
      
      if ( (req.body.image5value != null ) &&(req.body.image5value != question.QuestionImage)){
        
              console.log(req.files.image5[0].filename)
              question.QuestionImage = req.files.image5[0].filename
     }
      question.NotValid = false
      question.save().then(function(err, result) {
        console.log('question update');
        Response.find({question: question._id},function(err, response){
          console.log(response[0].ResponseText)
              
          if ((req.body.ResponseText1) != (response[0].ResponseText)){
            response[0].ResponseText =   req.body.ResponseText1 
          }
          if (req.body.ResponseText2 != response[1].ResponseText){
            response[1].ResponseText =   req.body.ResponseText2 
          }
          if (req.body.ResponseText3 != response[2].ResponseText){
            response[2].ResponseText =   req.body.ResponseText3 
          }
          if (req.body.ResponseText4 != response[3].ResponseText){
            response[3].ResponseText =   req.body.ResponseText4
           }
           
          if ( (req.body.image1value != undefined ) && ((req.body.image1value) != (response[0].ResponseImage))){
            console.log(req.files.image1[0].filename)
                 response[0].ResponseImage =   req.files.image1[0].filename
          }
         if ( (req.body.image2value != undefined ) && ((req.body.image2value) != (response[1].ResponseImage))){
          response[1].ResponseImage =   req.files.image2[0].filename   
          } 

         if ( (req.body.image3value != undefined ) && ( (req.body.image3value) != ( response[2].ResponseImage))){
          response[2].ResponseImage =   req.files.image3[0].filename
         } 
        if ( (req.body.image4value != undefined ) && (req.body.image4value != response[3].ResponseImage)){
          response[3].ResponseImage =   req.files.image4[0].filename
        }
 response[0].save()
 response[1].save()
response[2].save()
 response[3].save()
  })
        res.redirect("/teacher/notvalid") 
    });
  }
});
    }
  })
     })    


                           
 router.get("/generateexcel",ensureAuthenticated, async (req,res) => {

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

 // <-- It can be only values
];

//Here you specify the export structure
const specification = {
 customer_name: { // <- the key should match the actual data key
   displayName: 'الرقم', // <- Here you specify the column header
   headerStyle: styles.headerDark, // <- Header style
   cellStyle: function(value, row) { // <- style renderer function
     // if the status is 1 then color in green else color in red
     // Notice how we use another cell value to style the current one
     return (row.status_id == 1) ? styles.cellGreen : {fill: {fgColor: {rgb: 'FFFF0000'}}}; // <- Inline cell style is possible 
   },
   width: 20 // <- width in pixels
 },

phase: {
   displayName: 'المرحلة',
   headerStyle: styles.cellGreen,

   width: 220 // <- width in pixels
 },
level: {
   displayName: 'المستوى',
   headerStyle: styles.cellGreen,

   width: 220 // <- width in pixels
 },
 semster: {
   displayName: 'الفصل',
   headerStyle: styles.cellGreen,

   width: 220 // <- width in pixels
  },
module: {
   displayName: 'المادة',
   headerStyle: styles.cellGreen,

   width: 220 // <- width in pixels
 
 },
 Chapiter: {
  displayName: 'الوحد',
  headerStyle: styles.cellGreen,

  width: 220 // <- width in pixels

},
NameOfCourse: {
  displayName: 'عنوان الدرس',
  headerStyle: styles.cellGreen,

  width: 220 // <- width in pixels

},
TypeOfQuestion: {
  displayName: 'نوع السؤال',
  headerStyle: styles.cellGreen,

  width: 220 // <- width in pixels

},
Difficulty: {
  displayName: 'درجة السؤال',
  headerStyle: styles.cellGreen,

  width: 220 // <- width in pixels

},
Code: {
  displayName: 'كود السؤال',
  headerStyle: styles.cellGreen,

  width: 300 
},
question: {
   displayName: 'السؤال',
   headerStyle: styles.cellGreen,

   width: 300 // <- width in pixels
 },
 questionImage: {
  displayName: 'صورة السؤال',
  headerStyle: styles.cellGreen,

  width: 220 // <- width in pixels
},
 responseOne: {
  displayName: 'الجواب الاول',
  headerStyle: styles.cellGreen,

  width: 220 // <- width in pixels

},
responseOneImage: {
  displayName: 'صورة الجواب الاول',
  headerStyle: styles.cellGreen,

  width: 220 // <- width in pixels

},
responseTwo: {
  displayName: 'الجواب الثاني ',
  headerStyle: styles.cellGreen,

  width: 220 // <- width in pixels

},
responseTwoImage: {
  displayName: 'صورة الجواب الثاني',
  headerStyle: styles.cellGreen,

  width: 220 // <- width in pixels

},
responseThree: {
  displayName: 'الجواب الثالث',
  headerStyle: styles.cellGreen,

  width: 220 // <- width in pixels

},
responseThreeImage: {
  displayName: 'صورة الجواب الثالث',
  headerStyle: styles.cellGreen,

  width: 220 // <- width in pixels

},
responseFour: {
  displayName: 'الجواب الرابع',
  headerStyle: styles.cellGreen,

  width: 220 // <- width in pixels

},
responseFourImage: {
  displayName: 'صورة الجواب الرابع',
  headerStyle: styles.cellGreen,

  width: 220 // <- width in pixels

},
response: {
  displayName: 'الاجابة النموذجية',
  headerStyle: styles.cellGreen,

  width: 300 // <- width in pixels

},



}

// The data set should have the following shape (Array of Objects)
// The order of the keys is irrelevant, it is also irrelevant if the
// dataset contains more fields as the report is build based on the
// specification provided above. But you should have all the fields
// that are listed in the report specification
const phase = await Phase.find({})
var dataset = []
var NumberOfCase = 0 ;

for (let a = 0; a < phase.length; a++ ){
  let level = await Level.find({phase: phase[a]._id})
  if (level) { 
  
  for (let b = 0; b < level.length; b++){
    let semster = await Semster.find({level: level[b]._id})

    if (semster) { 
    for (let c = 0;c < semster.length; c++){
      let modules = await Module.find({semster: semster[c]._id})
     
      if(modules) { 
      for (let d = 0; d < modules.length; d++){
        let exam = await Exam.find({module: modules[d]._id})
      
        if (exam) { 
        for (let e = 0; e < exam.length; e++ ){
          let question = await Question.find({exam: exam[e]._id})
        
          if (question) { 
          for(let f = 0;f < question.length; f++){
            let response = await Response.find({question: question[f]._id})
           
            if (response) { 
       
          var questionString = await striptags(question[f].Question)
        
          var responses = await striptags(question[f].Response)
          var responseOneString = response[0].ResponseText 
          var responseTwoString =  response[1].ResponseText 
          var responseThreeString =  response[2].ResponseText 
          var responseFourString =  response[3].ResponseText 
          if ( question[e].QuestionImage === "" ) {
            var questionimage = "لا توجد صورة"
          } else {
            var questionimage = 'https://alamaconsultancy.com/uploads/' + question[f].QuestionImage 
          }



  console.log(response[0].ResponseImage)
          if ( response[0].ResponseImage  === "" ) {
           var responseoneimage = "لا توجد صورة"
          } else {
            var responseoneimage = 'https://alamaconsultancy.com/uploads/' + response[0].ResponseImage 
          }
        

          if ( response[1].ResponseImage  === "" ) {
            var responsetwoimage = "لا توجد صورة"
          } else {
            var responsetwoimage = 'https://alamaconsultancy.com/uploads/' + response[1].ResponseImage 
          }
        

          if ( response[2].ResponseImage  === "" ) {
            var responsethreeimage = "لا توجد صورة"
          } else {
            var responsethreeimage = 'https://alamaconsultancy.com/uploads/' + response[2].ResponseImage 
          }
        

          if ( response[3].ResponseImage  === "" ) {
            var responsefourimage = "لا توجد صورة"
          } else {
            var responsefourimage = 'https://alamaconsultancy.com/uploads/' + response[3].ResponseImage 
          }
        
        

          
          
        
          

              var datase = [
                {customer_name: NumberOfCase + 1 ,
                  
                    phase:  phase[a].Phase ,
                     level: level[b].Level ,
                     semster: semster[c].Semster,
                     module: modules[d].Module,
                     Chapiter: question[f].Chapiter, 
                     TypeOfQuestion: question[f].TypeOfQuestion,
                     Difficulty: question[f].Difficulty,
                     NameOfCourse: question[f].NameOfCourse,
                     Code: question[f]._id,

                     question:  questionString,
                     questionImage: questionimage,

                     responseOne:  responseOneString,
                     responseOneImage: responseoneimage,
                   
                     responseTwo: responseTwoString,
                     responseTwoImage: responsetwoimage,
                     
                     responseThree: responseThreeString,
                     responseThreeImage: responsethreeimage,

                     responseFour: responseFourString,
                     responseFourImage: responsefourimage,
                    response: responses },
              ]
              console.log(datase)
              dataset.push(...datase)
            
          }}
        }}
      }}
    }}
  }}
}
}




// Define an array of merges. 1-1 = A:1
// The merges are independent of the data.
// A merge will overwrite all data _not_ in the top-left cell.
const merges = [

  { start: { row: 2, column: 1 }, end: { row: 2, column: 1 } },
 
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
module.exports = router;