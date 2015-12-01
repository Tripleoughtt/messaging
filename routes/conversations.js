'use strict';

var express = require('express');
var router = express.Router();
var User = require('../models/user')
var Conversation = require('../models/conversation');
var ensureAuthenticated = require('../config/ensureAuthenticated')
var Message = require('../models/message')

router.post('/', ensureAuthenticated, function(req, res){
  console.log(req.body, req.user)
    User.findById(req.user, function(err, userOne){
      console.log(userOne);
      User.findById(req.body.userTwo._id, function(err, userTwo){
        if(err) return res.status(404).send(err)
          var conversation = {users: [userOne._id, userTwo._id]}
        console.log(conversation)
          Conversation.create(conversation, function(err, savedConvo){
            Message.create({messageText: 'Welcome To The beginning of your conversation!'}, function(err, savedMessage){
              console.log(savedConvo._id)
                Conversation.findByIdAndUpdate(savedConvo._id, {$push: {messages: savedMessage._id}}, function(err, updatedConvo){
                  res.send(updatedConvo)

                })
            });
          })

      })
    })
})


router.get('/', ensureAuthenticated, function(req,res){
  console.log(req.user)
    Conversation.find({users: req.user}, function(err, usersConvos){
      if (!usersConvos) return res.send('No Conversations')
        res.send(usersConvos)
    }).populate('users messages')
});

module.exports = router
