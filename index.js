var express = require('express'),
    app = express(),
    logger = require('morgan'),
    methodOverride = require('method-override'),
    cors = require('cors'),
    port = process.env.PORT || 3000,
    bodyParser = require('body-parser'),
    dialogflow = require('./dialogflow'),
    fcm = require('./fcm');
    clientRes = require('./models/clientResponse');

var fcmToken;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cors());


// // Socket handling
// io.origins("*:*");

// io.on('connection', (socket) => {
    
//     // Handles client requests
//     socket.on('new-message', (message) => {
//         console.log("User's message: " + JSON.stringify(message));
//         dialogflow.sendMessage(message, fcmToken).then(res => {
//             io.emit('new-server-message', res);  
//         }).catch(err => {
//             console.log(err);
//             io.emit('new-server-message', clientRes.errorResponse())
//         })
//     });

//     // Handles user's registration
//     socket.on('set-token', token => {
//         fcmToken = token;
//         fcm.setToken(token);
//         console.log('Registration token is: ' + token);
//     })
    
// });

// Handles notifications from the back-end
app.post('/pushNotification', function (req, res) {
    fcm.sendPushNotification(req.body);
    res.status(200).json('Notification sent!');
})

app.post('/', function(req, res) {
    console.log('New message: ', req.body);
    dialogflow.sendMessage(req.body, fcmToken).then(dialogRes => {
        res.status(200).json(dialogRes);
    }).catch(err => {
        res.status(200).json(clientRes.errorResponse());
    });
})

app.listen(port, function(){
    console.log('Server listening in http://localhost:' + port);
});
