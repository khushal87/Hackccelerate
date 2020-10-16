const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
    heading:{
        type:String,
        required:[true, "Task Heading is required"]
    },
    description:{
        type:String,
        default:""
    },
    startDate:{
        type: Date,
        required:  [true,"Start date is required"]
    },
    endDate:{
        type:Date,
    },
    time:{
        type:Date,
        required:[true,"Task time is required"]
    },
    userId:{
        type: Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    is_completed:{
        type:Boolean,
        default:false
    }
});

module.exports = mongoose.model('Task',taskSchema);