const express = require('express');
const { auth } = require('../middleware/auth')

const router = express.Router();

const { sendMessage, getMessages } = require('../controllers/chat');

router.get('/:id', [auth], getMessages);
router.post('/private-message', [auth], sendMessage);

module.exports = router;