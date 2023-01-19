const jwt = require('jsonwebtoken');
require('dotenv').config();

const sendMessage = async (req, res) => {
    res.send('send message');
};

const getMessages = async (req, res) => {
    res.send('get messages');
};

module.exports = {
    sendMessage,
    getMessages
};






