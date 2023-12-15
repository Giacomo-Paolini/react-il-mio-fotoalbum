const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const errorFormatter = require('./middlewares/errorsFormatter');
const notFound = require('./middlewares/notFound');

const photoRouter = require('./routers/photoRouter');
const categoryRouter = require('./routers/categoryRouter');
const userRouter = require('./routers/userRouter');

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

dotenv.config();

app.use('/photos', photoRouter);
app.use('/categories', categoryRouter);
app.use('/', userRouter);

app.use(notFound);
app.use(errorFormatter);

app.listen(port, host, () => {
	console.log(`Server running at http://${host}:${port}/`);
});
