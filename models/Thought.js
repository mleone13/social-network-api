const { Schema, model } = require('mongoose');
// const dateFormat = require('../utils/dateFormat');
const ReactionSchema = require ('./Reaction');

const ThoughtSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now
    },

    username:{
        type:String,
        require:true,

    },

    reaction: [ReactionSchema],
    
  },
  {
    toJSON: {
      getters: true,
    },
    // prevents virtuals from creating duplicate of _id as `id`
    id: false
  }
);

// get total count of comments and replies on retrieval
ThoughtSchema.virtual('reactionCount').get(function() {
 return this.reaction.length
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;
