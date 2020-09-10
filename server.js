var express = require('express');
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.send('Hello World');
});

app.get('/about', (req, res) => {
	res.send('<h1>CloudOps-Academy</h1>');
});


//for git webhook
app.post('/payload', (req, res) => {
	console.log(req.body);
	res.status(200).end();
});

app.listen(80, () => {
	console.log('llego una request');
});

module.exports = app;