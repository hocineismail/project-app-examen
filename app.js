var express = require('express');
var app = express();
var mongoose = require("mongoose");
var setUpPassport = require("./routes/setuppassport");
mongoose.connect("mongodb://localhost:27017/admin");
setUpPassport();




app.listen(3000, () => {
    console.log('Server listing on 3000');
})