const express = require('express');
const router = express.Router();

const { requestToken, validateToken } = require('../controllers/auth');

router.post('/requestToken', requestToken);
router.post('/validateToken', validateToken);

module.exports = router;