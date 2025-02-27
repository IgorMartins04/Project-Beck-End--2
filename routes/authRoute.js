const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');

const router = express.Router();

router.post('/register', registerUser); // Cadastro
router.post('/login', loginUser);       // Login

module.exports = router;
