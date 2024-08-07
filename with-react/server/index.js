import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000"
    }
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('connection', () => {
        console.log("YUH");
    })

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(4000, () => {
    console.log('listening on *:4000');
});