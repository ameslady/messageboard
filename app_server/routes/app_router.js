const express = require('express');
const router = express.Router();
const msgController = require('../controllers/msg.js');

/* GET home page. */
// passes control to an index handler
router.get('/', msgController.getMessages);

module.exports = router;