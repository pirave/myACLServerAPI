
// Dependencies
var express = require('express');
var router = express.Router();

// Models
var User = require('../models/user');
var Progress = require('../models/progress');

// Routes
User.methods([
	{
		method: 'get',
		after: populateUser
	},
	{
		method: 'post',
		before: deleteExistingUser
	}, 'put', 'delete']);

User.register(router, '/users');

Progress.methods(['get',
	{ 
      method: 'post', 
      before: deleteExistingProgress,
      after: addProgress
    },
    {
    	method: 'delete',
    	after: deleteAll
    }]);
Progress.register(router, '/progress');

function addProgress(req, res, next) {
	User.update(
		{phoneID: res.locals.bundle.phoneID},
		{$addToSet : {progress: res.locals.bundle.id}},
		function (err, numAffected) {
			console.log(err + numAffected);
		}
	);
	next();
}

function populateUser(req, res, next) {
  	User.populate(res.locals.bundle, { path: 'progress' }, function (err, user) {
		next();
  	})
}

function deleteExistingUser (req, res, next) {
	User
    .find()
    .remove({phoneID: req.body.phoneID})
    .exec();
    next();
}

function deleteExistingProgress (req, res, next) {
	Progress
    .find()
    .remove({phoneID: req.body.phoneID, type: req.body.type, day: req.body.day})
    .exec();
    next();
}

function deleteAll(req, res, next){
	User.remove().exec();
	Progress.remove().exec();
	next();
}

// Return routers
module.exports = router;