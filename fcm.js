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
        title: 'Prova notifica',
        body: 'Prova notifica'
    },
    token: ''
};

exports.setToken = function(token) {
    registrationToken = token;
    console.log(registrationToken);
}

exports.sendPushNotification = function() {
    message.token = registrationToken;
    console.log(message);
    admin.messaging().send(message)
        .then((response) => {
            // Response is a message ID string.
            console.log('Successfully sent message:', response);
        })
        .catch((error) => {
            console.log('Error sending message:', error);
        });
}
