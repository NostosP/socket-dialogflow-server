var express = require('express'),
    app = express(),
    server = require('http').Server(app),
    io = require('socket.io')(server),
    cors = require('cors'),
    port = process.env.PORT || 3000,
    dialogflow = require('./dialogflow'),
    fcm = require('./fcm');

// For Chrome issues
app.use(cors());

io.on('connection', (socket) => {

    console.log('user connected');  
    
    socket.on('debug', text => console.log(text));

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

    socket.on('receive-notification', () => {
        setTimeout(() => {
            fcm.sendPushNotification();
        }, 8000);
    })
    
});

server.listen(port, function(){
    console.log('Socket server listening in http://localhost:' + port);
});
