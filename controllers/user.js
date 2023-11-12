const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Blog = require('../models/blog');

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

        if (user.status === 'blocked') {
            return res.status(401).json({ message: 'Authentication failed. User blocked.' });
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
        res.status(200).json({ name: user.username, email: user.email, role: user.role, profilePicture: user.profilePicture, followers: user.followers.length, following: user.following.length , notifications: user.notifications.length, status: user.status});
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

exports.follow_user = async function (req, res) {
    const followerId = req.user.id;
    const followingId = req.params.id;

    try {
        const follower = await User.findById(followerId);
        const following = await User.findById(followingId);

        // chek if user is following himself
        if (followerId === followingId) {
            return res.status(400).json({ message: 'You cannot follow yourself.' });
        }

        if (!follower || !following) {
            return res.status(404).json({ message: 'User not found.' });
        }

        if (follower.following.includes(followingId)) {
            return res.status(400).json({ message: 'You are already following this user.' });
        }

        follower.following.push(followingId);
        following.followers.push(followerId);

        await follower.save();
        await following.save();

        res.status(200).json({ message: 'You are now following this user.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Following user failed.' });
    }
};

exports.unfollow_user = async function (req, res) {
    const followerId = req.user.id;
    const followingId = req.params.id;

    try {
        const follower = await User.findById(followerId);
        const following = await User.findById(followingId);

        if (!follower || !following) {
            return res.status(404).json({ message: 'User not found.' });
        }

        if (!follower.following.includes(followingId)) {
            return res.status(400).json({ message: 'You are not following this user.' });
        }

        const followerIndex = follower.following.indexOf(followingId);
        const followingIndex = following.followers.indexOf(followerId);

        follower.following.splice(followerIndex, 1);
        following.followers.splice(followingIndex, 1);

        await follower.save();
        await following.save();

        res.status(200).json({ message: 'You have unfollowed this user.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Unfollowing user failed.' });
    }
};

exports.feed = async function (req, res) {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const followedUsers = user.following;

        // also check if the blog is active
        const blogs = await Blog.find({ owner: { $in: followedUsers }, status: 'active' })
            .populate('owner', 'username')
            .lean();

        res.status(200).json(blogs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Fetching feed failed.' });
    }
};

exports.notifications = async function (req, res) {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const notifications = user.notifications;

        res.status(200).json(notifications);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Fetching notifications failed.' });
    }
};
