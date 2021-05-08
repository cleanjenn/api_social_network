const router = require('express').Router();
const {
    getAllUsers,
    getUsersById,
    createUsers,
    updateUsers,
    deleteUsers,
    addFriend,
    deleteFriend
} = require('../../controllers/users-controller');

// Get & post route
router.route('/').get(getAllUsers).post(createUsers);

// Get, post, & delete route
router.route('/:id').get(getUsersById).put(updateUsers).delete(deleteUsers);

// Post then delete route
router.route('/:id/friends/:friendId').post(addFriend).delete(deleteFriend)

module.exports = router;