import express from 'express';
const app = express();
const router = express.Router();
import { User } from '../schema/schemas.js';
// @note /authenticate/signup endpoint for user registration
router.route('/signup').post(async (req, res) => {
	try {
		const requser = req.body;
		const userExists = await User.exists({ username: requser.username });
		if (userExists != null) {
			res.status(400).send('username exists');
			return;
		}
		await User.insertMany([
			{ username: requser.username, password: requser.password },
		]);
		res.status(200).send('success');
		return;
	} catch (error) {
		res.status(500).send('internal server error');
		return;
	}
});
//@note /authenticate/signin endpoint for user login
router.route('/signin').get(async (req, res) => {
	const requser = req.body;
	try {
		const user = await User.findOne({
			username: requser.username,
		});
		if (user == null) {
			throw new Error('username is invalid');
		} else {
			if (user.password == requser.password) {
				res.status(200).send('success');
				return;
			} else {
				throw new Error('password is invalid');
			}
		}
	} catch (error) {
		res.status(404).send(error.toString());
		return;
	}
});
export default router;
