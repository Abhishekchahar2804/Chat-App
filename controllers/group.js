const Group=require('../models/group');
const User=require('../models/user');
const GroupUser=require('../models/groupuser');
const GroupMessage=require('../models/groupmessage');

exports.postNewGroup =async(req,res,next)=>{
    const name=req.body.group;
    try{
        const newGroup=await Group.create({group:name});
        const groupUser =await GroupUser.create({groupId:newGroup.id,userId:req.user.id,isAdmin:1});
        res.status(200).json({newGroup});
    }
    catch(err){
        console.log(err);
    }
}

exports.getAllGroup =async(req,res,next)=>{
    try{
        const groupList=await GroupUser.findAll({where:{userId:req.user.id}});
        let allGroups = [];
        let groupsWithAdmin = [];
        for(let grp of groupList){
            let groupFromDb = await Group.findOne({
                where:{
                    id: grp.groupId
                }
            })
            if(grp.isAdmin === true){
                groupsWithAdmin.push(groupFromDb)
            }
            allGroups.push(groupFromDb);
        }
        // console.log("output>>>>>>>>>>>>>>>",allGroups);
        res.status(200).json({allGroups,groupsWithAdmin});
    }
    catch(err){
        console.log(err);
    }
}

exports.groupChats = async (req,res) => {
    try {
        console.log(req.params);
        const groupChatsFromDb = await GroupMessage.findAll({
            where:{
                'groupId': req.params.groupid
            }
        })
        console.log(groupChatsFromDb);
        res.status(200).json(groupChatsFromDb);
    } catch (error) {
        res.status(404).json({success: 'false',error});
    }
}

exports.addUserToGroup = async (req,res) => {
    try {
        const groupName = req.body;
        const username = req.params.username;
        const findGroup = await Group.findOne({
            where:groupName
        })
        const findUser = await User.findOne({
            where: {
                name:username
            }
        })
        if(findGroup && findUser){
            const userAddToGrp = await GroupUser.create({
                'groupId': findGroup.id,
                'userId': findUser.id
            })
            res.status(201).json(userAddToGrp)
        }
    } catch (error) {
        res.status(404).json(error);
    }
}

exports.addAdminToGroup = async (req,res) => {
    try {
        const groupName = req.body;
        const username = req.params.username;
        const findGroup = await Group.findOne({
            where: groupName
        })
        const findUser = await User.findOne({
            where: {
                name:username
            }
        })
        if(findGroup && findUser){
            const userAdminToGrp = await GroupUser.create({
                'groupId': findGroup.id,
                'userId': findUser.id,
                'isAdmin': 1
            })
            res.status(201).json(userAdminToGrp);
        }
    } catch (error) {
        res.status(404).json(error);
    }
}

exports.sendChatToGroup = async (req,res) => {
    try {
        const groupuser=await GroupUser.findOne({where:{userId:req.user.id}});
        const sendChat = await GroupMessage.create({
            'message': req.body.message,
            'userId': req.user.id,
            'groupId': groupuser.groupId
        })
        res.status(201).json(sendChat);
    } catch (error) {
        res.status(404).json(error);
    }
}