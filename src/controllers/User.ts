import { Request, Response } from 'express';
import { create, getAll } from '../services/user/index';

/**
 * Controller `createUser` : Controller to create a new user
 * @param req
 * @param res
 * @returns
 * @example
 * POST /user
 * {
 * 	"id": <number>,
 * 	"name": <string>,
 * 	"email": <string>,
 * 	"createdAt": <string>,
 * 	"updatedAt": <string>
 * }
 * @example
 * curl -X POST -H "Content-Type: application/json" -d '{"name": "test", "email": "email@website.com"}' http://localhost:3000/user
 * @example
 * fetch('http://localhost:3000/user', {
 * 	method: 'POST',
 * 	headers: {
 * 		'Content-Type': 'application/json'
 * 	},
 * 	body: JSON.stringify({
 * 		name: 'test',
 * 		email: 'email@website.com"
 * 	})
 * })
 * 	.then((res) => res.json())
 * 	.then((data) => console.log(data));
 * })
 */
export async function createUser(req: Request, res: Response) {
	const payload = req.body;
	const user = await create(payload);
	res.status(200).json(user);
}

/**
 * Controller `getAllUsers` : Controller to get all users
 * @param req
 * @param res
 * @returns
 * @example
 * GET /user
 * [<user>, <user>, ...]
 * @example
 * curl -X GET http://localhost:3000/user
 * @example
 * fetch('http://localhost:3000/user', {
 * 	method: 'GET'
 * })
 * 	.then((res) => res.json())
 * 	.then((data) => console.log(data));
 * })
 */
export async function getUsers(req: Request, res: Response) {
	const query = req.query ?? {};
	const users = await getAll(query);
	res.status(200).json(users);
}
