var express = require('express');
var app = express();
var mongoose = require("mongoose");
var path = require("path");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var flash = require("connect-flash"); 
var passport = require("passport");
mongoose.connect("mongodb://localhost:27017/databasejedida");

// routes
var routes = require("./routes/routes");
var user = require("./routes/user");
var admin = require("./routes/admin")
var setUpPassport = require("./routes/setuppassport");


setUpPassport();


app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
 secret: "TKRv0IJs=HYqrvagQ#&!F!%V]Ww/4KiVs$s,<<MX",
 resave: true,
 saveUninitialized: true,

}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());



//using folder views 
app.use(express.static(__dirname + '/public'));
app.engine('ejs', require('ejs').renderFile);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");




// using routes 
app.use(user);
app.use(routes);
app.use(admin);

app.post("/login", passport.authenticate("login", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
   }));
app.get("/",function(req,res){
    res.render("login")
})

app.listen(3000, () => {
    console.log('Server listing on 3000');
})