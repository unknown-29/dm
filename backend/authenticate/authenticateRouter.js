import express from 'express';
const app = express();
const router = express.Router();
import { User } from '../schema/schemas.js';
router.route('/signup').post((req, res) => {
	User.insertMany([
		{ username: req.body.username, password: req.body.password },
	])
		.then(() => {
			res.status(200).send('success');
		})
		.catch((err) => {
			res.status(500).send('internal server error');
		});
});
router.route('/signin').get(async (req, res) => {
	try {
		const user = await User.findOne({
			username: req.body.username,
		});
		if (user == null) {
			throw new Error('username is invalid');
		} else {
			if (user.password == req.body.password) {
				res.status(200).send('success');
			} else {
				throw new Error('password is invalid');
			}
		}
	} catch (error) {
		res.status(404).send(error.toString());
	}
});
export default router;
