const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Group = sequelize.define('group', {
    group: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false
    }
 });

 module.exports = Group;