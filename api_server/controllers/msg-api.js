// import statements
const mongoose = require('mongoose');
const messageModel = mongoose.model('message');

// GET Request Handler
const getAllMessagesOrderedByLastPosted = (req, res) => {
    messageModel
    .find()
    .sort( {'_id': -1} )
    .exec( (err, messages) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json(messages);
        }
    });
};

// POST Request Handler
const addNewMessage = (req, res) => {
    messageModel
    .create( req.body, (err, message) => {
        if (err) {
            res.status(400).json(err);
        } else {
            res.status(201).json(message);
        }
    });
};

// UPDATE Request Handler
const updateMessage = (req, res) => {
    if (req.params && req.params.messageid){
        messageModel
        .findByIdAndUpdate({ _id: req.params.messageid }, req.body, (err, message) => {
            if (err) {
                res.status(400).json(err);
                return;
            }
            // could execute, but didn't find message
            if (!message) {
                res.status(404).json({
                    "api-msg": "messageid not found"
                });
                return;
            }
            // found message
            messageModel.findOne({_id: req.params.messageid}).then(function(message){
                res.status(200).json(message);
            }) 
        });
    } else { 
        // must have a messageid 
        res.status(400).json({
            "api-msg": "No messageid in request"
        });
    }
};

// DELETE Request Handler
const deleteMessage = (req, res) => {
    if (req.params && req.params.messageid) {
        messageModel
        .findByIdAndRemove({ _id: req.params.messageid }, (err, message) => {
            if (err) {
                // error in executing function
                res.status(400).json(err);
                return;
            } 
            // could execute, but didn't find message
            if (!message) {
                res.status(404).json({
                    "api-msg": "messageid not found"
                });
                return;
            }
            // found message
            res.status(200).json(message); 
        }); 
    } else {
        // must have a messageid 
        res.status(400).json({
            "api-msg": "No messageid in request"
        });
    }
};

// DELETE ALL Request Handler
const deleteAll = (req, res) => {
    if (req.params) {
        messageModel
        .deleteMany({}, (err, message) => {
            if (err) {
                res.status(400).json({
                    "api-msg": "delete all not succesfull"
                });
            } else {
                res.status(200).json({
                    "api-msg": "all messeges successfully deleted!"
                });
            }
        });  
    } else {
        res.status(400).json(err);
    }
};

// export statement
module.exports = {
    getAllMessagesOrderedByLastPosted,
    addNewMessage,
    updateMessage,
    deleteMessage,
    deleteAll
}