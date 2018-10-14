const mongoose = require('mongoose');
const express = require('express');

const app = express(); // include express.js stuff... adding dots after app (eg app.???)!

const Schema = mongoose.Schema;

const Comment = mongoose.model('Comment', {
	title: String,
	content: String,
	articleId: { type: Schema.Types.ObjectId, ref: 'Article' }
});

module.exports = Comment;
