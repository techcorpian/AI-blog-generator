'use client';

import { useEffect, useContext } from 'react';
import { BlogContext } from '../context/BlogContext';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import ViewLoading from '../UIElements/ViewLoading';

export default function BlogPage() {
    const { blog, loading, handleFetchBlogById } =
        useContext(BlogContext) ?? {};
    const { id } = useParams();

    useEffect(() => {
        if (id && handleFetchBlogById) {
            handleFetchBlogById(id.toString());
        }
    }, [id]);

    if (loading) return (
        <ViewLoading />
    );

    if (!blog) return <ViewLoading />;


    return (
        <div className="max-w-3xl mx-auto p-4">
            <Link href='/' className="text-blue-500 hover:underline">
                ← Back
            </Link>

            <p className="text-gray-600 mt-4 text-center">{new Date(blog.createdAt).toLocaleString()}</p>
            <h1 className="md:text-4xl text-3xl  font-bold mb-4 text-center text-neutral-800">{blog.title}</h1>
            <img src={String(blog.img)} alt="" className='my-9 rounded-xl h-100 w-full object-cover' />
            <p className="mt-4 text-gray-800 text-xl text-justify first-letter:text-4xl first-letter:font-bold">{blog.content}</p>

        </div>
    );
}
