const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    userName: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: [/.+@.+\..+/, 'Must match a valid email address'],
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought',
        },
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
    ],
},
{
    toJSON: {
        virtuals: true,
    },
},
);

const User = mongoose.model('User', userSchema)

module.exports = User;