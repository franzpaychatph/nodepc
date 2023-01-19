const { instrument } = require('@socket.io/admin-ui');
const socketio = require('socket.io');
const moment = require('moment'); 
const { addSocketUser, removeSocketUser, checkSocketStatus } = require('../socket/connections');

const userSockets = new Map()

const SocketServer = (server) => {
    
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

        //ON ping_test
        socket.on("ping_test", async (data, callback) => {
           console.log('ping_test LOG: pong test');
           callback('ping_test CB: pong test');
        });

        //ON send_message
        socket.on("send_message", async (data, callback) => {
            console.log('send_message LOG: ' + JSON.stringify(data));
            callback('send_message CB: ' +  JSON.stringify(data));
        });

        //ON get_messages
        socket.on("get_messages", async (data, callback) => {
            console.log('get_messages LOG: ' + JSON.stringify(data));
            callback('get_messages CB: ' +  JSON.stringify(data));
        });

        //ON get_user_status
        socket.on("get_user_status", async (data, callback) => {
            console.log('get_user_status LOG: ' + JSON.stringify(data));
            callback('get_user_status CB: ' +  JSON.stringify(data));
        });

        //ON get_group_status
        socket.on("get_group_status", async (data, callback) => {
            console.log('get_group_status LOG: ' + JSON.stringify(data));
            callback('get_group_status CB: ' + JSON.stringify(data));
        });

        //ON check user availability status
        socket.on("check_socket_status", async (data, callback) => {
            let status = await checkSocketStatus(userSockets, data.ua_number);

            console.log(data.ua_number + ' Status LOG: ' + status);
            callback(data.ua_number + ' Status CB: ' + status);
        });

        //ON client disconnect
        socket.on('disconnect', async () => {
            //Remove socket data from userSockets upon disconnect
            removeSocketUser(userSockets, user, socket);
        });

    });

    //socket.io admin ui
    instrument(io, {
        auth : false
    });
}

module.exports = SocketServer