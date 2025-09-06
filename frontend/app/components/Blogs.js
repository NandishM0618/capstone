'use client'
import instance from "@/lib/axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Blogs(params) {
    const [blogs, setBlogs] = useState([]);
    async function getBlogs(params) {
        try {
            const res = await instance.get("/post/posts")
            setBlogs(res.data);
            console.log(res.data)
        } catch (err) {
            console.error("Falied to fetch blogs:", err)
        }
    }
    useEffect(() => {
        getBlogs()
    }, [])

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-xl font-bold text-left mb-10">Recent Blog Posts</h2>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {blogs.map((blog) => (
                    <Link
                        href={`/blog/${blog._id}`} // add blog id instead of index
                        key={blog._id}
                        className="bg-white cursor-pointer rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                    >
                        <img
                            src={blog.coverImg.url}
                            alt={blog.title}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-5">
                            <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
                            <p className="text-sm text-gray-600 mb-3">{blog.body.substring(0, 100)}...</p>
                            <div className="flex flex-row gap-2">
                                <img src={blog.createdBy.avatar?.url} className=" w-[40px] rounded-full h-[40px]" />
                                <p className="text-xs mt-2 text-gray-500">{new Date(blog.createdAt).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            {blogs.length > 0 ? (
                <div className="w-[200px] mx-auto">
                    {" "}
                    <p className=" text-center text-white my-3 rounded-sm bg-gray-800 p-2 ">
                        Loading more...
                    </p>
                </div>
            ) : (
                <p></p>
            )}
        </div>
    );
}