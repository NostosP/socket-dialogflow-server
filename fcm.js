var admin = require('firebase-admin'),
    // Got from FCM console, project settings
    serviceAccount = require('./tesiagent-5723f-firebase-adminsdk-yo6ki-7dace2a8ef.json'),
    registrationToken;

// FCM initializing, got from FCM console, project settings
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://tesiagent-5723f.firebaseio.com"
});

// Default fcm message 
var message = {
    notification: {
        title: 'Default notification',
        body: 'Default notification'
    },
    token: ''
};

exports.setToken = function(token) {
    registrationToken = token;
    console.log(registrationToken);
}

exports.sendPushNotification = async function(req) {
    message.token = registrationToken;
    message.notification.title = req.title;
    message.notification.body = req.body;
    admin.messaging().send(message)
        .then((response) => {
            // Response is a message ID string.
            console.log('Successfully sent message:', response);
        })
        .catch((error) => {
            console.log('Error sending message:', error);
        });
}
