const express = require("express");
const path=require('path')
const cors = require('cors')

const app = express();
require("dotenv").config();
app.use(cors());
app.use(express.static(path.join(__dirname,"public")));
app.use(express.json());
const sequelize = require("./util/database");
const userRoute=require('./routes/user');
const chatRoute =require('./routes/chat');

app.use('/user',userRoute);
app.use('/chat',chatRoute);

const User = require('./models/user');
const Chat=require('./models/chat');

User.hasMany(Chat);
Chat.belongsTo(User);

sequelize
  .sync()
  .then((result) => {
    app.listen(4000);
  })
  .catch((err) => {
    console.log(err);
  });
