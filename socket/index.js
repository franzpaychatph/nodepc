const { instrument } = require('@socket.io/admin-ui');
const socketio = require('socket.io');
const moment = require('moment'); 
const { addSocketUser, removeSocketUser, checkSocketStatus, getSocketIdByUaNumber } = require('../socket/connections');

const userSockets = new Map()

const SocketServer = (app, server) => {
    
    //const io = socketio(server);
    const io = socketio(server, {
        allowEIO3: true,
        cors: {
          origin: ['https://admin.socket.io', 'http://localhost', 'http://localhost:3000', 'https://chatserver.paychat.ph'],
          credentials: true
        }
      });

    //socket.io events
    io.on('connection', (socket) => {

        //ON user connect: get user info
        let user = {
            "ua_number": socket.handshake.query.ua_number
        };

        //Add socket identification
        addSocketUser(userSockets, user, socket);

        //ON client disconnect
        socket.on('disconnect', async () => {
            //Remove socket data from userSockets upon disconnect
            removeSocketUser(userSockets, user, socket);
        });

    });

    //socket.io admin ui
    instrument(io, {
        auth: { 
            type: "basic",
            username: "admin",
            password: "$2a$12$KbnptH8FvukPFrVUb1FjZOH7boLLicf/trhKwNdti1DGGaA/f8wr2" // "$$Paychat123!" encrypted with bcrypt
        },
    });

    //attach socket.io to express http server: very important!!!
    app.set('socketio', io);
    app.set('userSockets', userSockets);

}

module.exports = SocketServer