const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const userValidation = async (req, res, next) => {
	const { username, email, password } = req.body;
	const user = await prisma.user.findUnique({ where: { email } });
	if (user) {
		return res.status(409).json({ message: 'User already registered' });
	}
	next();
};

module.exports = userValidation;
