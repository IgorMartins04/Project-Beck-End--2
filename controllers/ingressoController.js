const IngressoModel = require('../models/ingresso');
const sequelize = require("sequelize")



exports.createIngresso = async (req, res) => {

  const { nome, preco, quantidadeDisponivel } = req.body;
  try {
    const ingresso = await IngressoModel.create({ nome, preco, quantidadeDisponivel });
    res.status(201).json({ message: 'Ingresso criado', ingresso });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.getAllIngresso =  async (req, res) => {
  try {
    const ingresso = await IngressoModel.findAll();
    res.status(200).json(ingresso);
  } catch (error) {
    res.status(500).json({ message: "Ingressos nao encontrados",error: error.message });
  }
};


exports.getIngressoById = async (req, res) => {
  const { id } = req.params;
  try {
    const ingresso = await IngressoModel.findByPk(id);
    if (!ingresso) return res.status(404).json({ error: 'Tipo de ingresso não encontrado' });
    res.status(200).json(ingresso);
  } catch (error) {
    res.status(500).json({ message: "Tipo de ingresso não encontrado",error: error.message });
  }
};


exports.updateIngresso = async (req, res) => {
  const { id } = req.params;
  const { nome, preco, quantidadeDisponivel } = req.body;
  try {
    const ingresso = await IngressoModel.findByPk(id);
    if (!ingresso) return res.status(404).json({ error: 'Tipo de ingresso não encontrado' });

    await ingresso.update({ nome, preco, quantidadeDisponivel });
    res.status(200).json({ message: 'Ingresso atualizado', ingresso });
  } catch (error) {
    res.status(400).json({ message: "Ingresso nao atualizado",error: error.message });
  }
};


exports.deleteIngresso = async (req, res) => {
  const { id } = req.params;
  try {
    const vendas = await Venda.findAll({ where: { IngressoId: ingressoId } });
    if (vendas.length > 0) {
      return res.status(400).json({
        message: "Não é possível excluir o ingresso, pois ele está associado a uma venda.",
      });
    }
    
    const ingresso = await IngressoModel.findByPk(id);
    if (!ingresso) return res.status(404).json({ error: 'Tipo de ingresso não encontrado' });

    await ingresso.destroy();
    res.status(200).json({ message: 'Ingresso deletado' });
  } catch (error) {
    res.status(500).json({ message: "Ingresso nao deletado",error: error.message });
  }
};
