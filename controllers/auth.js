const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const brcrypt = require('bcrypt');
const axios = require('axios');
const sendEmail = require('../utils/sendEmail');
const User = require('../models/user');

exports.createUser = (req,res,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect.');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }

    const {email} = req.body;
    User.find({email}).then(result=>{
        if(result.length>0){
            const error = new Error('Validation failed, user already exists for the email.');
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        } else {
            const {
                name,email,password,gender,age,height,weight
            } = req.body;

            brcrypt.genSalt(15,function(err,salt){
                brcrypt.hash(password,salt,function(err,hash){
                    const user = new User({name,email,password:hash,gender,age,height:[height],weight:[weight]});

                    user.save().then(result =>{
                        res.status(200).json({ message: "User created successfully", user: user });
                    })
                })
            })
        }
    })
    .catch((error) => {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }) 
}

exports.loginUser=(req,res,next)=>{
    const errors = validationResult(req);

    const {email,password} = req.body;
    User.find({email}).then(async result=>{
        if(result.length==0){
            const error = new Error('Validation failed, user doesn\'t exists for the email.');
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }
        const match = await brcrypt.compare(password,result[0].password);
        if(!match){
            const error = new Error('Wrong password');
            error.statusCode = 401;
            throw error;
        }
        const token = jwt.sign({
            email: result[0].email,
            userId: result[0]._id.toString()
        }, 'hackcceleratecredentials',
            { expiresIn: '1h' }
        );
        res.status(200).json({ message: "Logged in successfully!", token: token, userId: result[0]._id.toString(),user:result[0] });
    })
    .catch((error) => {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }) 
}

exports.socialLogin =async(req,res,next)=>{
    const GOOGLE_OAUTH_TOKEN_ENDPOINT = 'https://www.googleapis.com/oauth2/v3/tokeninfo/?id_token=';
    const token = req.body.token;
    axios.get(GOOGLE_OAUTH_TOKEN_ENDPOINT+token).then((result)=>{
        if(!result.data) {
            const error = new Error('Validation failed, no data for this token');
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }
        const {email} = result.data;
        User.find({email:email}).then((result)=>{
            if(result.length===0){
                const error = new Error('Validation failed, user doesn\'t exists for the email.');
                error.statusCode = 422;
                error.data = errors.array();
                throw error;
            }
            const token = jwt.sign({
                email: result[0].email,
                userId: result[0]._id.toString()
            }, 'hackcceleratecredentials',
                { expiresIn: '1h' }
            );
            res.status(200).json({ message: "User fetched", user: result[0],token:token,userId:result.length>0?result[0]._id:null });
        })
    })
    .catch((error) => {
        console.log(error)
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

