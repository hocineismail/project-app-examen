<<<<<<< HEAD

var express = require('express');
var app = express();
var mongoose = require("mongoose");
var path = require("path");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var flash = require("connect-flash"); 
var passport = require("passport");

<<<<<<< HEAD

mongoose.connect("mongodb://localhost:27017/projectexams");
=======
mongoose.connect("mongodb://localhost:27017/projectfina");
>>>>>>> project

=======
var express = require('express')
var app = express()
var mongoose = require('mongoose')
var path = require('path')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var session = require('express-session')
var flash = require('connect-flash')
var passport = require('passport')

mongoose.connect('mongodb://localhost:27017/projectexams')
>>>>>>> 3026f318eba00a15c2f59529eb3fba91eea6ce42
// routes
var routes = require('./routes/routes')
var user = require('./routes/user')
var admin = require('./routes/admin')
var setUpPassport = require('./routes/setuppassport')

let student = require('./student_routes/student')
let certificate = require('./student_routes/certificate')

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')

  // Request methods you wish to allow
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  )

  // Request headers you wish to allow
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type,x-auth'
  )

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true)

  // Pass to next layer of middleware
  next()
})

setUpPassport()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(
  session({
    secret: 'TKRv0IJs=HYqrvagQ#&!F!%V]Ww/4KiVs$s,<<MX',
    resave: true,
    saveUninitialized: true
  })
)
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

//using folder views
app.use(express.static(__dirname + '/public'))
app.engine('ejs', require('ejs').renderFile)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// using routes
app.use(user)
app.use(routes)
app.use(admin)

app.use('/student', student)
app.use('/certificate', certificate)
app.post(
  '/login',
  passport.authenticate('login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  })
)
app.use(express.static(__dirname + '/client/build'))
app.get('/studenthome/*', (req, res) => {
  res.sendFile(__dirname + '/client/build/index.html')
})
app.get('/exampage/*', (req, res) => {
  res.sendFile(__dirname + '/client/build/index.html')
})
app.listen(3000, () => {
  console.log('Server listing on 3000')
})
