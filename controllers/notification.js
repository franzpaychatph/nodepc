const jwt = require('jsonwebtoken');
require('dotenv').config();

const pushNotification = async (req, res) => {
    res.send('push notification');
};

const getNotifications = async (req, res) => {
    res.send('get notifications');
};

module.exports = {
    pushNotification,
    getNotifications
};






