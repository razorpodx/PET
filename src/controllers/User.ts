import { Request, Response } from 'express';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import UserService from '../services/user/index';

async function createUser(req: Request, res: Response) {
	const payload = req.body;
	const user = await UserService.create(payload, prisma);
	res.status(200).json(user);
}

async function getUsers(req: Request, res: Response) {
	const users = await prisma.user.findMany();
	res.status(200).json(users);
}

export default { createUser, getUsers };
