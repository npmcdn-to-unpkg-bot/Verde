var express = require("express");
var profileRouter = express.Router();
var image = require('../models/imageModel');

var router = function(){
    profileRouter.route('/')
        .get(function(req,res){
            if(!req.user){
                res.redirect('/');
            }
            else {
                image.find({user:req.user._id},function(err, results){
                    res.render('profile',{image:results,login:req.user});
                });
            }
        });
    return profileRouter;
};

module.exports = router;