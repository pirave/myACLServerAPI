
// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;
var Schema = mongoose.Schema;

// Schema
var userSchema = new mongoose.Schema({
	phoneID: Number,
	name: String,
	gender: String,
	age: Number,
	surgeryType: String,
	surgeryDate: Date,
	createDate: Date,
	progress: [{ type: Schema.Types.ObjectId, ref: 'Progress' }]
});

// Return model
module.exports = restful.model('Users', userSchema);