const mongoose= require('mongoose');

const Schema = mongoose.Schema;

const timeSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    day:{
        type:Date,
        required:true
    },
    total_time:{
        type:Number,
        required:true,
        default:0
    }
},{timestamps:true});

module.exports = mongoose.model('time',timeSchema);