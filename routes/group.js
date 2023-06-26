const express = require('express');

const router = express.Router();
const authentication=require('../middleware/auth');
const groupControllers=require('../controllers/group');

router.post('/create',authentication.authenticated,groupControllers.postNewGroup)

router.get('/all',authentication.authenticated,groupControllers.getAllGroup)

router.get('/group-chat/:groupid',authentication.authenticated,groupControllers.groupChats)

router.post('/adduser/:username',authentication.authenticated,groupControllers.addUserToGroup);

router.post('/adminuser/:username',authentication.authenticated,groupControllers.addAdminToGroup)

router.post('/sendchat',authentication.authenticated,groupControllers.sendChatToGroup)

module.exports=router;