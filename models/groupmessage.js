const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Groupmessage = sequelize.define('groupmessage', {
  id:{
    type: Sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
    message: {
      type: Sequelize.DataTypes.STRING,
      defaultValue: "joined"
    }
 });

 module.exports = Groupmessage;