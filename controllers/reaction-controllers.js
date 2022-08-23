const { User, Thought } = require('../models');

const reactionController = {
  // add reaction to comment
  addReaction({ params, body }, res) {
    console.log(params);
   Reaction.create(body)
      .then(({ _id }) => {
        return Comment.findOneAndUpdate(
          { _id: params.commentId },
          { $push: { comments: _id } },
          { new: true }
        );
      })
      .then(dbCommentData => {
        console.log(dbCommentData);
        if (!dbCommentData) {
          res.status(404).json({ message: 'No comment found with this id!' });
          return;
        }
        res.json(dbCommentData);
      })
      .catch(err => res.json(err));
  },

  // add reaction to comment
    addReaction({ params, body }, res) {
    Comment.findOneAndUpdate(
      { _id: params.commentId },
      { $push: { replies: body } },
      { new: true, runValidators: true }
    )
      .then(dbCommentData => {
        if (!dbCommentData) {
          res.status(404).json({ message: 'No comment found with this id!' });
          return;
        }
        res.json(dbCommentData);
      })
      .catch(err => res.json(err));
  },

  // remove reaction
    removeReaction({ params }, res) {
    Reaction.findOneAndDelete({ _id: params.commentId })
      .then(deletedReaction => {
        if (!deletedReaction) {
          return res.status(404).json({ message: 'No comment with this id!' });
        }
        return Comment.findOneAndUpdate(
          { _id: params.commentId },
          { $pull: { comments: params.commentId } },
          { new: true }
        );
      })
      .then(dbCommentData => {
        if (!dbCommentData) {
          res.status(404).json({ message: 'No comment found with this id!' });
          return;
        }
        res.json(dbCommentData);
      })
      .catch(err => res.json(err));
  },
  // remove reaction
  removeReaction({ params }, res) {
    Comment.findOneAndUpdate(
      { _id: params.commentId },
      { $pull: { replies: { replyId: params.replyId } } },
      { new: true }
    )
      .then(dbCommentData => res.json(dbCommentData))
      .catch(err => res.json(err));
  }
};

module.exports = reactionController;
