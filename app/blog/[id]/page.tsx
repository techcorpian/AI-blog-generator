'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

interface Blog {
    id: string;
    img: String;
    title: string;
    content: string;
    createdAt: string;
}

export default function BlogPage() {
    const { id } = useParams();
    const router = useRouter();
    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await fetch('/api/blogs');
                if (res.ok) {
                    const blogs: Blog[] = await res.json();
                    const foundBlog = blogs.find((b) => b.id === String(id));
                    if (foundBlog) {
                        setBlog(foundBlog);
                    } else {
                        console.error('Blog not found');
                    }
                }
            } catch (error) {
                console.error('Error fetching blog:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id]);

    if (loading) return (
        <div className="flex flex-col justify-center items-center max-w-3xl mx-auto p-4">
            <p className="bg-gray-200 mt-12 w-1/2 h-5 animate-pulse"></p>
            <h1 className="bg-gray-200 my-4 w-full h-20 animate-pulse"></h1>
            <div className="bg-gray-200 my-4 w-full h-100 my-7 animate-pulse"></div>

            {Array(5).fill(undefined).map((_, index: number) => (
                <p key={index} className="bg-gray-200 my-1 w-full h-5 animate-pulse"></p>
            ))}

        </div>
    );

    if (!blog) return <p>Blog not found.</p>;


    return (
        <div className="max-w-3xl mx-auto p-4">
            <button onClick={() => router.back()} className="text-neutral-800 hover:text-neutral-500 cursor-pointer">
                ← Back
            </button>

            <p className="text-gray-600 mt-4 text-center">{new Date(blog.createdAt).toLocaleString()}</p>
            <h1 className="md:text-4xl text-3xl  font-bold mb-4 text-center text-neutral-800">{blog.title}</h1>
            <img src={String(blog.img)} alt="" className='my-9 rounded-xl' />
            <p className="mt-4 text-gray-800 text-xl text-justify first-letter:text-4xl first-letter:font-bold">{blog.content}</p>

        </div>
    );
}
