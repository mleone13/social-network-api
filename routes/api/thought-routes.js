const router = require ('express').Router();

const {getThoughts, getSingleThoughtById, createThoughts, updateThought, addThought} = require ('../../controllers/thought-controller')

router.route ('/').get (getThoughts).post(createThoughts);
router.route ('/:thoughtId').get(getSingleThoughtById).put(updateThought);

router.route ('/:userId/friends/:friendId').post(addThought);

module.exports=router;
