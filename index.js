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

// To read request body
app.use(bodyParser.json());

// Socket handling
io.on('connection', (socket) => {

    socket.on('set-nickname', nickname => {
        console.log(nickname+' connected');
    })
    
    socket.on('new-message', (message) => {
        // io.emit('message', {body: 'Hello! I am sleeping right now, sorry!', from: 'ChatBot',
        //                     type: "text"})
        dialogflow(message).then(res => {
            io.emit('message', res);  
        }).catch(err => {
            console.log(err);
            io.emit('message', {body: 'Something went wrong!', from: 'ChatBot',
                                type: "text"})
        })
    });

    socket.on('set-token', token => {
        fcm.setToken(token);
    })
    
});

// Back-end handling
app.post('/pushNotification', function (req, res) {
    fcm.sendPushNotification(req.body).then(
        res.status(200).json('Notification sent!')
    ).catch(
        res.status(500).json('Error!')
    );
})

server.listen(port, function(){
    console.log('Socket server listening in http://localhost:' + port);
});
