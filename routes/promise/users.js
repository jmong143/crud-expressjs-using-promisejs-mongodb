var User = require('../../models/user');

exports.getUsers = () => {
  return new Promise( (resolve, reject) => {
    User.find({}, (err, users) => {
      if(err) reject({"message": "User not found"})
      resolve(users)
    });
  });
}

exports.getUserById = (id) => {
  return new Promise( (resolve, reject) => {
    User.findOne({"_id": id}, (err, user) => {
      if(err) reject({"message": "User not found"})
      resolve(user)
    });
  });
}

exports.createUser = (data) => {
  return new Promise( (resolve, reject) => {
    let newUser = new User();
    newUser.username = data.username;
    newUser.password = data.password;
    newUser.save(function(err, result) {
      if(err) reject({"message": "Error in creating user"});
      resolve(result)
    });
  })
}
