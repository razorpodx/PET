import { Request, Response } from 'express';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function createUser(req: Request, res: Response) {
	const { name, email } = req.body;
	const user = await prisma.user.create({
		data: {
			name,
			email
		}
	});
	res.status(200).json(user);
}

async function getUsers(req: Request, res: Response) {
	const users = await prisma.user.findMany();
	res.status(200).json(users);
}

export default { createUser, getUsers };
