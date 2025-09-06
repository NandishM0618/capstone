"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import instance from "@/lib/axios";

export default function Carousel() {
    const [blogs, setBlogs] = useState([])
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
    };
    useEffect(() => {
        const getBlogs = async () => {
            try {
                const res = await instance.get("/post/posts");
                setBlogs(res.data || []);
            } catch (error) {
                console.error("Failed to fetch blogs", error);
            }
        };
        getBlogs();
        console.log("carosel rendered")
    }, []);
    return (
        <div className="relative w-full max-w-7xl mx-auto mt-8 rounded-2xl overflow-hidden shadow-lg">
            <Slider {...settings}>
                {blogs.map((blog) => (
                    <div key={blog._id}>
                        <div className="relative max-h-[500px] ">
                            <img
                                src={blog.coverImg.url}
                                alt={blog.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-opacity-50 flex flex-col justify-end p-6 text-white">
                                <h3 className="text-2xl font-bold">{blog.title}</h3>
                                <p className="text-sm mt-1">{blog.body.substring(0, 100)}...</p>
                                <span className="text-xs mt-2">{new Date(blog.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}