const express = require('express');

const router = express.Router();
const userControllers = require('../controllers/user');

router.get('/',userControllers.getHomePage);

router.post('/signup',userControllers.postAddUser)
router.get('/login',userControllers.getloginPage)

router.post('/login/login-user',userControllers.postCheckUser)

module.exports=router;