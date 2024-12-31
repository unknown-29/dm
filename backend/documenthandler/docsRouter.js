import { User, Doc } from '../schema/schemas.js';
import { Attachment } from '../index.js';
import { createReadStream } from 'fs';
import express from 'express';
const app = express();
const router = express.Router();
// @note /docs/upsert endpoint for doc creation and update
router.route('/upsert').post(async (req, res) => {
	try {
		const reqdoc = req.body;
		await Doc.findOneAndUpdate(
			{ owner: reqdoc.owner, docname: reqdoc.docname },
			reqdoc,
			{ upsert: true, overwrite: true }
		);
		res.status(200).send('success');
		return;
	} catch (error) {
		res.status(500).send('internal server error');
		return;
	}
});
// @note /docs/delete endpoint for doc deletion
router.route('/delete').delete(async (req, res) => {
	try {
		const reqdoc = req.body;
		await Doc.findOneAndDelete({
			owner: reqdoc.owner,
			docname: reqdoc.docname,
		});
		res.status(200).send('success');
		return;
	} catch (error) {
		res.status(500).send('internal server error');
		return;
	}
});
// @note /docs/get-all-doc-names endpoint for getting all docs' names for the given owner
router.route('/get-all-doc-names').get(async (req, res) => {
	try {
		const reqdoc = req.body;
		const docnames = await Doc.find(
			{
				owner: reqdoc.owner,
			},
			{ docname: 1 }
		);
		res.status(200).json({ docnames });
		return;
	} catch (error) {
		res.status(500).send('internal server error');
		return;
	}
});
// @audit /docs/get-doc-content endpoint for getting doc's content
router.route('/get-doc-content').get(async (req, res) => {
	try {
		const reqdoc = req.body;
		const content = await Doc.findOne(
			{
				owner: reqdoc.owner,
				docname: reqdoc.docname,
			},
			{ content: 1 }
		);
		if (content != null) {
			res.status(200).json(content);
			return;
		} else throw new Error('no content');
	} catch (error) {
		console.log(error);

		if (error.toString() == 'Error: no content') {
			res.status(404).send('not found');
			return;
		} else {
			res.status(500).send('internal server error');
			return;
		}
	}
});
// @note /docs/get-doc-names-shared-with-user endpoint for getting all docs' names that are shared with the given username
router.route('/get-doc-names-shared-with-user').get(async (req, res) => {
	try {
		const requser = req.body;
		const docs = await Doc.find({
			'sharedWith.username': requser.username,
		});
		res.status(200).json({ docs });
		return;
	} catch (error) {
		res.status(500).send('internal server error');
		return;
	}
});
// router.route('/upsert-content').post(async (req, res) => {
// 	try {
// 		const reqdoc = req.body;
// 		await Doc.findOneAndUpdate(
// 			{ owner: reqdoc.owner, docname: reqdoc.docname },
// 			reqdoc,
// 			{ upsert: true, overwrite: true }
// 		);
// 		res.status(200).send('success');
// 		return;
// 	} catch (error) {
// 		res.status(500).send('internal server error');
// 		return;
// 	}
// 	// const readStream = createReadStream(
// 	// 	'P:\\vscodeworkspace\\syncscripts\\backend\\document_handler\\sample.txt'
// 	// );
// 	// const options = {
// 	// 	filename: 'sample.txt',
// 	// 	contentType: 'text/plain',
// 	// };
// 	// Attachment.write(options, readStream, (error, file) => {
// 	// 	console.dir(error);
// 	// });
// });
router.route('/read').get((req, res) => {
	const _id = mongoose.Types.ObjectId('67739d61d1863b595bccdd8d');
	const options = {
		filename: 'sample.txt',
		contentType: 'text/plain',
	};
	// read larger file
	const readStream = Attachment.read({ _id });
	readStream.pipe(res);
});
export default router;
