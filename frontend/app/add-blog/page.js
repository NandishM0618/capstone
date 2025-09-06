'use client'
import instance from "@/lib/axios"
import { useEffect, useState } from "react"

export default (first) => {
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [tags, setTags] = useState([])
    const [createdBy, setCreatedBy] = useState("");
    const [tagInput, setTagInput] = useState("");
    const [coverImg, setCoverImg] = useState(null)

    const handleAddTags = (e) => {
        e.preventDefault()
        if (tagInput.trim() && !tags.includes(tagInput.trim())) {
            setTags([...tags, tagInput.trim()])
            setTagInput("")
        }
    }

    const handleRemoveTag = (removeTag) => {
        setTags(tags.filter((tag) => tag !== removeTag))
    }

    const handleCoverImg = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCoverImg(file)
        }
    }
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user && user.id) {
            setCreatedBy(user.id)
        }
    }, [])

    const formData = new FormData()
    formData.append("title", title)
    formData.append("body", body)
    formData.append("tags", JSON.stringify(tags))
    formData.append("coverImg", coverImg)
    formData.append("createdBy", createdBy)

    async function handleAddBlog(e) {
        e.preventDefault()
        try {
            const res = await instance.post("/post/create-post", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            console.log(res.data.post)
            alert("Blog Published")
        } catch (error) {
            alert("Blog Publish Error")
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <div className="max-w-2xl mx-auto bg-white p-8 shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create New Blog</h2>

                <form className="space-y-6" onSubmit={handleAddBlog}>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Title
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter blog title"
                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Description
                        </label>
                        <textarea
                            placeholder="Enter blog content"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            rows={6}
                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        ></textarea>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                            Upload Image (optional)
                        </label>
                        <input
                            type="file"
                            onChange={handleCoverImg}
                            className="w-full border border-gray-300 rounded-md px-3 py-1 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Tags</label>
                        <div className="flex items-center space-x-2">
                            <input
                                type="text"
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                placeholder="Add a tag"
                                className="flex-grow border border-gray-300 rounded-md px-4 py-2"
                            />
                            <button
                                onClick={handleAddTags}
                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                            >
                                Add
                            </button>
                        </div>

                        {/* Tag List */}
                        <div className="flex flex-wrap mt-3 gap-2">
                            {tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full flex items-center space-x-2"
                                >
                                    <span>{tag}</span>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveTag(tag)}
                                        className="ml-2 text-red-600 hover:text-red-800 font-bold"
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="text-center">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
                        >
                            Publish Blog
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}