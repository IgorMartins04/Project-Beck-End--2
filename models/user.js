const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Configuração do Sequelize

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  regra: {
    type: DataTypes.ENUM("user", "admin"),
    defaultValue: "user",
  }
});

module.exports = User;
