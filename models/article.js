const mongoose = require('mongoose');
const express = require('express');

const app = express(); // include express.js stuff... adding dots after app (eg app.???)!

const Article = mongoose.model('Article', {
	articleTitle: String,
	articleContent: String,
	userName: String,
	userId: { type: String, required: true }
}); // mongoose is defining the data-fields

module.exports = Article;