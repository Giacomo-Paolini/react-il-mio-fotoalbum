const express = require('express');
const dotenv = require('dotenv');
const photoRouter = require('./routers/photoRouter');

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

dotenv.config();

app.use('/photos', photoRouter);

app.listen(port, host, () => {
	console.log(`Server running at http://${host}:${port}/`);
});
