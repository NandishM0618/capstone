'use client';

import { useState, useEffect } from 'react';
import instance from '@/lib/axios';
import { useRouter, useParams } from 'next/navigation';

export default function EditBlogPage() {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [tagInput, setTagInput] = useState("")

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await instance.get(`/post/${id}`);
                setBlog(res.data);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch blog", error);
            }
        };
        fetchBlog();
    }, [id]);


    const handleAddTags = (e) => {
        e.preventDefault()
        if (tagInput.trim() && !blog?.tags.includes(tagInput.trim())) {
            setBlog(prev => ({
                ...prev,
                tags: [...prev.tags, tagInput.trim()]
            }))
            setTagInput("")
        }
    }

    const handleRemoveTag = (removeTag) => {
        setBlog(prev => ({
            ...prev,
            tags: prev.tags.filter(tag => tag !== removeTag)
        }))
    }


    const handleUpdate = async () => {
        try {
            await instance.put(`/post/update-post/${id}`, {
                title: blog.title,
                body: blog.body,
                tags: blog.tags
            })
            alert("blog updated Successfully")
            window.location.href = `/blog/${id}`
        } catch (error) {
            console.error("failed to update", error)
            alert("Failed to update blog")
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Edit Blog</h2>

            <input
                type="text"
                value={blog.title}
                onChange={(e) => setBlog({ ...blog, title: e.target.value })}
                className="w-full border px-3 py-2 mb-4"
                placeholder="Title"
            />

            <textarea
                value={blog.body}
                onChange={(e) => setBlog({ ...blog, body: e.target.value })}
                className="w-full border px-3 py-2 mb-4"
                placeholder="Body"
                rows="8"
            ></textarea>

            <div className=' mb-2'>
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
                    {blog?.tags.map((tag) => (
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
            <button
                onClick={handleUpdate}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Update Blog
            </button>
        </div>
    );
}
