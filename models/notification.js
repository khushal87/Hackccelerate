const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema ({
    actor : {type: mongoose.Types.ObjectId,required:true,ref:'User'},
    operation: {type: String},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Notification',notificationSchema);