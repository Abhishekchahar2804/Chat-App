const User = require("../models/user");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const rootDir = require("../util/path");

exports.getHomePage = (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "signup.html"));
};

exports.postAddUser = async (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const phonenumber = req.body.phonenumber;
  const password = req.body.password;

  try {
    const user = await User.findAll({where:{email}});
    console.log(user);
    if (user) {
      res.status(200).json({ message: "not success" });
    } else {
      const saltRounds = 10;
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        const result = await User.create({
          name,
          email,
          phonenumber,
          password: hash,
        });
        res.status(200).json({ userInfo: result, message: "success" });
      });
    }
  } catch (err) {
    console.log(err);
  }
};
