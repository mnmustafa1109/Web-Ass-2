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
        enum: ['admin', 'respondent'],
        default: 'respondent',
    },
    profilePicture: {
        type: String,
        default: '',
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
