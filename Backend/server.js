const express = require('express');
const dotenv = require('dotenv');

const app = express();
const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

dotenv.config();

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.listen(port, host, () => {
	console.log(`Server running at http://${host}:${port}/`);
});
