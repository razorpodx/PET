import { Request, Response } from 'express';
import UserService from '../services/user/index';

async function createUser(req: Request, res: Response) {
	const payload = req.body;
	const user = await UserService.create(payload);
	res.status(200).json(user);
}

async function getUsers(req: Request, res: Response) {
	const users = await UserService.getAll();
	res.status(200).json(users);
}

export default { createUser, getUsers };
