'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Conversation;

let conversationSchema = Schema({
  messages: [{type: mongoose.Schema.Types.ObjectId, ref: 'Message'}],
  users: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
})


Conversation = mongoose.model('Conversation', conversationSchema)
module.exports = Conversation
