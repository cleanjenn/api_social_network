const { Users } = require('../modles');

const usersController = {
    //creating a new user
    createUsers({ body}, res) {
        Users.create(body)
        .then(dbUsersData => res.json(dbUsersData))
        .catch(err => res.status(400).json(err));
    },
    //get for all the users
    getAllUsers(req, res) {
        Users.find({})
        .populate({
                path: 'thoughts',
                select: '-__v'})
            .populate({
            path: 'friends',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUsersData => res.json(dbUsersData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    //get a single user by ID 
    getUsersById({ params }, res) {
        Users.findOne({ _id: params.id })
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .populate({
            path: 'friends',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUsersData => {
            if (!dbUsersData) {
                res.status(404).json({ message: 'No User has been found with this ID! '});
                return;
            }
            res.json(dbUsersData)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        })
    },
    //Update user by ID
    updateUsers({ params, body }, res) {
        Users.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbUsersData => {
                if (!dbUsersData) {
                    res.status(404).json({ message: 'No User has been found with this ID! '});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err))
    },
    //find and delete a user
    deleteUsers({ params}, res) {
        Users.findOneAndDelete({ _id: params.id })
            .then(dbUsersData => {
                if (!dbUsersData) {
                    res.status(404).json({ message: 'No User has been found with this ID! '});
                    return;
                }
                res.json(dbUsersData);
            })
            .catch(err => res.status(400).json(err));
    },
    //delete user by ID
    addFriend({ params }, res) {
        Users.findOneAndUpdate({ _id: params.id }, { $push: { friends: params.friendId }}, { new: true })
        .populate({
            path: 'friends',
            select: ('-__v')
        })
        .select('-__v')
        .then(dbUsersData => {
            if (!dbUsersData) {
                res.status(404).json({ message: 'No User has been found with this ID! '});
                return;
            }
            res.json(dbUsersData);
        }) 
        .catch(err => res.json(err));
    },
    //deleting the current friend
    deleteFriend({ params}, res ) {
        Users.findOneAndUpdate({ _id: params.id }, { $pull: { friends: params.friendId }}, {new: true })
            .populate({ path: 'friends', select:'-__v'  })
            .select('-__v')
            .then(dbUsersData => {
                if(!dbUsersData) {
                    res.status(404).json({ message: 'No User has been found with this ID! '});
                    return;
                }
                res.json(dbUsersData);
            })
            .catch(err => res.status(400).json(err));
    }
};

//export module user controller
module.exports = usersController;
