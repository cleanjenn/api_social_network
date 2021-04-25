const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String, 
            require: true,
            unique: true,
            //regex email 
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/]
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'thoughts'
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'users'
        }]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        //prevent virtuals from duplicating
        id: false
    }
)

//total count of friends
UserSchema.virtual('friendCount').get(function () {
    return this.friends.length;
})

const users = model('Users', UserSchema);

module.exports = users;
