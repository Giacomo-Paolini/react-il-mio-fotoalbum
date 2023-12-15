const express = require('express');
const categoriesController = require('../controllers/categoriesController');
const router = express.Router();

router.get('/', categoriesController.index);
router.post('/', categoriesController.store);

module.exports = router;
