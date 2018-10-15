const Article = require('../models/article');
const Comment = require('../models/comment');
const User = require('../models/user')

function users (app) {
	// COMPLETE!
	// INDEX => SHOW ALL USERS
	app.get('/', (req, res) => {
		User.find()
		.then(users => {
			res.render('users-index', {
				users: users
			});
		}).catch((err) => {
			res.status(400)
			.send({ err: err });
		});
	});

	// COMPLETE!
	// NEW => SHOW USER CREATION FORM
	app.get('/users/new', (req, res) => {
		User.findById(req.params.id)
		.then(user => {
			res.render('users-new', {
				userId: req.params.userId,
				user: user
			});
		}).catch((err) => {
			res.status(400)
			.send({ err: err });
		});
	});

	// COMPLETE!
	// CREATE => GENERATE NEW USER FROM FORM
	app.post('/users', (req, res) => {
		User.create(req.body)
		.then((user) => {
			res.redirect("/")
		}).catch((err) => {
			res.status(400)
			.send({ err: err });
		});
	});

	// COMPLETE!
	// SHOW USER
	app.get('/users/:userId', (req, res) => {
		User.findById(req.params.userId)
		.then(user => {
			res.render('users-show', {
				user: user
			});
		}).catch((err) => {
			res.status(400)
			.send({ err: err });
		});
	});

	// FIXING...
	// DELETE
	app.delete('/user/:userId', function (req, res) {;
		User.findByIdAndRemove(req.params.userId)
		.then(user => {
			res.status(200)
			.send({ user: user });
		}).catch((err) => {
			console.log("Delete User " + err.message);
			res.status(400)
			.send({ err: err });
		});
	});
}


module.exports = users
