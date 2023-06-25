const User = require('../models/user');
const Chat = require('../models/chat');
const path = require("path");
const rootDir = require("../util/path");

exports.chatHomePage =(req,res,next)=>{
    res.sendFile(path.join(rootDir,'views','chat.html'));
}

exports.postMessage =async(req,res,next)=>{
    const message=req.body.message
    try{
        // const chat=await Chat.findAll({where:{userId:req.user.id}});
        // if(chat.length>0){
        //     const chat=await Chat.update({message},{where:{userId:req.user.id}})
        //     res.status(200).json({userMessage:chat});
        // }
        const chat =await Chat.create({message,userId:req.user.id,username:req.user.name});
        res.status(200).json({chat});
        
    }
    catch(err){
        console.log(err);
    }
}

exports.getAllUser =async(req,res,next)=>{
    try{
        const user =await User.findAll({attributes:['name']});
        res.status(200).json({user});
    }
    catch(err){
        console.log(err);
    }
}


exports.allChats = async (req,res) => {
    try {
    const chats = await Chat.findAll();
    if(chats){
        res.status(200).json(chats);
    }else{
        res.status(404).json({
            'success': 'false'
        })
    }
} catch (error) {
        res.status(404).json({
            'success': 'false'
        })
}
}