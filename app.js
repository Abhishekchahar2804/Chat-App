const express = require("express");
const path=require('path')

const app = express();
require("dotenv").config();
app.use(express.static(path.join(__dirname,"public")));
app.use(express.json());
const sequelize = require("./util/database");
const userRoute=require('./routes/user');

app.use('/user',userRoute);

sequelize
  .sync()
  .then((result) => {
    app.listen(4000);
  })
  .catch((err) => {
    console.log(err);
  });
