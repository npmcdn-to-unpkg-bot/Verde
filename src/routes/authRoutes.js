var express = require("express");
var authRouter = express.Router();
var passport = require("passport");
var user = require('../models/userModel');
var image = require('../models/imageModel');

var router = function(){
    authRouter.route('/signup')
        .post(function(req,res){
            user.findOne({username:req.body.username},function(err,result){
                if(result){ console.log(result); res.redirect('/')}
                else{
                    var addUser = new user({
                        username: req.body.email,
                        password: req.body.password,
                        displayname: req.body.displayname
                        
                    });
                    addUser.save(function(err,result){
                        req.login(result,function(){
                        res.redirect('/profile');
                        });
                    });  
                }
            });
        });
    authRouter.route('/signin')
        .post(passport.authenticate('local',{
            failureRedirect: '/'
        }), 
        function(req,res){
            res.redirect('/profile');
        });
    authRouter.route('/logout')
        .get(function(req,res){
            req.session.destroy();
            req.logout();
            res.redirect('/');
        });
    authRouter.route('/add')
        .post(function(req, res) {
            var addImage = new image({
                        url: req.body.search,
                        user: req.user._id
            });
            addImage.save();
            res.send(req.body);
        });
    authRouter.route('/remove')
        .post(function(req, res) {
            image.find({ _id:req.body.remove }).remove().exec();
            res.send(req.body.remove);
        });
    authRouter.route('/twitter/callback')
        .get(passport.authenticate('twitter',{
            successRedirect: '/profile/',
            failure: '/login/'
        }));
    authRouter.route('/twitter/')
        .get(passport.authenticate('twitter'));
        
    return authRouter;
};

module.exports = router;