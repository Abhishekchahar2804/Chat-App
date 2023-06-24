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
        const chat =await Chat.create({message,userId:req.user.id});
        res.status(200).json({userMessage:chat});
        
    }
    catch(err){
        console.log(err);
    }
}

exports.getAllMessage =async(req,res,next)=>{
    try{
        const allUserMessage =await Chat.findAll({where:{userId:req.user.id}});
        res.status(200).json({allUserMessage});
    }
    catch(err){
        console.log(err);
    }
}