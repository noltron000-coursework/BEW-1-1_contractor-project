const Article = require('../models/article');
const Comment = require('../models/comment');
const MovieDB = require('moviedb-promise');
const moviedb = new MovieDB('3a1d8db55135a8ae41b2314190591157');

function movies (app) {

	// INDEX => SHOW ALL MOVIES
	app.get('/', (req, res) => {
		moviedb.miscNowPlayingMovies()
		.then(response => {
			res.render('movies-index', {
				movies: response.results
			});
			// console.log(response.results)
		}).catch((err) => {
			console.log(err.message);
		});
	});

	// NEW => SHOW MOVIE CREATION FORM
	// There is no need to create new movies!


	// SHOW ROUTE? ADDING BEFORE SHOW SINGLE. IT WORKS. MK!
	app.get('/movies/:id', (req, res) => {
		moviedb.movieInfo({ id: req.params.id }).then(movie => {
			Article.find({ movieId: req.params.id }).then(articles => {
				res.render('movies-show', { movie: movie, articles: articles });
			})
		}).catch(console.error)
	})


	// SHOW SINGLE MOVIE
	app.get('/movies/:id', (req, res) => {
		moviedb.movieInfo({
			id: req.params.id
		}).then(movie => {
			// if (movie.video) {
				moviedb.movieVideos({
					id: req.params.id
				}).then(videos => {
					movie.trailer_youtube_id = videos.results[0].key;
					renderTemplate(movie);
				});
			function renderTemplate(movie) {
				Article.find({
					movieId: req.params.id
				}).then(articles => {
					res.render('movies-show', {
						movie: movie,
						articles: articles
					});
				});
			}
		}).catch(console.error);
	})
}


module.exports = movies
