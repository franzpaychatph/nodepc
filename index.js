const express = require('express');
const http = require('http');
require('dotenv').config();

const app = express();
const server = http.createServer(app);

//Connect to DB and Routes
const connectDB = require('./db/connect');
const tasks = require('./routes/tasks');

//Middleware
app.use(express.static('public'));
app.use(express.json());

//API: endopoints
app.use('/api/v1/tasks', tasks);

//Socket.io server
const SocketServer = require('./socket');
SocketServer(server);

//HTTP Server listen to port = process.env.PORT and connect to mongodb
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    server.listen(process.env.PORT, console.log(`Server is listening on port ${process.env.PORT}...`));
  } catch (error) {
    console.log(error);
  }  
};
start(); // <----- start
