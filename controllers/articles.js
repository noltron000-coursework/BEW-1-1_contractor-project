const Article = require('../models/article');
const Comment = require('../models/comment');

// // USERDB DOESNT EXIST
// const UserDB = require('userdb-promise');
// const userdb = new UserDB('3a1d8db55135a8ae41b2314190591157');



function articles (app) {// OUR MOCK ARRAY OF PROJECTS
let reviews = [
  { title: "Great Review", movieTitle: "Batman II" },
  { title: "Awesome Movie", movieTitle: "Titanic" }
]
	// INDEX => SHOW ALL ARTICLE
	// COMMENTING OUT ARTICLES LANDING - SHOULD BE USERS LANDING
	app.get('/articles', (req, res) => {
		res.render('articles-index', { reviews: reviews });
		// res.render('articles-index');
		// Article.find()
		// .then(articles => {
		// 	res.render('articles-index', { articles: articles });
		// })
		// .catch(err => {
		// 	console.log(err);
		// })
	})

	// NEW => SHOW ARTICLE CREATION FORM
	// == user route ==
	// /users/:id/articles/new
	app.get('/users/:userId/articles/new', (req, res) => {
		// // USERDB DOESNT EXIST
		// const user = userdb.userInfo( req.params.userId )
		// .then( user => {
		// 	res.render('articles-new', { userId: req.params.userId, user: user }) //RES render?
		// });
	});

	// SHOW SINGLE ARTICLE
	// == user route ==
	// /users/:id/articles/:id
	app.get('/users/:userId/articles/:id', (req, res) => {
		Article.findById(req.params.id).then(article => {
			Comment.find({ articleId: req.params.id }).then(comments => {
				res.render('articles-show', { article: article, comments: comments })
			})
		}).catch((err) => {
			// catch errors
			console.log(err.message)
		});
	});

	// UPDATE SINGLE ARTICLE
	// == user route ==
	// /users/:id/articles/:id
	app.put('/articles/:id', (req, res) => {
		Article.findByIdAndUpdate(req.params.id, req.body)
		.then(article => {
			res.redirect(`/users/${article.userId}/articles/${article._id}`)
		}).catch(err => {
			console.log("Update Article" + err.message)
		})
	})

	// EDIT => SHOW EDIT FORM FOR SINGLE ARTICLE
	// == user route ==
	// /users/:id/articles/:id/edit
	app.get('/articles/:id/edit', function (req, res) {
		Article.findById(req.params.id, function(err, article) {
			res.render('articles-edit', {article: article});
		})
	})

	// CREATE ARTICLE
	// == user route ==
	// /users/:id/articles/new
	app.post('/users/:userId/articles', (req, res) => {
		Article.create(req.body)
		.then((article) => {
			console.log("Create Article " + article)
			res.redirect(`/users/${article.userId}/articles/${article._id}`) // Redirect to articles/:id
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
