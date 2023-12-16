const express = require('express');
const router = express.Router();
const photosController = require('../controllers/photosController');
const multer = require('multer');
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads/');
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	},
});

const upload = multer({ storage: storage });

router.get('/', photosController.index);
router.get('/:id', photosController.show);
router.post('/', upload.single('image'), photosController.store);
router.put('/:id', photosController.update);
router.delete('/:id', photosController.destroy);

module.exports = router;
