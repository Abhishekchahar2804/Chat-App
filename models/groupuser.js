const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Groupuser = sequelize.define('groupuser',{
    id:{
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    isAdmin:{
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: 0
    }
});

 module.exports = Groupuser;