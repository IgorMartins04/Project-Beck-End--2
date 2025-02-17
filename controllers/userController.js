const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sequelize = require("sequelize")

// Cadastro
exports.registerUser = async (req, res) => {
  const { nome, email, senha, regra } = req.body;
  
  try {
    const hashedPassword = await bcrypt.hash(senha, 10);
    const user = await User.create({ nome, email, senha: hashedPassword, regra });
    res.status(201).json({ message: 'Usuário criado', user });
  } catch (error) {
    res.status(400).json({ mensagem: "Erro para cadastro de usuario" ,error: error.message });
  }
};

// Login
exports.loginUser = async (req, res) => {
  const { email, senha } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

    const validPassword = await bcrypt.compare(senha, user.senha);
    if (!validPassword) return res.status(401).json({ error: 'Senha incorreta' });

    const token = jwt.sign(
      { id: user.id, nome: user.nome, regra: user.regra, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    
    return res.json({ message: 'Autenticado com sucesso', token }); 

  } catch (error) {
    res.status(500).json({ mensagem: 'Erro no login de usuario', error: error.message });
  }
};
