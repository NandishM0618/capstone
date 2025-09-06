'use client'
import Link from "next/link"
import { useEffect, useState } from "react"

export default ({ blogAuthorId, blogId }) => {
    const [isAuthor, setIsAuthor] = useState(false)
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))
        if (user.id === blogAuthorId) {
            setIsAuthor(true);
        }
    }, [blogAuthorId])

    if (!isAuthor) return null
    return (
        <Link
            href={`/blog/${blogId}/edit`}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-1 rounded"
        >
            Edit
        </Link>
    )
}