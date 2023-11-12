const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    },
    profilePicture: {
        type: String,
        default: '',
    },
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    notifications: [{
        type: String, // You may want to customize the notification schema based on your requirements
    }],
    status: {
        type: String,
        enum: ['active', 'blocked'],
        default: 'active',
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
