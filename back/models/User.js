const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('User', {
  name: { type: DataTypes.STRING, allowNull: false },
  username: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING, allowNull: false }, // 'student' o 'moderator'
});

module.exports = User;
