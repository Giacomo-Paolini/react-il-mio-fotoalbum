const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function index(req, res) {
	const photos = await prisma.photo.findMany({
		// ATTIVARE QUANDO SI VUOLE FILTRARE LE FOTO VISIBILI
		// where: {
		//    visible: true,
		// },
	});
	res.json(photos);
}

async function store(req, res) {
	if (!req.body || !req.body.categories) {
	  return res.status(400).json({ message: 'Request body or categories are missing' });
	}
  
	const data = req.body;
	const newPhoto = await prisma.photo.create({
	  data: {
		title: data.title,
		description: data.description,
		image: req.file.filename,
		visible: data.visible ? true : false,
		category: {
		  connect: {
			id: Number(data.categories), // if categories is a string number
		  },
		},
	  },
	});
	res.json(newPhoto);
  }

async function show(req, res) {
	const { id } = req.params;
	const photo = await prisma.photo.findUnique({
		where: {
			id: parseInt(id),
		},
	});
	res.json(photo);
}

async function update(req, res) {}

async function destroy(req, res) {
	const { id } = req.params;
	const photo = await prisma.photo.delete({
		where: {
			id: parseInt(id),
		},
	});
	res.json(photo);
}

module.exports = {
	index,
	show,
	store,
	update,
	destroy,
};
