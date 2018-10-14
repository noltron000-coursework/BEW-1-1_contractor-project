const Article = require('../models/article')

module.exports = function(app) {

	// NEW Comment
	app.get('/admin', (req, res) => {
		Article.find()
		.then(articles => {
			res.render('admin', { articles: articles });
		}).catch(error => {
			console.log(error);
		});
	});
}