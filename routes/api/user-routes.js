const router = require ('express').Router();
const {getUsers, getSingleUserById, createUser, updateUser, addFriend, deleteUser} = require ('../../controllers/user-controller')

router.route ('/').get (getUsers).post(createUser);
router.route ('/:userId').get(getSingleUserById).put(updateUser);

router.route ('/:userId/friends/:friendId').post(addFriend);
router.route('/:userId').delete(deleteUser);
module.exports=router;
