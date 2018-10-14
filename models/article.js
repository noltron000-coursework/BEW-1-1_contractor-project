const mongoose = require('mongoose');
const express = require('express');

const app = express(); // include express.js stuff... adding dots after app (eg app.???)!

const Article = mongoose.model('Article', {
	title: String,
	userName: String,
	userRating: String,
	description: String,
	userId: { type: String, required: true }
}); // mongoose is defining the data-fields

module.exports = Article;