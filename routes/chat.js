const express = require('express');

const router = express.Router();
const chatControllers = require('../controllers/chat');
const authentication = require('../middleware/auth');

router.get('/',chatControllers.chatHomePage)

router.post('/message',authentication.authenticated,chatControllers.postMessage)

module.exports=router;