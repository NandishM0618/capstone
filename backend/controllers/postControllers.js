const Comment = require('../models/Comment');
const Post = require('../models/Post')
const User = require('../models/User')
const cloudinary = require('cloudinary')

const createPost = async (req, res) => {
    try {
        const { title, body, tags, createdBy } = req.body
        const coverImg = req.file.path
        let uploadImg;
        try {
            uploadImg = await cloudinary.v2.uploader.upload(coverImg, {
                folder: "blog_covers",
                crop: "scale"
            });
        } catch (error) {
            console.error("Cloudinary upload Error", error);
            return res.status(500).json({ message: "Cloudinary upload failed" })
        }
        const post = new Post({
            title,
            body,
            tags: tags ? tags.split(",") : [],
            createdBy,
            coverImg: {
                public_id: uploadImg.public_id,
                url: uploadImg.secure_url
            }
        })
        await post.save()
        res.status(201).json({ message: "Post  Published", post })
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" })
    }
}

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate("createdBy");
        res.status(200).json(posts)
    } catch (err) {
        res.status(500).json({ error: message })
    }
}

const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate("createdBy", "name avatar");
        if (!post) return res.status(404).json({ error: "Post not found" });
        res.json(post);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updatePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!post) return res.status(404).json({ error: "Post not found" })
        res.status(200).json({ message: "Post updated", post })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const deletePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) return res.status(404).json({ message: "Post not found" })
        res.status(200).json({ message: "Post Deleted" })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getPostByUser = async (req, res) => {
    try {
        const posts = await Post.find({ createdBy: req.params.userId });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const searchPosts = async (req, res) => {
    try {
        const query = req.query.q;
        const posts = await Post.find({
            $or: [
                { title: new RegExp(query, "i") },
                { tags: { $in: [new RegExp(query, "i")] } }
            ]
        })
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const addComments = async (req, res) => {
    try {
        const { text } = req.body;
        const { postId, userId } = req.params
        if (!text) {
            return res.status(400).json({ message: "Comment is required" });
        }

        const postExists = await Post.findById(postId);
        const userExists = await User.findById(userId);

        if (!postExists || !userExists) {
            return res.status(404).json({ message: "Post or user not found" });
        }
        const data = new Comment({
            text,
            post: postId,
            user: userId
        })
        await data.save()
        res.status(200).json({ message: "Comment added", data })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getCommentsByPost = async (req, res) => {
    try {
        const { postId } = req.params;

        const comments = await Comment.find({ post: postId })
            .populate("user", "name avatar")
            .sort({ createdAt: -1 });

        res.status(200).json({ comments });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteComment = async (req, res) => {
    try {
        const { commentId, userId } = req.params;

        const comment = await Comment.findById(commentId);

        if (!comment) return res.status(404).json({ message: "Comment not found" });

        if (comment.user.toString() !== userId) {
            return res.status(403).json({ message: "Unauthorized to delete this comment" });
        }

        await Comment.findByIdAndDelete(commentId);
        res.status(200).json({ message: "Comment deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addLikes = async (req, res) => {
    try {
        const { userId, postId } = req.params;

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        if (!post.likes) post.likes = [];

        const alreadyLiked = post.likes.includes(userId);

        if (alreadyLiked) {

            post.likes = post.likes.filter(id => id.toString() !== userId);
        } else {
            post.likes.push(userId);
        }

        await post.save();

        res.status(200).json({
            message: alreadyLiked ? "Like removed" : "Like added",
            likes: post.likes.length
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getLikes = async (req, res) => {
    try {
        const { postId } = req.params;
        const post = await Post.findById(postId)
        if (!post) return res.status(404).json({ message: "Post not found" })
        res.status(200).json({ data: post.likes.length })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
    // getPostByUser,
    searchPosts,
    addComments,
    getCommentsByPost,
    deleteComment,
    addLikes,
    getLikes
}