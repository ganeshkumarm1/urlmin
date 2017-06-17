var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var URL = new Schema({
	url: String,
	minurl: String
});

module.exports = mongoose.model('URL', URL);