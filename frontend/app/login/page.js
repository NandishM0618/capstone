'use client'
import { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import instance from "@/lib/axios";

export default function page(params) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    async function handleLogin(e) {
        e.preventDefault();
        try {
            const res = await instance.post("/user/login", { email, password });
            localStorage.setItem("user", JSON.stringify(res.data.user))
            alert("Login Successfull")
            console.log(res.data.user)
            window.location.href = "/"
        } catch (err) {
            console.error(err)
            alert("Login Failed")
        }
    }
    return (
        <>
            {/* <Navbar /> */}
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                    <h2 className="text-3xl font-bold text-center text-black mb-6">
                        Login
                    </h2>

                    <form className="space-y-5" onSubmit={handleLogin}>
                        <div>
                            <label
                                htmlFor="email"
                                className="block mb-1 text-gray-600 font-medium"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block mb-1 text-gray-600 font-medium"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2">
                                <input type="checkbox" className="accent-blue-500" />
                                Remember me
                            </label>
                            <a href="#" className="text-blue-500 hover:underline">
                                Forgot password?
                            </a>
                        </div>

                        <button
                            type="submit"
                            className="w-full cursor-pointer bg-black text-white py-2 rounded-lg font-semibold hover:bg-gray-800 hover:text-white transition"
                        >
                            Sign In
                        </button>
                    </form>

                    <p className="mt-6 text-sm text-center text-gray-600">
                        Don't have an account?{" "}
                        <a
                            href="/signup"
                            className="text-blue-500 font-medium hover:underline"
                        >
                            Sign Up
                        </a>
                    </p>
                </div>
            </div>
            {/* <Footer /> */}
        </>
    );
}