const { Schema, model } = require('mongoose');
// const dateFormat = require('../utils/dateFormat');

const UserSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique:true
    },
    
    thoughts: [
        {type:Schema.Types.ObjectId,ref:"Thought"}
    ],

    friends: [
        {type:Schema.Types.ObjectId,ref:"User"}
    ]

    
  },
  {
    toJSON: {
      virtuals: true,
    },
    // prevents virtuals from creating duplicate of _id as `id`
    id: false
  }
);

// get total count of comments and replies on retrieval
UserSchema.virtual('friendCount').get(function() {
 return this.friends.length
});

const User = model('User', UserSchema);

module.exports = User;
