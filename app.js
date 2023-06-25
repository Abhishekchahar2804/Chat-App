const express = require("express");
const path=require('path')
const cors = require('cors')
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server =http.createServer(app);
const io =socketio(server);
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
    server.listen(4000);
  })
  .catch((err) => {
    console.log(err);
  });
