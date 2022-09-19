import mongoose, { Schema, Document } from 'mongoose';

export interface IAccount extends Document {
	channel: string;
	username: string;
	password: string;
	user: string;
}

export interface IAccountModel extends IAccount, Document {}

const AccountSchema: Schema = new Schema(
	{
		channel: { type: String, required: true },
		username: { type: String, required: true },
		password: { type: String, required: true },
		user: { type: Schema.Types.ObjectId, ref: 'User' }
	},
	{
		timestamps: true
	}
);

export default mongoose.model<IAccountModel>('Account', AccountSchema);
