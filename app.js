'use strict';

var PORT = process.env.PORT || 3000;

var express = require('express.io');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var app = express();
var http = require('http').Server(app)
var io = require('socket.io')(http)
var jwt = require('jwt-simple')
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/conversations');
var User = require('./models/user')
var Conversation = require('./models/conversation')
var Message = require('./models/message')
app.set('view engine', 'jade');

// GENERAL MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyParser.urlencoded( {extended: true} ));
app.use(bodyParser.json());
app.use(express.static('public'));

// ROUTES
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/users', require('./routes/users'));
app.use('/people', require('./routes/people'))
app.use('/conversations', require('./routes/conversations'))

// 404 HANDLER
app.use(function(req, res){
  res.status(404).render('404')
})

// Socket testing

io.on('connection', function(socket){
  socket.on('message', function(message){
    console.log(message)
  });
  socket.on('newMessage', function(newMessage){
    console.log(newMessage)
    var payload = jwt.decode( newMessage.user, process.env.JWT_SECRET)
    console.log(payload)
    var message = {messageText: newMessage.conversation.message}
    console.log(message)
    Message.create(message, function(err, savedMessage){
      console.log(savedMessage)
      Conversation.findByIdAndUpdate(newMessage.conversation._id, {$push: {messages: savedMessage._id}}, function(err, updatedConvo){
        console.log(updatedConvo)
        Conversation.find({users: payload.sub}, function(err, foundConvos){
          socket.emit('conversations', foundConvos)
        }).populate('users messages')
      })

    })
    
  })
  console.log('A user connected')
})

http.listen(PORT, function(){
  console.log('Listening on port ', PORT);
});
