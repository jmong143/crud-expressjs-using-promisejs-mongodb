let express = require('express');
let router = express.Router();
let User = require('../models/user');
let { getUsers, getUserById, createUser, updateUser, deleteUser } = require('./promise/users');

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


router.post('/', (req, res) => {
  let formData = {
    username: req.body.username,
    password: req.body.password
  }
  if(formData){
    let createUserPromise = createUser(formData);
    createUserPromise.then( (result) => {
      res.status(201).send(result)
    }, (err) => {
      res.status(500).send(err)
    })
  }else{
    res.status(400).send({"message": "Invalid parameters"})
  }
});

router.put('/:userId', (req, res) => {
  let body = req.body;
  let id = req.params.id;
  let updateUserPromise = updateUser(id, body);
  updateUserPromise.then( (result) => {
    res.send(result)
  }, (err) => {
    res.send(err)
  });
});

router.delete('/:userId', (req, res) => {
  let deleteUserPromise = deleteUser(req.params.userId);
  deleteUserPromise.then( result => {
    res.send(result);
  }, err => {
    res.send(err);
  });
});

module.exports = router;
