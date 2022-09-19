import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
	name: string;
}

export interface IUserModel extends IUser, Document {}

const UserSchema: Schema = new Schema(
	{
		name: { type: String, required: true }
	},
	{
		timestamps: true,
		versionKey: false
	}
);

export default mongoose.model<IUserModel>('User', UserSchema);
