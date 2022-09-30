async function create(payload: any, prisma: any) {
	const newUser = await prisma.user.create({
		data: {
			name: payload.name,
			email: payload.email
		}
	});
	return newUser;
}

export default {
	create
};
