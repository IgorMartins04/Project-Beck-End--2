const express = require('express');
const sequelize = require("sequelize")
const {
    CompraIngresso, history
}=  require ("../controllers/vendaController");

const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

router.post("/", authMiddleware, CompraIngresso);

router.get('/history', authMiddleware, async (req, res) => {
    try {
      
      const tickets = await Ingresso.findAll({
        where: { userId: req.user.id }, 
        include: {
          model: User,  
          attributes: ['nome', 'email'] 
        }
      });
  
      
      res.json({ tickets });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar ingressos', mensagem: error.message });
    }
  });
  
  module.exports = router;
