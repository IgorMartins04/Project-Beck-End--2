const { Model ,DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');
const Ingresso = require('./ingresso');


const Venda = sequelize.define('Venda', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  IngressoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Ingresso,
      key: 'id',
    },
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  PrecoTotal: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
})



module.exports = Venda;
