const express = require('express');

const router = express.Router();
const chatControllers = require('../controllers/chat');
const authentication = require('../middleware/auth');

router.get('/',chatControllers.chatHomePage)

router.post('/message',authentication.authenticated,chatControllers.postMessage)

router.get('/all-chats',authentication.authenticated,chatControllers.allChats)

router.get('/all-user',authentication.authenticated,chatControllers.getAllUser);

module.exports=router;