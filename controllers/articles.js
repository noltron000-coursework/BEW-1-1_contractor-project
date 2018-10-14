const Article = require('../models/article');
const Comment = require('../models/comment');
const MovieDB = require('moviedb-promise');
const moviedb = new MovieDB('3a1d8db55135a8ae41b2314190591157');

function articles (app) {
	// // INDEX => SHOW ALL ARTICLE
	// // COMMENTING OUT ARTICLES LANDING - SHOULD BE MOVIES LANDING
	// app.get('/articles', (req, res) => {
	// 	res.render('articles-index');
	// 	Article.find()
	// 	.then(articles => {
	// 		res.render('articles-index', { articles: articles });
	// 	})
	// 	.catch(err => {
	// 		console.log(err);
	// 	})
	// })

	// NEW => SHOW ARTICLE CREATION FORM
	// == movie route ==
	// /movies/:id/articles/new
	app.get('/movies/:movieId/articles/new', (req, res) => {
		const movie = moviedb.movieInfo( req.params.movieId )
		.then( movie => {
			res.render('articles-new', { movieId: req.params.movieId, movie: movie }) //RES render?
		});
	});

	// SHOW SINGLE ARTICLE
	// == movie route ==
	// /movies/:id/articles/:id
	app.get('/movies/:movieId/articles/:id', (req, res) => {
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
	// == movie route ==
	// /movies/:id/articles/:id
	app.put('/articles/:id', (req, res) => {
		Article.findByIdAndUpdate(req.params.id, req.body)
		.then(article => {
			res.redirect(`/movies/${article.movieId}/articles/${article._id}`)
		}).catch(err => {
			console.log(err.message)
		})
	})

	// EDIT => SHOW EDIT FORM FOR SINGLE ARTICLE
	// == movie route ==
	// /movies/:id/articles/:id/edit
	app.get('/articles/:id/edit', function (req, res) {
		Article.findById(req.params.id, function(err, article) {
			res.render('articles-edit', {article: article});
		})
	})

	// CREATE ARTICLE
	// == movie route ==
	// /movies/:id/articles/new
	app.post('/movies/:movieId/articles', (req, res) => {
		Article.create(req.body)
		.then((article) => {
			console.log(article)
			res.redirect(`/movies/${article.movieId}/articles/${article._id}`) // Redirect to articles/:id
		}).catch((err) => {
			console.log(err.message)
		})
	})


	// DELETE SINGLE ARTICLE
	// == movie route ==
	// /movies/:id/articles/:id
	app.delete('/articles/:id', function (req, res) {
		console.log("DELETE article")
		Article.findByIdAndRemove(req.params.id).then((article) => {
			if (req.body.admin !== undefined) {
				res.redirect("/admin");
			}
			else {
				res.redirect(`/movies/${article.movieId}`);
			}
		}).catch((err) => {
			console.log(err.message);
		})
	})
}

module.exports = articles
