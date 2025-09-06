const express = require('express')
const router = express.Router()
const multer = require("multer")
const postController = require("../controllers/postControllers")
const isAuthenticated = require('../middleware/authentication')

const upload = multer({ dest: "uploads/" })
// add isAuthencated in backend

router.get('/posts', postController.getAllPosts)
router.get('/:id', isAuthenticated, postController.getPostById)
router.get('/delete-post/:id', isAuthenticated, postController.deletePost)
router.get('/get-comments/:postId', isAuthenticated, postController.getCommentsByPost);
router.get('/get-likes/:postId', isAuthenticated, postController.getLikes);

router.post('/create-post', isAuthenticated, upload.single("coverImg"), postController.createPost)
router.put('/update-post/:id', isAuthenticated, postController.updatePost)
router.delete('/delete-comment/:commentId/:userId', isAuthenticated, postController.deleteComment)
router.post('/add-comment/:postId/:userId', isAuthenticated, postController.addComments)
router.post('/add-like/:userId/:postId', isAuthenticated, postController.addLikes)
router.post('/search-post/:q', postController.searchPosts)

module.exports = router