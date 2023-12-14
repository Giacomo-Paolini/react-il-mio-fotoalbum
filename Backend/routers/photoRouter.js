const express = require('express');
const router = express.Router();
const photosController = require('../controllers/photosController');

router.get('/', photosController.index);
router.get('/:id', photosController.show);
router.post('/', photosController.store);
router.put('/:id', photosController.update);
router.delete('/:id', photosController.destroy);

module.exports = router;
