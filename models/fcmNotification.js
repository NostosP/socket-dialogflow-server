/**
 * Default FCM notification message 
 */
exports.fcmMessage = function() { 
    var fcmMsg = {
        notification: {
            title: 'Default notification',
            body: 'Default notification'
        },
        token: ''
    }
    return fcmMsg;
}