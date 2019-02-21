var express = require("express");
var router = express.Router();
var async =  require("async");
var User = require("../models/user");
var Phase = require("../models/phase");
var Teacher = require("../models/teacher");
var Semster = require("../models/semster");
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
        upload(req, res, function(err){
          if (err){
            console.log("rtoooooottttt")
          } else {
            console.log(req.files)
            console.log(req.body.Exam)
            console.log(req.body.Module)
            res.redirect("/teacher/question")
           
           
          }
        })
});
module.exports = router;