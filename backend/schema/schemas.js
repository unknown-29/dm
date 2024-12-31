import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
	username: String,
	password: String,
});

const docSchema = new Schema({
	owner: String,
	docname: String,
	content: String,
	sharedWith: [
		{
			username: String,
			permissions: { type: String, enum: ['editor', 'viewer'] },
		},
	],
	url: String,
});

const User = mongoose.model('User', userSchema);
const Doc = mongoose.model('Doc', docSchema);
export { User, Doc };
