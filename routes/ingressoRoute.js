const express = require('express');
const sequelize = require("sequelize")
const {
  createIngresso, getAllIngresso,
  getIngressoById, updateIngresso,
  deleteIngresso
} = require('../controllers/ingressoController');
const {
  history
} = require("../controllers/vendaController")

const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/admMiddleware');
const isAdmin = require('../middleware/admMiddleware');

const router = express.Router();

router.post('/', authMiddleware, adminMiddleware, isAdmin, createIngresso);  // Cria um ingresso 
router.get('/', getAllIngresso); // Mostra todos os ingressos 
router.get('/:id', getIngressoById); // Busca um ingresso por id 
router.put('/:id', authMiddleware, adminMiddleware, isAdmin, updateIngresso);  // Altera um ingresso por id 
router.delete('/:id', authMiddleware, adminMiddleware, isAdmin, deleteIngresso);  // Deleta um ingresso por id 

router.get('/history', history); // Exibe o historico 

module.exports = router;
