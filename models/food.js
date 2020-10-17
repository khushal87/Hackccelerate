const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodSchema = new Schema({ 
    foodName: {
        type:String,
        required:true
    },
    calories : {
        type:Number,
        required:true
    },
    date : {
        type:Date,
        required:true
    },
    userId:{
        type: Schema.Types.ObjectId,
        required:true,
        ref:"User"
    }
},{timestamps:true});

module.exports = mongoose.model('Food', foodSchema);