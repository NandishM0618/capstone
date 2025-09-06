'use client'
import instance from "@/lib/axios"
import Link from "next/link"
import { useEffect, useState } from "react"

export default (first) => {
    const [tags, setTags] = useState([])
    const [blogs, setBlogs] = useState([]);
    const [searchValue, setSearchValue] = useState("")
    const [filterTags, setFilteredTags] = useState([])

    useEffect(() => {
        const getTags = async () => {
            try {
                const res = await instance.get('/post/posts');
                const fetchedBlogs = res.data;
                setBlogs(fetchedBlogs);

                const allTags = fetchedBlogs.flatMap(blog => blog.tags || []);
                const uniqueTags = [...new Set(allTags)];
                setTags(uniqueTags);
            } catch (err) {
                console.error("Failed to fetch blogs:", err);
            }
        }

        getTags()
    }, [tags])

    useEffect(() => {
        if (!searchValue.trim() || searchValue === "") {
            setFilteredTags(tags)
            return;
        }

        try {
            const regex = new RegExp(searchValue, 'i')
            const filtered = tags.filter(tag => regex.test(tag))
            setFilteredTags(filtered)
        } catch (err) {
            console.error("Invalid regex", err);
            setFilteredTags(tags)
        }
    }, [searchValue])
    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Sidebar */}
                <aside className="md:col-span-1 bg-white p-4 rounded-xl shadow">
                    <h2 className="text-xl font-bold mb-4">Search</h2>
                    <input
                        type="text"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder="Search blogs..."
                        className="w-full p-2 border border-gray-300 rounded mb-6"
                    />

                    <h2 className="text-xl font-bold mb-4">Tags</h2>
                    <div className="flex flex-wrap gap-2">
                        {filterTags.length > 0 ? filterTags.map((tag, index) => (
                            <button
                                key={index}
                                className="bg-gray-200 text-sm px-3 py-1 rounded-full hover:bg-gray-300"
                            >
                                #{tag}
                            </button>
                        )) :
                            tags.map((tag, index) => (
                                <button
                                    key={index}
                                    className="bg-gray-200 text-sm px-3 py-1 rounded-full hover:bg-gray-300"
                                >
                                    #{tag}
                                </button>
                            ))
                        }
                    </div>
                </aside>

                {/* Blog List */}
                <main className="md:col-span-3 space-y-6">
                    {blogs.map((blog) => (
                        <div key={blog._id} className="bg-white rounded-xl shadow hover:shadow-md transition p-6">
                            <Link
                                href={`/blog/${blog._id}`}
                            >
                                <img
                                    src={blog.coverImg.url}
                                    alt="cover"
                                    className="w-full h-48 object-cover rounded-md mb-4"
                                />
                                <h3 className="text-2xl font-semibold mb-2">{blog.title}</h3>
                                <p className="text-gray-600 mb-2">
                                    {blog.body.substring(0, 200)}
                                </p>
                                <div className="flex justify-between text-sm text-gray-500">
                                    <div className="flex">
                                        <img src={blog.createdBy.avatar.url} className="w-[40px] h-[40px] rounded-full" />
                                        <span className="mt-2 pl-2">{blog.createdBy.name}</span>
                                    </div>
                                    <div>
                                        <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </main>
            </div>
        </div>
    )
}