const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient();

async function register(req, res) {
	const { username, email, password } = req.body;

	const hashedPassword = await bcrypt.hash(password, 10);

	const newUser = await prisma.user.create({
		data: {
			username,
			email,
			password: hashedPassword,
		},
	});

	res.json(newUser);
}

async function login(req, res) {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).json({ error: 'Email and password are required' });
	}

	const user = await prisma.user.findUnique({ where: { email: email } });

	if (!user) {
		return res.status(400).json({ message: 'Invalid email or password' });
	}

	const passwordValid = await bcrypt.compare(password, user.password);

	if (!passwordValid) {
		return res.status(400).json({ message: 'Invalid email or password' });
	}

	const token = jwt.sign({ email: user.email }, process.env.YOUR_SECRET_KEY);
	console.log(token);

	res.json({ token });
}

module.exports = {
	register,
	login,
};
