const express = require("express") // tool for handling request and response of object.
const cors = require('cors') // allows to communicate with other websites
const bodyParser = require('body-parser') // reads the json object
const cookieParser = require('cookie-parser') // reads the cookie on the headers sent
const cloudinary = require("cloudinary")
const path = require('path')
const dotenv = require("dotenv")
const mongoose = require("mongoose") // mongdb 
const app = express();

const userRoutes = require('./routes/userRoutes')
const postRoutes = require('./routes/postRoutes')
const Post = require("./models/Post")

const options = {
    origin: "http://localhost:3000",
    credentials: true
}
const mongoUri = process.env.MONGO_URI;
dotenv.config({ path: path.resolve(__dirname, ".env") });
const PORT = process.env.PORT || 3000;

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connected")).catch((err) => console.log(err))

app.use(bodyParser.urlencoded({ extended: false })) // an request header convert to an json object
app.use(cors(options))
app.use(cookieParser())
app.use(express.json())

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API,
    api_secret: process.env.CLOUD_SECRET
})

app.get("/", async (req, res) => {
    const posts = await Post.find({}).populate("createdBy");
    if (!posts || posts.length === 0) return res.status(404).json({ error: "No Posts found" })
    res.status(200).json(posts)
})

app.use('/user', userRoutes);
app.use('/post', postRoutes)

app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));
