const router = require ('express').Router();

const {addReaction,removeReaction} = require ('../../controllers/reaction-controllers')

router.route ('/').get(addReaction).post(createReaction);
router.route ('/:thoughtId').get(getSingleThoughtById).put(updateThought);

router.route('/:userId').delete(removeReaction);

module.exports=router;