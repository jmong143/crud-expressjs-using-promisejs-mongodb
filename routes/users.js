let express = require('express');
let router = express.Router();
let User = require('../models/user');
let { getUsers, getUserById, createUser } = require('./promise/users');

router.get('/', (req, res) => {
  let getUserPromise = getUsers();
  getUserPromise.then(function(usersDetails) {
        res.send(usersDetails)
    }, (err) => {
        console.log(err);
    });
});

router.get('/:userId', async (req, res) => {
  let getUserByIdPromise = getUserById(req.params.userId);
  getUserByIdPromise.then( (userDetails) => {
    res.send(userDetails)
  }, (err) => {
    res.send(err)
  });

});


router.post('/create', (req, res) => {
  let formData = {
    username: req.body.username,
    password: req.body.password
  }
  let createUserPromise = createUser(formData);
  createUserPromise.then( (result) => {
    res.send(result)
  }, (err) => {
    res.send(err)
  })
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
