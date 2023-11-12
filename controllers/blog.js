const Blog = require('../models/blog');
const User = require('../models/user');

exports.blog_create = async function (req, res) {
    try {
        const user = await User.findById(req.body.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const blog = new Blog({
            title: req.body.title,
            content: req.body.content,
            owner: user._id,
        });

        const savedBlog = await blog.save();
        res.status(201).json({ message: 'Blog Post created successfully with id: ' + savedBlog._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Blog Post Creation failed.' });
    }
};

exports.blog_details = async function (req, res) {
    try {
        const blog = await Blog.findById(req.params.id).populate('owner', 'username').lean();
        if (!blog) {
            return res.status(404).json({ message: 'Blog Post not found.' });
        }
        res.status(200).json(blog);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Blog Post Fetching failed.' });
    }
};

exports.blog_update = async function (req, res) {
    try {
        await Blog.findByIdAndUpdate(req.params.id, { $set: req.body });
        res.status(200).json({ message: 'Blog Post updated.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Blog Post Updation failed.' });
    }
};

exports.blog_delete = async function (req, res) {
    try {
        await Blog.findByIdAndRemove(req.params.id);
        res.status(200).json({ message: 'Blog Post deleted.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Blog Post Deletion failed.' });
    }
};

exports.blog_list = async function (req, res) {
    try {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;

        let query = {};

        // Add search functionality based on keywords, categories, and authors
        if (req.query.search) {
            const searchRegex = new RegExp(req.query.search, 'i');
            query = {
                $or: [
                    { title: searchRegex },
                    { content: searchRegex },
                    { 'owner.username': searchRegex },
                    { keywords: searchRegex }, // Search in keywords
                    { categories: searchRegex }, // Search in categories
                ],
            };
        }

        // Implement sorting and filtering options
        const sortOptions = {};
        if (req.query.sortBy) {
            sortOptions[req.query.sortBy] = req.query.sortOrder === 'desc' ? -1 : 1;
        }

        const blogs = await Blog.find(query)
            .sort(sortOptions)
            .skip((page - 1) * limit)
            .limit(limit)
            .populate('owner', 'username') // Populate owner information
            .lean();

        res.status(200).json(blogs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Blog Post Listing failed.' });
    }
};


exports.blog_rate = async function (req, res) {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ message: 'Blog Post not found.' });
        }

        // Check if the user has already rated
        const existingRating = blog.ratings.find(rating => rating.user.toString() === req.body.userId);
        if (existingRating) {
            return res.status(400).json({ message: 'You have already rated this blog post.' });
        }

        blog.ratings.push({
            user: req.body.userId,
            rating: req.body.rating,
        });

        await blog.save();
        res.status(200).json({ message: 'Blog Post rated successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Blog Post Rating failed.' });
    }
};

exports.blog_comment = async function (req, res) {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ message: 'Blog Post not found.' });
        }

        blog.comments.push({
            user: req.body.userId,
            text: req.body.text,
        });

        await blog.save();
        res.status(200).json({ message: 'Comment added successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Adding Comment failed.' });
    }
};
