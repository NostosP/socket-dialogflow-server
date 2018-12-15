var express = require('express'),
    app = express(),
    server = require('http').Server(app),
    io = require('socket.io')(server),
    cors = require('cors'),
    port = process.env.PORT || 3000,
    bodyParser = require('body-parser'),
    dialogflow = require('./dialogflow'),
    fcm = require('./fcm');

// For Chrome issues
app.use(cors());

// For json parsing
app.use(bodyParser.json());

// Socket handling
io.on('connection', (socket) => {

    socket.on('set-nickname', nickname => {
        console.log(nickname+' connected');
    })
    
    // Handles client requests
    socket.on('new-client-request', (message) => {
        // io.emit('message', {body: 'Hello! I am sleeping right now, sorry!', from: 'ChatBot',
        //                     type: "text"})
        dialogflow(message).then(res => {
            io.emit('new-server-message', res);  
        }).catch(err => {
            console.log(err);
            io.emit('new-server-message', {body: 'Something went wrong!', from: 'ChatBot',
                                type: "text"})
        })
    });

    // Handles user's registration
    socket.on('set-token', token => {
        fcm.setToken(token);
    })
    
});

// Handles notifications from the back-end
app.post('/pushNotification', function (req, res) {
    fcm.sendPushNotification(req.body);
    res.status(200).json('Notification sent!');
})

server.listen(port, function(){
    console.log('Socket server listening in http://localhost:' + port);
});
