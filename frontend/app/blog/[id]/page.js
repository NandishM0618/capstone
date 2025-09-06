'use client'
import EditBlog from "@/app/components/EditBlog";
import instance from "@/lib/axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function page() {
    const params = useParams()
    const id = params.id;

    const [user, setUser] = useState({});
    const [blog, setBlog] = useState(null);
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [comments, setComments] = useState([]);
    const [commentInput, setCommentInput] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await instance.get(`/post/${id}`);
                setBlog(res.data);
                setLoading(false);
            } catch (err) {
                console.error('Failed to fetch blog:', err);
            }
        };
        const fetchComments = async () => {
            try {
                const res = await instance.get(`/post/get-comments/${id}`);
                setComments(res.data.comments);
            } catch (error) {
                console.error("failed to fetch comments", error)
            }
        }
        const fetchLikes = async () => {
            try {
                const res = await instance.get(`/post/get-likes/${id}`);
                setLikes(res.data.data);
            } catch (error) {
                console.error("failed to fetch likes", error)
            }
        }
        const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
        if (storedUser && storedUser.id) {
            setUser(storedUser.id)
        }
        fetchBlog();
        fetchComments();
        fetchLikes();
    }, [id, comments]);

    const handleLike = async () => {
        try {
            const res = await instance.post(`/post/add-like/${user}/${id}`);
            setLikes(res.data.likes);
        } catch (err) {
            console.error('Failed to like:', err);
        }
    };

    const handleDislike = async () => {
        alert("disliked")
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!commentInput.trim()) return;

        try {
            const res = await instance.post(`/post/add-comment/${id}/${user}`, { text: commentInput });
            setCommentInput('');
        } catch (err) {
            console.error('Failed to comment:', err);
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            const res = await instance.delete(`/post/delete-comment/${commentId}/${user}`);
            alert("comment deleted")
        } catch (error) {
            alert("comment deletion failure")
        }
    }
    if (loading) return <div>Loading...</div>;

    return (
        <>
            <div className="max-w-3xl mx-auto p-4">
                <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
                <div className="flex gap-2 m-2">
                    <img src={blog.createdBy.avatar.url} className="w-[40px] h-[40px] rounded-full" />
                    <p className="text-sm mt-2  text-gray-500 mb-4">By <span className="font-bold text-black">{blog.createdBy.name}</span></p>
                    <EditBlog blogAuthorId={blog.createdBy._id} blogId={id} />
                </div>
                <img src={blog.coverImg.url} alt={blog.title} className="mb-4 w-full rounded-md" />
                <div className="text-lg text-justify leading-7">{blog.body}</div>
                <div className="mt-6">
                    {blog.tags?.map((tag, index) => (
                        <span key={index} className="inline-block bg-gray-200 px-2 py-1 text-sm rounded mr-2">
                            #{tag}
                        </span>
                    ))}
                    <div className="flex items-center space-x-4 mb-6">
                        <button
                            onClick={handleLike}
                            className="bg-green-100 text-green-800 px-3 py-1 rounded hover:bg-green-200"
                        >
                            👍 {likes}
                        </button>
                        <button
                            onClick={handleDislike}
                            className="bg-red-100 text-red-800 px-3 py-1 rounded hover:bg-red-200"
                        >
                            👎
                        </button>
                    </div>

                    {/* Comments */}
                    <div className="mt-8">
                        <h3 className="text-xl font-semibold mb-4">Comments</h3>

                        <form onSubmit={handleCommentSubmit} className="flex gap-2 mb-4">
                            <input
                                type="text"
                                value={commentInput}
                                onChange={(e) => setCommentInput(e.target.value)}
                                placeholder="Write a comment..."
                                className="flex-grow border border-gray-300 rounded-md px-4 py-2"
                            />
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                            >
                                Post
                            </button>
                        </form>

                        {comments.length === 0 ? (
                            <p className="text-gray-500">No comments yet.</p>
                        ) : (
                            <ul className="space-y-3">
                                {comments?.map((comment, idx) => (
                                    <li key={comment._id} className="bg-gray-100 p-3 rounded-md">
                                        <p className="">{comment._id}</p>
                                        <img src={comment.user.avatar.url} className="w-[40px] h-[40px] rounded-full" />
                                        <p className="text-sm font-semibold text-gray-700">{comment?.user.name}</p>
                                        <p className="text-gray-800">{comment?.text}</p>
                                        <p className="text-gray-800">{new Date(comment.createdAt).toLocaleDateString()}</p>
                                        <button onClick={() => handleDeleteComment(comment._id)} className="">
                                            delete
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}