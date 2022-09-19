import { NextFunction, Request, Response } from 'express';
import Account from '../models/Account';

const readAll = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const accounts = await Account.find();
		res.status(200).json(accounts);
	} catch (error) {
		next(error);
	}
};

const readAccount = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { accountid } = req.params;
		const account = await Account.findById(accountid);

		if (!account) {
			return res.status(404).json({ message: 'Account Not Found' });
		}
		res.status(200).json(account);
	} catch (error) {
		next(error);
	}
};

const createAccount = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { channel, username, password, user } = req.body;
		const account = await Account.create({ channel, username, password, user });
		res.status(201).json(account);
	} catch (error) {
		next(error);
	}
};

const updateAccount = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { accountid } = req.params;
		const { channel, username, password, user } = req.body;
		const account = await Account.findByIdAndUpdate(accountid, { channel, username, password, user }, { new: true });

		if (!account) {
			return res.status(404).json({ message: 'Account Not Found' });
		}
		res.status(200).json(account);
	} catch (error) {
		next(error);
	}
};

const deleteAccount = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { accountid } = req.params;
		const account = await Account.findByIdAndDelete(accountid);

		if (!account) {
			return res.status(404).json({ message: 'Account Not Found' });
		}
		res.status(204).json({ message: 'Account Deleted' });
	} catch (error) {
		next(error);
	}
};

export default { readAll, readAccount, createAccount, updateAccount, deleteAccount };
