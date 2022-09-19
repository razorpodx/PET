import { NextFunction, Request, Response } from 'express';
import User from '../models/User';

const readAll = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const users = await User.find();
		res.status(200).json(users);
	} catch (error) {
		next(error);
	}
};

const readUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { userid } = req.params;
		const user = await User.findById(userid);

		if (!user) {
			return res.status(404).json({ message: 'User Not Found' });
		}
		res.status(200).json(user);
	} catch (error) {
		next(error);
	}
};

const createUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { name } = req.body;
		const user = await User.create({ name });
		res.status(201).json(user);
	} catch (error) {
		next(error);
	}
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { userid } = req.params;
		const { name } = req.body;
		const user = await User.findByIdAndUpdate(userid, { name }, { new: true });

		if (!user) {
			return res.status(404).json({ message: 'User Not Found' });
		}
		res.status(200).json(user);
	} catch (error) {
		next(error);
	}
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { userid } = req.params;
		const user = await User.findByIdAndDelete(userid);

		if (!user) {
			return res.status(404).json({ message: 'User Not Found' });
		}
		res.status(204).json({ message: 'User Deleted' });
	} catch (error) {
		next(error);
	}
};

const updateOrInsertUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { userid } = req.params;
		const { name } = req.body;
		const user = await User.findByIdAndUpdate(userid, { name }, { new: true, upsert: true });

		if (!user) {
			return res.status(404).json({ message: 'User Not Found' });
		}
		res.status(200).json(user);
	} catch (error) {
		next(error);
	}
};

export default { readAll, readUser, createUser, updateUser, deleteUser, updateOrInsertUser };
