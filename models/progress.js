
// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;
var Schema = mongoose.Schema;

// Schema
var progressSchema = new mongoose.Schema({
	phoneID: Number,
	type: String,
	day: Date,
	complete: Boolean,
	rangeDegree: Number
});

// Return model
module.exports = restful.model('Progress', progressSchema);