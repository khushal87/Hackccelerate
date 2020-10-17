const { validationResult } = require('express-validator');
const Task = require('../models/task');
const User = require('../models/user');

exports.createTask =(req,res,next) =>{
    const userId = req.params.id;
    User.findById(userId).then((user)=>{
        if (!user) {
            const error = new Error('No user exists with this id.');
            error.statusCode = 401;
            throw error;
        }
        const {heading,description,startDate,endDate,time} = req.body;
        if(startDate>endDate){
            const error = new Error(`Start date can't be greater than end date.`);
            error.statusCode = 401;
            throw error;
        }
        const task = new Task({heading,description,startDate,endDate,time,userId:userId});
        return task.save();
    })
    .then((result) => {
        res.status(200).json({ message: "Task created Successfully for the user.", tasks: result });
    })
    .catch((err) => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}

exports.getUserTasks =(req,res,next)=>{
    const {id} = req.params;
    User.findById(id).then((result)=>{
        if(!result){
            const error = new Error('Could not find user.');
            error.status = 404;
            throw error;
        }
        Task.find({userId:id}).then((result)=>{
            res.status(200).json({ message: "User tasks fetched", tasks: result });
        })
    })
    .catch((err) => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}

exports.deletetask = (req, res, next) => {
    const taskId = req.params.id;
    Task.findById(taskId)
        .then((task) => {
            if (!task) {
                const error = new Error('Could not find task.');
                error.status = 404;
                throw error;
            }
            return Task.findByIdAndRemove(taskId);
        })
        .then(result => {
            res.status(200).json({ message: "Deleted task successfully!" });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

exports.updateTask = (req,res,next)=>{
    const taskId = req.params.id;
    Task.findById(taskId).then((task)=>{
        if (!task) {
            const error = new Error('Could not find task.');
            error.status = 404;
            throw error;
        }
        const {heading,description,startDate,endDate,time} = req.body;

        heading? task.heading= heading:"";
        description?task.description=description:"";
        startDate?task.startDate=startDate:"";
        endDate?task.endDate=endDate:"";
        time?task.time=time:"";
        return task.save();
    })
    .then(result => {
            res.status(200).json({ message: "Updated task successfully!",result:result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

exports.markTaskAsCompleted = (req,res,next)=>{
    const taskId = req.params.id;
    Task.findById(taskId).then((task)=>{
        if (!task) {
            const error = new Error('Could not find task.');
            error.status = 404;
            throw error;
        }
        task.is_completed = true;
        return task.save();
    })
    .then(result => {
        res.status(200).json({ message: "Task completed successfully!",result:result });
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}