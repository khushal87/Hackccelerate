const { validationResult } = require('express-validator');
const moment = require('moment');
const User = require('../models/user');
const Food = require('../models/food');

exports.getFoodByDate = (req,res,next)=>{
    const {userId,date} = req.body;
    User.findById(userId).then((result)=>{
        if (!result) {
            const error = new Error('No user exists with this id.');
            error.statusCode = 401;
            throw error;
        }
        Food.find({userId,date}).then((result)=>{
            res.status(200).json({ message: "User foods fetched", foods: result });
        })
    })
    .catch((err) => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}

exports.createFood = (req,res,next) =>{
    const userId = req.params.id;
    User.findById(userId).then((user)=>{
        if (!user) {
            const error = new Error('No user exists with this id.');
            error.statusCode = 401;
            throw error;
        }
        const {foodName,calories,date} = req.body;
        const food = new Food({foodName,calories,date,userId});
        return food.save();
    })
    .then((result) => {
        res.status(200).json({ message: "Food created Successfully for the user.", tasks: result });
    })
    .catch((err) => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}

exports.getDailyCalorieIntakeTotal =(req,res,next)=>{
    const {userId,date} = req.body;
    User.findById(userId).then((user)=>{
        if (!user) {
            const error = new Error('No user exists with this id.');
            error.statusCode = 401;
            throw error;
        }
        Food.find({userId,date}).then((result)=>{
            let sum = 0;
            result.map((item)=>{
                sum+=item.calories;
            })
            res.status(200).json({ message: "User total calories fetched", total:sum });
        })
    })  
    .catch((err) => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}