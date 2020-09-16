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


app.listen(80, () => {
	console.log('llego una request');
});

module.exports = app;