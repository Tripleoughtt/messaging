var express = require('express');
var router = express.Router();
var ensureAuthenticated = require('../config/ensureAuthenticated')
var User = require('../models/user')
router.get('/', ensureAuthenticated,function(req,res){
  console.log(req.user)
  User.find({}, function(err, foundUsers){
    res.send(foundUsers)
  })
  
});

module.exports = router;
