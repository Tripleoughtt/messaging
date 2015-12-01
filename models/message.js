
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Message;

let messageSchema = Schema({
  messageText: {type: String, required: true},
  sender: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
})


Message = mongoose.model('Message', messageSchema)
module.exports =Message 
