const User = require('../models/user');
const Time = require('../models/time');

exports.getTimeForUser = (req,res,next) =>{
    const userId = req.params.id;
    User.findById(userId).then((result)=>{
        if(!result){
            const error = new Error('No user exists with this id.');
            error.statusCode = 401;
            throw error;
        }
        const day = req.body.day;
        Time.find({day:day}).then((result)=>{
            res.status(200).json({ message: "User time fetched", data: result.filter(item=>item.userId==userId) });
        })
    })
    .catch((err) => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}

exports.createTimeForUser = (req,res,next) =>{
    const userId = req.params.id;
    User.findById(userId).then((result)=>{
        if(!result){
            const error = new Error('No user exists with this id.');
            error.statusCode = 401;
            throw error;
        }
        const {day,total_time} = req.body;
        const time = new Time({day,total_time,userId});
        return time.save();
    })
    .then((result) => {
        res.status(200).json({ message: "Time created Successfully for the user.", time: result });
    })
    .catch((err) => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}

exports.updateTimeForUser = (req,res,next)=>{
    const timeId = req.params.id;
    Time.findById(timeId).then((result)=>{
        if(!result){
            const error = new Error('No time exists with this id.');
            error.statusCode = 401;
            throw error;
        }
        const {total_time} = req.body;
        result.total_time=total_time;
        return result.save();
    })
    .then((result) => {
        res.status(200).send({ message: "Time details updated successfully!", time: result });
    })
    .catch((err) => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}