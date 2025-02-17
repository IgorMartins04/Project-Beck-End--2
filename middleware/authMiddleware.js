const jwt = require('jsonwebtoken');


const authMiddleware = (req, res, next) => {
  const token = req.cookies.token || req.headers['authorization']?.split(' ')[1]; // Pega o token do cookie ou da autorização

  if (!token) {
    return res.status(401).json({ error: 'Token não encontrado' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Token inválido' });
    }
    
    req.user = decoded; // Adiciona os dados do usuário ao request
    next(); // Continua para a próxima função ou rota
  });
};

module.exports = authMiddleware;
