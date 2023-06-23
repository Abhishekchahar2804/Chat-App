const express = require('express');

const router = express.Router();
const userControllers = require('../controllers/user');

router.get('/',userControllers.getHomePage);

router.post('/signup',userControllers.postAddUser)

module.exports=router;