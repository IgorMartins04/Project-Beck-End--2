const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
 

const Ingresso = sequelize.define('Ingresso', {

  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  preco: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  quantidadeDisponivel: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
});


module.exports = Ingresso;
