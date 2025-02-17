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
      // Encontrar os ingressos do usuário com base no ID do usuário do token
      const tickets = await Ingresso.findAll({
        where: { userId: req.user.id },  // Supondo que você tenha userId no modelo Ingresso
        include: {
          model: User,  // Inclui dados do usuário (se necessário)
          attributes: ['nome', 'email'] // Exemplo, se necessário
        }
      });
  
      // Retorna os ingressos
      res.json({ tickets });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar ingressos', mensagem: error.message });
    }
  });
  
  module.exports = router;