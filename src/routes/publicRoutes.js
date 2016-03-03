var express = require("express");
var publicRouter = express.Router();
var user = require('../models/userModel');
var image = require('../models/imageModel');

var router = function(){
    publicRouter.route('/:id')
        .get(function(req,res){
            user.findOne({_id:req.params.id},function(err,resultUser){
                image.find({user:req.params.id},function(err,resultImages){
                    res.render('public',{user:resultUser,images:resultImages,login:req.user});
                });
            });
        });
    return publicRouter;
};

module.exports = router;