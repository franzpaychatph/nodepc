const express = require('express');
const { auth } = require('../middleware/auth')

const router = express.Router();

const { pushNotification, getNotifications } = require('../controllers/notification');

router.get('/:id', [auth], getNotifications);
router.post('/push-notification', [auth], pushNotification);

module.exports = router;