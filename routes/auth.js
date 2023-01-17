const express = require('express');
const router = express.Router();

const { requestToken, validateToken } = require('../controllers/auth');

router.route('/requestToken').post(requestToken);
router.route('/validateToken').post(validateToken);

module.exports = router;