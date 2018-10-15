const Article = require('../models/article');
const Comment = require('../models/comment');
const User = require('../models/user')

function users (app) {

	// COMPLETED!
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

	// COMPLETED!!
	// NEW => SHOW USER CREATION FORM
	app.get('/users/new', (req, res) => {
		User.findById(req.params.userId)
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

	// COMPLETED!
	// SHOW SINGLE USER
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

	// COMPLETED!
	// UPDATE USER
	app.put('/users/:userId', (req, res) => {
		User.findByIdAndUpdate(req.params.userId, req.body)
		.then(user => {
			console.log("Update User");
			console.log(user);
			console.log("\n");
			res.redirect(`/users/${user.id}`)
		}).catch((err) => {
			console.log("Update User" + err.message)
			console.log("\n");
			res.status(400)
			.send({ err: err });
		})
	})

	// COMPLETED!
	// EDIT => SHOW EDIT FORM FOR SINGLE USER
	app.get('/users/:userId/edit', (req, res) => {
		User.findById(req.params.userId, function(err, user) {
			console.log("Edit User " + user);
			console.log("\n");
			res.render('users-edit', { user: user });
		}).catch((err) => {
			console.log(err);
			console.log("\n");
			res.status(400)
			.send({ err: err });
		})
	})

	// COMPLETED!
	// CREATE => GENERATE NEW USER FROM FORM
	app.post('/users', (req, res) => {
		User.create(req.body)
		.then((user) => {
			res.redirect(`/users/${user.id}`);
		}).catch((err) => {
			res.status(400)
			.send({ err: err });
		});
	});


	// COMPLETE!
	// DELETE
	app.delete('/users/:userId', function (req, res) {
		User.findByIdAndRemove(req.params.userId)
		.then(user => {
			console.log("Delete User Success: ")
			console.log(user);
			console.log("\n");
			res.redirect("/");
		}).catch((err) => {
			console.log("Delete User Error: ")
			console.log(err);
			console.log("\n");
			res.status(400)
			.send({ err: err });
		});
	});
}


module.exports = users
