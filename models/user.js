const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        required: [true,'Name is required'],
        type: String
    },
    email : {
        required: [true,'Email is required'],
        type:String,
        unique:true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please enter a valid email',
        ],
    },
    password : {
        type:String,
        required:[true,'Password is required']
    },
    age:{
        required: [true,'Age is required'],
        type : Number
    },
    gender:{
        required:[true,'Gender is required'],
        type:String,
        maxlength:1
    },
    weight:{
        required:[true,'Weight is required'],
        type:Number
    },
    height:{
        required:[true,'Height is required'],
        type:Number
    },
    points:{
        required:false,
        type:Number,
        default:0
    },
    is_verified:{
        required:true,
        default:false,
        type:Boolean
    },
},{timestamps:true});

module.exports = mongoose.model('user',userSchema);