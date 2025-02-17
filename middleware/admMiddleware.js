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
    
    if (!req.user || req.user.regra !== "admin") {
      return res.status(403).json({
        mensagem: "Apenas administradores podem gerenciar ingressos.",
      });
    }
  
    next(); 
  };
  
  module.exports = isAdmin;
