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

router.post('/', authMiddleware, adminMiddleware, isAdmin, createIngresso);  
router.get('/', getAllIngresso); 
router.get('/:id', getIngressoById); 
router.put('/:id', authMiddleware, adminMiddleware, isAdmin, updateIngresso);  
router.delete('/:id', authMiddleware, adminMiddleware, isAdmin, deleteIngresso);  

router.get('/history', history); 

module.exports = router;
