const Article = require('../models/article');
const Comment = require('../models/comment');
const User = require('../models/user')

function articles (app) {

	// UNECCESSARY ROUTE!
	// INDEX => SHOW ALL ARTICLES

	// COMPLETED!
	// NEW => SHOW ARTICLE CREATION FORM
	app.get('/users/:userId/articles/new', (req, res) => {
		Article.findById(req.params.id)
		.then(article => {
			User.findById(req.params.userId)
			.then(user =>{
				res.render('articles-new', {
					article: article,
					user: user,
					userId: req.params.userId
				});
			})
		}).catch((err) => {
			console.log(err);
			res.status(400)
			.send({ err: err });
		});
	});

	// COMPLETED!
	// SHOW SINGLE ARTICLE
	app.get('/users/:userId/articles/:id', (req, res) => {
		Article.findById(req.params.id).then(article => {
			Comment.find({ articleId: req.params.id }).then(comments => {
				res.render('articles-show', { article: article, comments: comments, userId: req.params.userId })
			})
		}).catch((err) => {
			// catch errors
			console.log(err.message)
		});
	});

	// WORK IN PROGRESS...
	// UPDATE SINGLE ARTICLE
	app.put('/users/:userId/articles/:id', (req, res) => {
		Article.findByIdAndUpdate(req.params.id, req.body)
		.then(article => {
			res.redirect(`/users/${article.userId}/articles/${article.id}`);
		}).catch(err => {
			console.log("Update Article" + err.message);
			res.status(400)
			.send({ err: err });
		})
	})

	// WORK IN PROGRESS...
	// EDIT => SHOW EDIT FORM FOR SINGLE ARTICLE
	// == user route ==
	// /users/:id/articles/:id/edit
	app.get('/articles/:id/edit', function (req, res) {
		Article.findById(req.params.id)
		.then(article => {
			User.findById(req.params.userId)
			.then(user => {
				res.render('articles-edit', {
					article: article,
					user: user,
					userId: req.params.userId
				});
			});
		}).catch((err) => {
			console.log("Create Article Error " + err.message)
		})
	});

	// CREATE ARTICLE
	// == user route ==
	// /users/:id/articles/new
	app.post('/users/:userId/articles', (req, res) => {
		console.log("CREATE: REQUEST")
		console.log(req.body);
		console.log("\n")
		Article.create(req.body)
		.then((article) => {
			console.log("Create Article " + article)
			console.log(`/users/${article.userId}/articles/${article.id}`);
			res.redirect(`/users/${article.userId}/articles/${article.id}`) // Redirect to articles/:id
		}).catch((err) => {
			console.log("Create Article Error " + err.message)
		})
	})


	// DELETE SINGLE ARTICLE
	// == user route ==
	// /users/:id/articles/:id
	app.delete('/articles/:id', function (req, res) {
		console.log("DELETE article")
		Article.findByIdAndRemove(req.params.id).then((article) => {
			if (req.body.admin !== undefined) {
				res.redirect("/admin");
			}
			else {
				res.redirect(`/users/${article.userId}`);
			}
		}).catch((err) => {
			console.log("Delete Article " + err.message);
		})
	})
}

module.exports = articles
