const {User, Thought} = require ('../models');

const userController = {
    
    getUsers(req, res) {
      User.find({})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
          console.log(err);
          res.sendStatus(400);
        });
    },
  
    // get one user by id
    getSingleUserById({ params }, res) {
      User.findOne({ _id: params.userId })
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
          console.log(err);
          res.sendStatus(400);
        });
    },
  
    // createUser
    createUser({ body }, res) {
      User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    },

    //updateUser
    updateUser({body, params}, res) {
        User.findByIdAndUpdate ({_id:params.userId}, {$set:body}, {runValidators:true,new:true})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    },
  

    //addFriend
   addFriend (req,res) {
    User.findOneAndUpdate ({_id: req.params.userId}, {$addToSet:{friends:req.params.friendId}}, {new:true})
    .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
   }
}
  
  module.exports = userController;