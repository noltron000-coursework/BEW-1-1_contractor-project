// INITIAL DECLARATIONS
const Article = require('./models/article');
const Comment = require('./models/comment');

const articles = require('./controllers/articles'); // initialize articles
const users = require('./controllers/users'); // initialize users
const admin = require('./controllers/admin'); //initialize admin

const mongoose = require('mongoose'); // once was const or var...let is used
const express = require('express');
const methodOverride = require('method-override');
const bodyParser = require('body-parser'); // initialize body-parser

const app = express(); // include express.js stuff... adding dots after app (eg app.???)!
let exphbs = require('express-handlebars');

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/rotten-potatoes';
const port = process.env.PORT || 3000;

// connect to mongoose
mongoose.connect(connectionString, { useNewUrlParser: true });
// set up handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
// override with POST having ?_method=DELETE or ?_method=PUT
app.use(express.static('public'));
app.use(methodOverride('_method'));

/*  Now we get     /
/  to the brunt of /
/   the project.  */

// READY TO USE BODY-PARSER
app.use(bodyParser.urlencoded({ extended: true }));

// ROUTES
users(app);
articles(app);
admin(app);
require('./controllers/comments')(app);

// LISTEN
if (require.main === module) {
	app.listen(port, () => {
		console.log(`App listening on port ${port}!`)
	})
}

module.exports = app;
