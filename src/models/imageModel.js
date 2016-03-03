var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var imageModel = new Schema({
    url: String,
    user: String,
});
module.exports = mongoose.model('image',imageModel);