const express = require('express');
const sequelize = require('./config/db');
require('dotenv').config(); 
const authRoute = require("./routes/authRoute")
const ingressoRoute = require("./routes/ingressoRoute")
const vendaRoute = require("./routes/vendaRoute")
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser());

const User = require("./models/user")
const Ingresso = require("./models/ingresso")
const Venda = require("./models/venda")

const mustacheExpress = require("mustache-express");
const { BelongsTo } = require('sequelize');
const authMiddleware = require('./middleware/authMiddleware');
const engine = mustacheExpress()

app.engine("mustache", engine)
app.set("views", "views")
app.set("view engine", "mustache")

Ingresso.hasMany(Venda, {
  foreignKey: "IngressoId",
  onDelete: "CASCADE", 
  hooks: true,
})

Venda.belongsTo(Ingresso, {
  foreignKey: "IngressoId"
})
Venda.belongsTo(User, {
  foreignKey: "userId"
})

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/authenticator", authRoute);
app.use("/ingresso", ingressoRoute)
app.use("/vendas", vendaRoute)

app.get("/", (req, res)=>{
  let args = {
    titulo: "Login",
    label_email: "Email",
    label_senha: "Senha",
    label_token: "Token",
    button: "Enviar",
  }

  res.render("login", args)
})


app.get("/history", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id; // Obtém o ID do usuário autenticado
    const vendas = await Venda.findAll({
      where: { userId }, // Busca as compras do usuário
      include: { model: Ingresso, attributes: ["nome", "preco"] }, // Inclui dados do ingresso
    });

    let args = {
      titulo: "Histórico",
      sub_principal: "Meus Ingressos",
      vendas: vendas.map((Venda) => ({
        id: Venda.id, // Corrigido para Venda
        quantidade: Venda.quantidade, // Corrigido para Venda
        totalPrice: Venda.PrecoTotal, // Corrigido para Venda
        Ingresso: {
          nome: Venda.Ingresso.nome, // Corrigido para Venda.Ingresso.nome
          preco: Venda.Ingresso.preco, // Corrigido para Venda.Ingresso.preco
        },
      })),
    };

    res.render("history", args); // Renderiza o template do histórico
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao carregar histórico");
  }
});



// Sincronizar o banco de dados
const PORT = process.env.PORT || 3000;
sequelize.sync()
  .then(() => console.log('Banco de dados sincronizado'))
  .catch(err => console.log('Erro ao sincronizar banco de dados:', err));

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000!');
});
