const express = require('express');
const router = express.Router();
const passport = require('passport');

// Controllers
const userAPIController = require('../controllers/user-api');
const msgAPIController = require('../controllers/msg-api');

// Msg routing
router.route('/msgs')
.get(msgAPIController.getAllMessagesOrderedByLastPosted)
.post(passport.authenticate('basic', { session: false }), msgAPIController.addNewMessage)
.delete(passport.authenticate('basic', { session: false }), msgAPIController.deleteAll);

router.route('/msgs/:messageid')
.put(passport.authenticate('basic', { session: false }), msgAPIController.updateMessage)
.delete(passport.authenticate('basic', { session: false }), msgAPIController.deleteMessage);

// User routing
router.post('/users', userAPIController.registerNewUser);
router.get('/users/login', passport.authenticate('basic', { session: false }),
userAPIController.loginUser);

module.exports = router;