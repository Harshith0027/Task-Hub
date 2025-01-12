import { validationResult } from "express-validator";
import Task from "../models/Task.js";

export const fetchTasks = async (req, res)=>{
    try{
        const tasks = await Task.find({user : req.user});
        return res.json(tasks);
    }
    catch(err){
        return res.status(500).json({error : "Error fetching tasks" });
    }
};

export const addTasks = async (req, res)=>{
    const errors = validationResult(req);
    try{
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { description } = req.body;
        //console.log(req.user);
        const task = new Task({
            user: req.user, 
            description : description
        })
        const savedTask = await task.save();
        return res.json({savedTask});
    }
    catch(err){
        return res.status(500).json({error : "Internal Error occured while saving tasks" });
    }
}

export const updateTasks = async (req, res)=>{
    try{
        const { description } = req.body;
        const { id , postId } = req.params;
        // checking the note in db
        // if attacker tried to access the task through url, then this case hits...
        //console.log(req.params.id);
        let task = await Task.findOne({user : req.params.id, _id : req.params.postId});
        //console.log(task);
        if(!task){
            throw new Error("Not Found");
            return res.status(404).json({message : "Not Found"});
        }
        //verifying the user and note's user id for checking the same user authorization...
        if(task.user.toString() !== req.user){
            throw new Error("Unauthorized Access");
            return res.status(401).json({message : "Unauthorized Access"});
        }
        const newTask = {};
        if(description){
            newTask.description = description
        };
        task = await Task.findOneAndUpdate({user : id, _id : postId}, {$set : newTask}, {new : true});
        return res.status(200).json(task);
    }
    catch(error){
        return res.status(500).json({error : "Internal Error occured while updating tasks" });
    }
};

export const deleteTasks = async (req, res)=>{
    try{
        const { id , postId } = req.params;
        //console.log(req.params);
        let task = await Task.findOne({user : id, _id : postId});
        //console.log(task);
        if(!task){
            return res.status(404).send("Not Found");
        }
        //verifying the user and note's user id for checking the same user authorization...
        if(task.user.toString() !== req.user){
            return res.status(401).json({message : "Unauthorized Access, you are not the right one"});
        }
        task = await Task.findOneAndDelete({user : id, _id : postId});
        return res.status(200).json({message : "Task in the storage has been deleted."});
    }
    catch(error){
        return res.status(500).json({error : "Internal Error occured while Deleting the Task" });
    }
};