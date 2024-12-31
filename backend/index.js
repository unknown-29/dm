import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import { createModel } from 'mongoose-gridfs';
import bodyParser from 'body-parser';
import authenticateRouter from './authenticate/authenticateRouter.js';
import docsRouter from './documenthandler/docsRouter.js';
import morgan from 'morgan';
const app = express();
dotenv.config('./.env');
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(morgan('combined'));
//@note /authentication/* endpoint for handling authentication
app.use('/authenticate', authenticateRouter);
//@note /docs/* endpoint for handling docs
app.use('/docs', docsRouter);
let Attachment;
app.listen(process.env.PORT, () => {
	mongoose.connect(process.env.DB_CONNECTION_STRING).then(() => {
		console.log(
			`server is up and running at http://127.0.0.1:${process.env.PORT}`
		);
		Attachment = createModel();
	});
});
export { Attachment };
