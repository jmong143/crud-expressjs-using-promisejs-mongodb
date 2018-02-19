var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/', (req, res) => {
  User.find({}, (err, data) => {
    if(err) throw err;
    res.send({"data": data});
  });
});

router.get('/:userId', (req, res) => {
  User.find({"_id": req.params.userId}, (err, list) => {
    if(err) throw err;
    res.send({"data": list});
  });
});


router.post('/create', (req, res) => {
  var newUser = new User();
  newUser.username = req.body.username;
  newUser.password = req.body.password;
  newUser.save(function(err, result) {
    if(err) throw err;
    res.send({"data": result});
  });
});

router.put('/:userId', (req, res) => {
  User.findByIdAndUpdate(req.params.userId, {$set: req.body}, (err, result) => {
    if(err) throw err;
    res.send({"data": result});
  });
});

router.delete('/:userId', (req, res) => {
  User.findByIdAndRemove(req.params.userId, (err, result) => {
    if(err) throw err;
    res.send({"data": result})
  });
});

module.exports = router;
