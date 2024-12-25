import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import authenticateRouter from './authenticate/authenticateRouter.js';
const app = express();
dotenv.config('./.env');
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use('/authenticate', authenticateRouter);
app.listen(process.env.PORT, () => {
	mongoose.connect(process.env.DB_CONNECTION_STRING).then(() => {
		console.log(
			`server is up and running at http://127.0.0.1:${process.env.PORT}`
		);
	});
});
