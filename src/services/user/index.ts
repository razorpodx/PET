import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

/**
 * Function `create` : create a new user in the database
 * @param payload : the user payload
 * @returns the created user
 */
export async function create(payload: { name: string; email: string }) {
	const newUser = await prisma.user.create({
		data: {
			name: payload.name,
			email: payload.email
		}
	});
	return newUser;
}

/**
 * Function `getAll` : get all users from the database
 * @param query : the query to filter the users
 * @returns all users
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getAll(query: any) {
	let dbquery = {};
	if (query.name) {
		dbquery = {
			...dbquery,
			where: {
				name: {
					contains: query.name
				}
			}
		};
	}
	if (query.email) {
		dbquery = {
			...dbquery,
			where: {
				email: {
					contains: query.email
				}
			}
		};
	}
	const users = await prisma.user.findMany(dbquery);
	return users;
}
