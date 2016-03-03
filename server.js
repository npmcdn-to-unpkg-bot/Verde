var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var passport = require("passport");
var session = require("express-session");

var app = express();
var port = process.env.PORT;

var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://' + process.env.IP);

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(cookieParser());
app.use(session({secret:'library'}));

require('./src/config/passport')(app);

app.set('views', './src/views');

var handlebars = require("express-handlebars");
app.engine('.hbs', handlebars({extname:'.hbs'}));
app.set('view engine', '.hbs');

var authRouter = require("./src/routes/authRoutes")();
app.use('/auth', authRouter);

var profileRouter = require("./src/routes/profileRoutes")();
app.use('/profile', profileRouter);

var publicRouter = require("./src/routes/publicRoutes")();
app.use('/public', publicRouter);

var image = require('./src/models/imageModel');

app.get('/',function(req,res){
  image.find({},function(err,resultAllImages){
    res.render('home',{login:req.user, images:resultAllImages.reverse()});
  });
});

app.get('/login',function(req, res) {
  if(req.user){
    res.redirect('/profile');
  } else {
    res.render('login');
  }
});

app.get('/*',function(req,res){
  res.redirect('/');
});

app.listen(port, function(){
  console.log(port);
});
