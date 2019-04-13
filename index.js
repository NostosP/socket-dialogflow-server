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
    fcm.sendPushNotification(req.body);
    res.status(200).json('Notification sent!');
})

// Handles messages from client
app.post('/', function(req, res) {
    dialogflow.sendMessage(req.body, fcmToken).then(dialogRes => {
        res.status(200).json(dialogRes);
    }).catch(err => {
        res.status(200).json(clientRes.errorResponse());
    });
})

app.listen(port, function(){
    console.log('Server listening in http://localhost:' + port);
});
