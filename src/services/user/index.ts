import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function create(payload: { name: string; email: string }) {
	const newUser = await prisma.user.create({
		data: {
			name: payload.name,
			email: payload.email
		}
	});
	return newUser;
}

async function getAll() {
	const users = await prisma.user.findMany();
	return users;
}

export default {
	create,
	getAll
};
