const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const User = require('../models/user');
const { find, findById } = require('../models/product');

exports.register = async function (req, res) {
    try {
        const { username, email, password, role } = req.body;

        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this username or email already exists.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role,
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Registration failed.' });
    }
};

exports.login = async function (req, res) {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: 'Authentication failed. User not found.' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Authentication failed. Wrong password.' });
        }

        const token = jwt.sign({
            username: user.username, role: user.role, id: user._id
        }, process.env.SECRET_KEY, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Login failed.' });
    }
}

exports.logout = function (req, res) {
    res.status(200).json({ message: 'Logout successful.' });
};

exports.profile = async function (req, res) {

    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        req.user = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findById(req.user.id);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.status(200).json({ name: user.username, email: user.email, role: user.role, profilePicture: user.profilePicture });
    }
    catch (error) {
        res.status(403).json({ message: 'Invalid token.' });
    }

};

exports.profile_pic = async function (req, res) {
    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        req.user = jwt.verify(token, process.env.SECRET_KEY);
        const userId = req.user.id;
        var user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        const uploadedFile = req.file;


        if (!uploadedFile) {
            return res.status(400).json({ message: 'No file uploaded.' });
        }

        user.profilePicture = uploadedFile.path;
        await user.save();

        res.status(200).json({ message: 'Profile picture updated successfully.' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Profile picture updation failed.' });
    }
};


