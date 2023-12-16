const express = require('express');
const usersController = require('../controllers/usersController');
const router = express.Router();
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('file'), (req, res) => {
	try {
		res.send({ message: 'File uploaded successfully' });
	} catch (error) {
		console.error(error);
	}
});

module.exports = router;
