const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;

	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) => {
		if(err) {
			console.log('Unable to append to the log')
		}
	});
	next();
});

/*app.use((req, res, next) => {
	res.render('maintenance.hbs', {
		pageTitle : 'maintenance page'
	});
});*/

app.use(express.static(__dirname + '/public'));

app.get('/', (req,res) => {
	res.render('home.hbs', {
		pageTitle : 'Home Page',
		welcomeMessage : 'Welcome to the Home page'
	});
});

app.get('/about', (req, res) =>{
	res.render('about.hbs', {
		pageTitle : 'About Page'
	});
});

app.get('/bad', (req, res) => {
	var badrequest = {
		errorMessage : 'Unable to fetch the page'
	}
	res.send(JSON.stringify(badrequest));
});

app.listen(3000, () => {
	console.log('Server is up on port 3000')
});