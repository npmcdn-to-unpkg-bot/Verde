var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var signUpModel = new Schema({
    displayname: String,
    password: String,
    username: String,
    image: String,
    twitter: String
});
module.exports = mongoose.model('user',signUpModel);