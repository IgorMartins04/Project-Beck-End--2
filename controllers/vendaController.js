const Venda = require('../models/venda');
const Ingresso = require('../models/ingresso');
const sequelize = require("sequelize")

// Realizar uma venda de ingressos
exports.CompraIngresso =  async (req, res) => {
  try {
    const { venda } = req.body; 
    const userId = req.user.id;

    if (!Array.isArray(venda) || venda.length === 0) {
      return res.status(400).json({ mensagem: "Lista invalida." });
    }

    let totalCost = 0;
    const purchaseRecords = [];

    for (const item of venda) {
      const ingresso = await Ingresso.findByPk(item.IngressoId);

      if (!ingresso) {
        return res.status(404).json({ mensagem: `Ingresso não encontrado: ${item.IngressoId}` });
      }

      if (ingresso.quantidadeDisponivel < item.quantidade) {
        return res.status(400).json({
          mensagem: `Estoque insuficiente para o ingresso: ${ingresso.nome}. Apenas ${ingresso.quantidadeDisponivel} disponíveis.`,
        });
      }

      // Atualizar o estoque do ingresso
      ingresso.quantidadeDisponivel -= item.quantidade;
      await ingresso.save();

      const totalPrice = ingresso.preco * item.quantidade;
      totalCost += totalPrice;

      // Criar o registro de compra
      const newVenda = await Venda.create({
        userId,
        IngressoId: item.IngressoId,
        quantidade: item.quantidade,
        PrecoTotal: totalPrice,
      });

      purchaseRecords.push(newVenda);
    }

    res.status(201).json({
      mensagem: "Compra realizada com sucesso",
      totalCost,
      purchases: purchaseRecords,
    });
  } catch (error) {
    res
      .status(500)
      .json({ mensagem: "Erro ao processar compra.", erro: error.message });
  }
};

exports.history =   async (req, res) => {
  try {
    const userId = req.user.id;
    console.log('User ID:', userId);
    const vendas = await Venda.findAll({
      where: { userId },
      include: {
        model: Ingresso,
        attributes: ["nome", "preco"],
      },
    });

    res.json({ mensagem: "Histórico de compras retornado com sucesso" , vendas});
  } catch (error) {
    res
      .status(500)
      .json({ mensagem: "Erro ao buscar histórico.", erro: error.message });
  }
};

