//Required Modules
const express = require('express');
const http = require('http');
require('dotenv').config();

//HTTP Server
const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;

//Socket.io server
const SocketServer = require('./socket');
SocketServer(app, server);

//Connect to DB and Routes
const connectDB = require('./db/connect');
const auth = require('./routes/auth');
const tasks = require('./routes/tasks');
const chat = require('./routes/chat');
const notification = require('./routes/notification');

//Middleware
app.use(express.static('public'));
app.use(express.json());

//API: endpoints
app.use('/api/v1/auth', auth);
app.use('/api/v1/tasks', tasks);
app.use('/api/v1/chat', chat);
app.use('/api/v1/notification', notification);

app.get('/test', (req, res) => {
  let io = req.app.get('socketio');
  io.emit('hi!');
  res.send('200');
});

//HTTP Server listen to port = port and connect to mongodb
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    server.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }  
};
start(); // <---------- start
