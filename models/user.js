const mongoose = require('mongoose');
const express = require('express');

const app = express(); // include express.js stuff... adding dots after app (eg app.???)!

const Schema = mongoose.Schema; 

const User = mongoose.model('User', {
	userName: String,
	userInterests: String,
	userBio: String,
	userAvatar: String
}); // mongoose is defining the data-fields

module.exports = User;