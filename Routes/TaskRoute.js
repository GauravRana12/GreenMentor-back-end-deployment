const express=require('express');
const { Authenticate } = require('../Middleware/Auth');
const TaskModel = require('../Modals/Task.Model');
const UserModel = require('../Modals/User.Model');
var TaskRoute=express.Router();


TaskRoute.get('/',async (req,res)=>{
   try {
    const allTask=await TaskModel.find({});
    return res.send(allTask);
   } catch (error) {
    console.log(error);
   }
})

TaskRoute.get('/getmy',Authenticate,async (req,res)=>{
    try {
        const userId=req.userId;
        let task=await TaskModel.find({authorId:userId});
        return res.send(task);
    } catch (error) {
        console.log(error);
    }
})

TaskRoute.get('/single/:idd',Authenticate,async (req,res)=>{
    try {
        const idd=req.params;
        console.log("id",idd);
        const task=await TaskModel.findById(idd.idd);
        console.log(task);
        res.send(task);
    } catch (error) {
        console.log(error);
    }
})
TaskRoute.post('/',Authenticate,async (req,res)=>{
    try {
        const userId=req.userId;
        console.log("userId",userId);
        const user=await UserModel.findOne({_id:userId});
        let task=req.body;
        let obj={
            ...task,
            profileImg:user.image,
            authorId:userId
        }
        await TaskModel.create(obj);
      return  res.send("task added successfully");
    } catch (error) {
        console.log(error);
    }
})

TaskRoute.patch('/:taskId',Authenticate,async (req,res)=>{
    try {
        const userId=req.userId;
        let {taskId}=req.params;
        const input=req.body;
        
        const task=await TaskModel.findOne({_id:taskId});
           
            
            await TaskModel.findByIdAndUpdate(taskId,input);
            res.send('Task updated successfully');
        
    } catch (error) {
        console.log(error);
    }
})

TaskRoute.delete('/:taskId',Authenticate,async (req,res)=>{
    try {
        const userId=req.userId;
        let {taskId}=req.params;
        const task=await TaskModel.findOne({_id:taskId,authorId:userId});
        if (!task) {
            return res.status(404).json({ message: 'This task does not exist or you do not have access to it.' });
        }
        else{
            await TaskModel.findByIdAndDelete(taskId);
            res.send('Task deleted successfully')
        }
    } catch (error) {
        console.log(error);
    }
})

module.exports=TaskRoute