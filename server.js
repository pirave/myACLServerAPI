
// Dependencies
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// MongoDB
var database = process.env.MONGOLAB_URI || 'mongodb://localhost/myACL';
mongoose.connect(database)

// Express
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.use('/api', require('./routes/api'))
app.get('/', function (req, res) {
	res.sendFile('index.html', {root:'./views'});
});

// Start server
var port = process.env.PORT || 5000;
app.listen(port);
console.log('API is running is on port ' + port);