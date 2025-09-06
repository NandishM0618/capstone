'use client'
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar(params) {
    const [user, setUser] = useState("")

    useEffect(() => {
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
        console.log(storedUser)
    }, [])

    const handleLogout = () => {
        localStorage.removeItem("user")
        setUser(null)
        window.location.href = "/login"
    }
    return (
        <div className="my-4">
            <div className="flex justify-around items-center gap-10">
                {/* Logo */}
                <div>
                    <h1 className="text-xl font-bold">
                        <Link href="/">Bloggram</Link>
                    </h1>
                </div>

                {/* Navigation Links */}
                <div className="flex">
                    <Link href="/" className="mx-2 hover:border-b-2 hover:border-b-black">
                        Home
                    </Link>
                    <Link href="/products" className="mx-2 hover:border-b-2 hover:border-b-black">
                        Products
                    </Link>
                    <Link href="/blogs" className="mx-2 hover:border-b-2 hover:border-b-black">
                        Blogs
                    </Link>
                    <Link href="/about" className="mx-2 hover:border-b-2 hover:border-b-black">
                        About
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    {user ? (
                        <>
                            <Link href="/add-blog" className="mx-2 hover:border-b-2 hover:border-b-black">Add Blog</Link>
                            <Link href="/profile" className="flex items-center gap-2">
                                <img
                                    src={user.avatar || "/default-avatar.png"}
                                    alt="avatar"
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="text-sm text-red-500 hover:underline"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/login" className="mx-2 hover:border-b-2 hover:border-b-black">
                                Log in
                            </Link>
                            <Link href="/signup" className="mx-2 bg-black text-white rounded-xl p-3">
                                Sign up
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}