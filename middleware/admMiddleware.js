module.exports = (req, res, next) => {
    if (req.user && req.user.regra === "admin") {
      next(); 
    } else {
      res
        .status(403)
        .json({
          mensagem:
            "Apenas administradores realizar este tipo de acao.",
        });
    }
  };
  
  const isAdmin = (req, res, next) => {
    // Verifica se o usuário está autenticado e possui o campo 'regra'
    if (!req.user || req.user.regra !== "admin") {
      return res.status(403).json({
        mensagem: "Apenas administradores podem gerenciar ingressos.",
      });
    }
  
    next(); // Usuário é administrador, prossegue para a próxima função
  };
  
  module.exports = isAdmin;