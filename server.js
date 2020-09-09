var express = require('express');
var app = express();

app.get('/', (req, res) => {
	res.send('Hello World');
});

app.get('/about' (req, res) => {
	res.send('<h1>CloudOps-Academy</h1>');
});

app.listen(8080, () => {
	console.log('llego una request');
});

module.exports = app;