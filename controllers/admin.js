const User = require('../models/user');
const Blog = require('../models/blog');

exports.viewAllUsers = async function (req, res) {
    try {
        const users = await User.find().select('-password');
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching users.' });
    }
};

exports.blockUser = async function (req, res) {
    const userId = req.params.id;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        user.status = 'blocked';
        await user.save();

        res.status(200).json({ message: 'User blocked successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Blocking user failed.' });
    }
};

exports.unblockUser = async function (req, res) {
    const userId = req.params.id;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        user.status = 'active';
        await user.save();

        res.status(200).json({ message: 'User unblocked successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Unblocking user failed.' });
    }
}

exports.listAllBlogPosts = async function (req, res) {
    try {
        const blogs = await Blog.find().populate('owner', 'username').lean();
        const formattedBlogs = blogs.map(blog => ({
            title: blog.title,
            author: blog.owner.username,
            creationDate: blog.createdAt,
            averageRating: calculateAverageRating(blog.ratings),
        }));

        res.status(200).json(formattedBlogs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching blog posts.' });
    }
};

exports.viewBlogPost = async function (req, res) {
    const blogId = req.params.id;

    try {
        const blog = await Blog.findById(blogId).populate('owner', 'username').lean();
        res.status(200).json(blog);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching blog post.' });
    }
};

exports.disableBlog = async function (req, res) {
    const blogId = req.params.id;

    try {
        const blog = await Blog.findById(blogId);

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found.' });
        }

        blog.status = 'disabled';
        await blog.save();

        res.status(200).json({ message: 'Blog disabled successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Disabling blog failed.' });
    }
};

function calculateAverageRating(ratings) {
    if (!ratings || ratings.length === 0) {
        return 0;
    }

    const totalRating = ratings.reduce((sum, rating) => sum + rating.rating, 0);
    return totalRating / ratings.length;
}
