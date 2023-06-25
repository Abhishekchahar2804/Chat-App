const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Chat = sequelize.define('chat',{
    username: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    message:{
        type:Sequelize.DataTypes.STRING,
        allowNull:false
    }
})

module.exports=Chat;