const express = require("express")
const router = express.Router();
const multer = require('multer')
const userController = require('../controllers/userControllers')

const upload = multer({ dest: "uploads/" })
router.post("/login", userController.signIn)
router.post('/signup', upload.single("avatar"), userController.signup);
router.get('/logout', userController.logout)

module.exports = router