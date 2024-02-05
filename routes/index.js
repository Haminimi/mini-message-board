const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const methodOverride = require('method-override');

router.use(
	methodOverride(function (req, res) {
		if (req.body && typeof req.body === 'object' && '_method' in req.body) {
			const method = req.body._method;
			console.log(method, req.body._method);
			delete req.body._method;
			return method;
		}
	})
);

let messages = [
	{
		id: uuid.v4(),
		message: 'Hi there!',
		user: 'Amando',
		added: 'Mon Feb 05 2024',
	},
	{
		id: uuid.v4(),
		message: 'Hello World!',
		user: 'Charles',
		added: 'Mon Feb 05 2024',
	},
];

router.get('/', function (req, res) {
	res.render('index', {
		messages,
	});
});

router.get('/new', function (req, res) {
	res.render('form');
});

router.post('/new', (req, res) => {
	const valid = req.body.user && req.body.message;
	console.log(req.body.message);
	if (valid) {
		messages.push({
			id: uuid.v4(),
			user: req.body.user,
			message: req.body.message,
			added: new Date().toDateString(),
		});
		res.redirect('/');
	} else {
		res.render('form', { user: req.body.user, message: req.body.message });
	}
});

router.delete('/', (req, res) => {
	messages = messages.filter((message) => message.id !== req.body.id);
	res.redirect('/');
});

module.exports = {
	router,
};
