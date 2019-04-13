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

// Handles notifications from the back-end
app.post('/pushNotification', function (req, res) {
    fcm.sendPushNotification(req.body)
        .then(() => res.status(200).json('Notification sent!'))
        .catch(() => res.status(500).json('Something went wrong!'));    
})

// Handles token registration
app.post('/fcmToken', (req, res) => {
    console.log('Received token: ', req.body.token);
    fcmToken = req.body.token;
    fcm.setToken(fcmToken)
        .then(() => res.status(200).json('Token registration successful!'))
        .catch(() => res.status(500).json('Something went wrong!'));
});

// Handles messages from client
app.post('/', function(req, res) {
    console.log('Received message: ', req.body);
    dialogflow.sendMessage(req.body, fcmToken).then(dialogRes => {
        console.log(dialogRes);
        res.status(200).json(dialogRes);
    }).catch(err => {
        console.log(err);
        res.status(500).json(clientRes.errorResponse());
    });
})

app.listen(port, function(){
    console.log('Server listening in http://localhost:' + port);
});
