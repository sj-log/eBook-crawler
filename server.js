const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const app = express();

const PORT = process.env.PORT || 5000;
const router = require('./router');
const server = http.createServer(app);
const io = socketio(server);

app.use(router);

io.on('connection', (socket) => {
    console.log(`[${socket}]we have a new connection.`);

    socket.on('disconnection', () => {
        console.log(`user disconnection.`);
    });

})
server.listen(PORT, () => {
    console.log(`[Server Start] Port ${PORT} opened!`)
})
