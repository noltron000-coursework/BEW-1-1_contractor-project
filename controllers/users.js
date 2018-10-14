const Article = require('../models/article');
const Comment = require('../models/comment');
// // USERDB DOESNT EXIST
// const UserDB = require('userdb-promise');
// const userdb = new UserDB('3a1d8db55135a8ae41b2314190591157');

function users (app) {

	// INDEX => SHOW ALL USERS
	app.get('/', (req, res) => {
		res.render('users-index', {
			msg: 'Handlebars are Cool!'
		})
		// // USERDB DOESNT EXIST
		// userdb.miscNowPlayingUsers()
		// .then(response => {
		// 	res.render('users-index', {
		// 		users: response.results
		// 	});
		// 	// console.log(response.results)
		// }).catch((err) => {
		// 	console.log(err.message);
		// });
	});

	// NEW => SHOW USER CREATION FORM
	// There is no need to create new users!


	// SHOW ROUTE? ADDING BEFORE SHOW SINGLE. IT WORKS. MK!
	app.get('/users/:id', (req, res) => {
		// // USERDB DOESNT EXIST
		// userdb.userInfo({ id: req.params.id }).then(user => {
		// 	Article.find({ userId: req.params.id }).then(articles => {
		// 		res.render('users-show', { user: user, articles: articles });
		// 	})
		// }).catch(console.error)
	})


	// SHOW SINGLE USER
	app.get('/users/:id', (req, res) => {
		// // USERDB DOESNT EXIST
		// userdb.userInfo({
		// 	id: req.params.id
		// }).then(user => {
		// 	// if (user.video) {
		// 		userdb.userVideos({
		// 			id: req.params.id
		// 		}).then(videos => {
		// 			user.trailer_youtube_id = videos.results[0].key;
		// 			renderTemplate(user);
		// 		});
		// 	function renderTemplate(user) {
		// 		Article.find({
		// 			userId: req.params.id
		// 		}).then(articles => {
		// 			res.render('users-show', {
		// 				user: user,
		// 				articles: articles
		// 			});
		// 		});
		// 	}
		// }).catch(console.error);
	})
}


module.exports = users
