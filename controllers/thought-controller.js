const {User, Thought} = require ('../models');

const thoughtController = {
    
    getThoughts(req, res) {
      Thought.find({})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
          console.log(err);
          res.sendStatus(400);
        });
    },
  
    // get one thought by id
    getSingleThoughtById({ params }, res) {
      thoughtController.findOne({ _id: params.thoughtId })
        .select('-__v')
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
          console.log(err);
          res.sendStatus(400);
        });
    },
  
    // createThought
    createThoughts({ body }, res) {
      Thought.create(body)
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err));
    },

    //updateThought
    updateThought({body, params}, res) {
        Thought.findByIdAndUpdate ({_id:params.thoughtId}, {$set:body}, {runValidators:true,new:true})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err));
    },
  

    //addThought
   addThought (req,res) {
    Thought.findOneAndUpdate ({_id: req.params.thoughtId}, {$addToSet:{friends:req.params.friendId}}, {new:true})
    .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err));
   },

   //deleteThought
  
}
  
  module.exports = thoughtController;