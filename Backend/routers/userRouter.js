const express = require('express');
const usersController = require('../controllers/usersController');
const router = express.Router();
const userValidation = require('../middlewares/userValidation');

router.post('/register', userValidation, usersController.register);
router.post('/login', usersController.login);

module.exports = router;
