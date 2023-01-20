const jwt = require('jsonwebtoken');
const { getSocketIdByUaNumber } = require('../socket/connections');
require('dotenv').config();

const sendMessage = async (req, res) => {
    let io = req.app.get('socketio');
    let userSockets = req.app.get('userSockets');
    let { send_to, send_from, message } = req.body;

    let recipient_socket_id = await getSocketIdByUaNumber(userSockets, send_to);

    if(!recipient_socket_id){
        res.send('OFFLINE send message to: ' + send_to).status(200);
    } else {
        io.to(recipient_socket_id).emit('messages', message);
        res.send('REALTIME send message to: ' + send_to).status(200);
    }
};

const getMessages = async (req, res) => {
    res.send('get messages');
};

// PC chat/notifications endpoints
// /chat/post_message
// /chat/notify_new_contact
// /chat/pcb_notify_contact
// /chat/send_call_notification_twilio
// /chat/push_notification
// /chat/pc_user_message
// /chat/send_messge

module.exports = {
    sendMessage,
    getMessages
};






