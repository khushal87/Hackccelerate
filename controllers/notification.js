const Notification = require('../models/notification');
const User = require('../models/user');


exports.getAllNotification=async (req,res,next)=>{
    const id = req.params.id;
    await User.findById(id).then(async (result)=>{
        if(!result){
            const error = new Error('Could not find user.');
            error.status = 404;
            throw error;
        }
        const notifications = await Notification.find({actor:id});
        let uncheckedNotif = 0;
        notifications.map(notif => {
            if(new Date(notif.createdAt).getTime() > new Date(result.lastNotificationsCheckedAt).getTime()){
                uncheckedNotif++;
            }
        });
        console.log(notifications)
        result['lastNotificationsCheckedAt'] = Date.now();
        result.save();
        return res.status(200).send({
            data: notifications,
            uncheckedNotif: uncheckedNotif
        });
    })
    .catch((err) => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    })
}