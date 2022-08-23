const { Schema, Types  } = require('mongoose');
// const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: ()=> new Types.ObjectId()
    },
   text: {
      type: String,
      required: true,
      minlength: 1,
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
    
  },
  {
    toJSON: {
      getters: true,
    },
    // prevents virtuals from creating duplicate of _id as `id`
    id: false
  }
);


module.exports = ReactionSchema;
