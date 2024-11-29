const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const socketIo = require('socket.io');
const io = socketIo(server);

app.use(express.static('public')); // Serve static files from 'public' folder

// When a client connects
io.on('connection', (socket) => {
  console.log('A user connected');

  // Listen for incoming messages
  socket.on('chatMessage', (data) => {
    // Emit the message to all connected users, including sender's name
    io.emit('chatMessage', data);
  });

  // When a user disconnects inside coz if someone connect then it can disconnect
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server on port 3000
server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
