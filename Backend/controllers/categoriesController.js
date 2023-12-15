const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function index(req, res) {
	const categories = await prisma.category.findMany();
	res.json(categories);
}

async function store(req, res) {
	if (!req.body) {
		return res.status(400).json({ message: 'Request body is missing' });
	}

	const data = req.body;
	const newCategory = await prisma.category.create({
		data: {
			name: data.name,
		},
	});
	res.json(newCategory);
}

module.exports = {
	index,
	store,
};
