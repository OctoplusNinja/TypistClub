const express = require('express');
const app = express();
const path = require('path')
const http = require('http')
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
});

app.get('/solo', (req, res) => {
    res.sendFile(__dirname + "/public/solo.html")
});

// io.on('connection', (socket) => {
//     // console.log('A user connected');
//     socket.on('disconnect', () => {
//         console.log('user disconnected');
//         socket.broadcast.emit("user disconnected");
//     });
//     socket.on('chat message', (msg) => {
//         io.emit("chat message", msg);
//     })
// })

app.get('1v1.html', (req, res) => {
    console.log("1v1 reached");
    res.sendFile(__dirname + "/public/1v1.html")
    // res.send("Site Under Construction");
});

server.listen(3000, () => {
    console.log('Listening on port: 3000')
})