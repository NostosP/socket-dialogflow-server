var admin = require('firebase-admin'),
    // Got from FCM console, project settings
    serviceAccount = require('./tesiagent-5723f-firebase-adminsdk-yo6ki-7dace2a8ef.json'),
    registrationToken,
    fcmMsg = require('./models/fcmNotification');

// FCM initializing, got from FCM console, project settings
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://tesiagent-5723f.firebaseio.com"
});

/**
 * Saves the token of the client
 * @param token
 */
exports.setToken = async (token) => {
    registrationToken = token;
}

/**
 * Takes the back-end notification and sends it to the client
 * @param serverNotification
 */
exports.sendPushNotification = async (serverNotification) => {
    fcmMessage = fcmMsg.fcmMessage();
    fcmMessage.token = serverNotification.sendTo;
    fcmMessage.notification.title = serverNotification.title;
    fcmMessage.notification.body = serverNotification.body;
    admin.messaging().send(fcmMessage)
        .then((response) => {
            // Response is a message ID string.
            console.log('Successfully sent message: ', response);
        })
        .catch((error) => {
            console.log('Error sending message: ', error);
        });
}
