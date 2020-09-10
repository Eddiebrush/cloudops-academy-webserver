var express = require('express');
var app = express();

app.use(express.json());

app.get('/', (req, res) => {
	res.send('Hello World');
});

app.get('/about', (req, res) => {
	res.send('<h1>CloudOps-Academy!</h1>');
});


//for git webhook
app.post('/payload', (req, res) => {
	res.send(JSON.parse(req.body.read));
});

app.listen(80, () => {
	console.log('llego una request');
});

module.exports = app;