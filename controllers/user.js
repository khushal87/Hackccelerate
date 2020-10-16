const { validationResult } = require('express-validator');
const User = require('../models/user');

exports.getAllUsers=(req,res,next)=>{
    User.find().then((result)=>{
        res.status(200).json({ message: "Users fetched", data: result });
    })
    .catch((err) => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}

exports.getSpecificUser=(req,res,next)=>{
    const userId = req.params.id;
    User.findById(userId)
        .then((user) => {
            if (!user) {
                const error = new Error('Could not find user.');
                error.status = 404;
                throw error;
            }
            res.status(200).json({ message: "User fetched", user: user });
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}

exports.updateUser = (req,res,next)=>{
    const userId = req.params.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect.');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
    const { name,gender,age,height,weight } = req.body;
    User.findById(userId).then( user =>{
        if (!user) {
            const error = new Error('Could not find user.');
            error.status = 404;
            throw error;
        }
        name?user.name=name:"";
        gender?user.gender=gender:"";
        age?user.age=age:"";
        height?user.height=height:"";
        weight?user.weight=weight:"";
        return user.save();
    }).then((result) => {
        res.status(200).send({ message: "User details updated successfully!", user: result });
    })
    .catch(error => {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    })
}  

// exports.sendEmail = (req,res,next)=>{
//     const {email} = req.body;
//     const otp = crypto.randomInt(6).toString();
//     const message 
// }

exports.deleteUser=(req,res,next)=>{
    const {id} = req.params;
    User.findById(id)
        .then((user) => {
            if (!user) {
                const error = new Error('Could not find user.');
                error.status = 404;
                throw error;
            }
            else {
                return User.findByIdAndRemove(user._id);
            }
        })
        .then(result => {
            res.status(200).json({ message: "Deleted user successfully!" });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

exports.updateUserPoints = (req,res,next) =>{
    const {id} = req.params;
    User.findById(id)
        .then((user) => {
            if (!user) {
                const error = new Error('Could not find user.');
                error.status = 404;
                throw error;
            }
            const {point} = req.body;
            user.points = point;
            return user.save();
        })
        .then(result => {
            res.status(200).json({ message: "User point updated successfully!" });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}