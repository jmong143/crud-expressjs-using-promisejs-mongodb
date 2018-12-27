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
      resolve(user);
    });
  });
}

exports.createUser = (data) => {
  return new Promise( (resolve, reject) => {
    let newUser = new User(data);
    newUser.save(function(err, result) {
      if(err) reject({"message": "Error in creating user"});
      resolve(result);
    });
  })
}


exports.updateUser = (id, data) => {
  return new Promise ( (resolve, reject) => {
    User.findOneAndUpdate(id, {$set: data}, {new: true}, (err, result) => {
      if(err) reject({"message": "Error in updating user"});
      resolve(result);
    });
  });
}

exports.deleteUser = (id) => {
  return new Promise ( (resolve, reject) => {
    User.findByIdAndRemove(id, (err, result) => {
      if(err) reject({"message": "Error in deleting user"})
      resolve({"message": `User ID with ${id} is deleted`})
    })
  })
}
