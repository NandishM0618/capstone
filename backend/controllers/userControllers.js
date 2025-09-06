const User = require('../models/User')
const cloudinary = require('cloudinary')
const fs = require('fs')

const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({ error: "User not found" })
        }
        const isMatch = user.matchPassword(password)
        if (!isMatch) return res.status(401).json({ error: "Invalid Credentials Email or Password" });
        const token = user.generateToken();
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", //over https
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        })
        res.status(200).json({ message: "Login Successfull", user: { id: user._id, name: user.name, email: user.email, avatar: user.avatar?.url || null } })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: err.message })
    }
}

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const avatar = req.file.path
        if (!name || !email || !password || !avatar) {
            return res.status(401).json({ error: "Please Provide all required Fields" })
        }
        const existingUser = await User.findOne({ email })
        if (existingUser) return res.status(200).json({ message: "User already exist" });

        let myCloud;
        try {
            myCloud = await cloudinary.v2.uploader.upload(avatar, {
                folder: "avatars",
                width: 150,
                crop: "scale",
            });
        } catch (error) {
            console.error("Cloudinary Upload Error: ", error);
        }

        fs.unlinkSync(avatar)

        if (!myCloud || !myCloud.public_id || !myCloud.secure_url) {
            console.error("Cloudinary Response Error: ", myCloud); // Log the Cloudinary response
            return res.status(404).json({ message: "Cloudinary response not Found" })
        }
        const user = new User({
            name,
            email,
            password,
            avatar: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            }
        })
        await user.save()
        res.status(200).json({ message: "Account Created Successfully", userId: user._id })
    } catch (err) {
        console.error("Signup Error:", err.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

const logout = async (req, res) => {
    res.cookie("token", null, {
        httpOnly: true,
        expiresIn: new Date(Date.now())
    })
    res.status(200).json({
        success: true,
        message: "Log out success"
    })
}

module.exports = {
    signIn, signup, logout
}