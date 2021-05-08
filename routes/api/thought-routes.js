const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtsById,
    createThoughts,
    updateThoughts,
    deleteThoughts,
    addReaction,
    deleteReaction
} = require('../../controllers/thoughts-controller');

//Get route
router.route('/').get(getAllThoughts);

//Get, put and delete thought
router.route('/:id').get(getThoughtsById).put(updateThoughts).delete(deleteThoughts);

//post thoughts route
router.route('/:userId').post(createThoughts);

//post reations route
router.route('/:thoughtId/reactions').post(addReaction);

//delete reaction
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;