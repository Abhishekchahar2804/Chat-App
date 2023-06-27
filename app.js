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
const groupRoute=require('./routes/group');

app.use('/user',userRoute);
app.use('/chat',chatRoute);
app.use('/group',groupRoute);

const User = require('./models/user');
const Chat=require('./models/chat');
const Group=require('./models/group');
const groupMessage=require('./models/groupmessage');
const groupUser=require('./models/groupuser');

User.hasMany(Chat);
Chat.belongsTo(User);

User.hasMany(groupMessage);
Group.hasMany(groupMessage);
Group.hasMany(groupUser);
User.hasMany(groupUser);

io.on("connection",socket => {
  socket.on('message-sent',(data)=>{
    socket.broadcast.emit('message-recived',data);
  })
})

sequelize
  .sync()

  .then((result) => {
    server.listen(4000);
  })
  .catch((err) => {
    console.log(err);
  });
