const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Chat = sequelize.define('chat',{
    id:{
        type:Sequelize.DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    message:{
        type:Sequelize.DataTypes.STRING,
        allowNull:false
    }
})

module.exports=Chat;