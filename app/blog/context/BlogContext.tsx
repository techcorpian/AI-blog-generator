'use client';

import { createContext, useState, useEffect, FormEvent, ReactNode, useMemo } from "react";
import { fetchBlogsApi, generateBlog, postBlog, deleteBlog, fetchBlogById, updateBlog } from '@/lib/api';
import { Blog } from '@/lib/Interface';
import { useRouter } from 'next/navigation';

interface BlogContextProps {
    topic: string;
    blogs: Blog[];
    loading: boolean;
    generate: boolean;
    isModalOpen: boolean;
    previewBlog: Blog | null;
    handleGenerate: (e: FormEvent) => Promise<void>;
    handlePostBlog: () => Promise<void>;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleDelete: (id: string) => Promise<void>;
    setPreviewBlog: React.Dispatch<React.SetStateAction<Blog | null>>;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    filterBlogs: Blog[] | undefined;
    quickFilter: string;
    searchType: string;
    searchTerm: string;
    fromDate: string;
    toDate: string;
    setQuickFilter: React.Dispatch<React.SetStateAction<string>>;
    setSearchType: React.Dispatch<React.SetStateAction<string>>;
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
    setFromDate: React.Dispatch<React.SetStateAction<string>>;
    setToDate: React.Dispatch<React.SetStateAction<string>>;
    handleQuickFilter: (type: string) => void;
    blog: Blog | null;
    setBlog: React.Dispatch<React.SetStateAction<Blog | null>>;
    handleFetchBlogById: (id: string) => Promise<void>;
    handleUpdate: (id: string) => Promise<void>;
}

export const BlogContext = createContext<BlogContextProps | undefined>(undefined);

interface BlogProviderProps {
    children: ReactNode;
}

export const BlogProvider = ({ children }: BlogProviderProps) => {
    const [previewBlog, setPreviewBlog] = useState<Blog | null>(null);
    const [topic, setTopic] = useState('');
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(false);
    const [generate, setGenerate] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchType, setSearchType] = useState('title');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [quickFilter, setQuickFilter] = useState('');

    const router = useRouter();

    const [blog, setBlog] = useState<Blog | null>(null);
    // const [loading, setLoading] = useState(true);

    // Fetch blogs from backend
    const fetchBlogs = async () => {
        setLoading(true);
        try {
            const data = await fetchBlogsApi();
            setBlogs(data);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    // Generate Blog (Preview)
    const handleGenerate = async (e: FormEvent) => {
        e.preventDefault();
        if (!topic.trim()) return;

        setGenerate(true);
        try {
            const newBlog = await generateBlog(topic);
            if (newBlog) {
                setPreviewBlog(newBlog);
                setIsModalOpen(true);
            }
        } catch (error) {
            console.error('Error generating blog:', error);
        } finally {
            setGenerate(false);
        }
    };

    // Save Preview Blog to Backend
    const handlePostBlog = async () => {
        if (!previewBlog) return;

        try {
            const newBlog = await postBlog(previewBlog);
            if (newBlog) {
                setBlogs((prev) => [...prev, newBlog]);
                setPreviewBlog(null);
                setTopic('');
                setIsModalOpen(false);
            }
        } catch (error) {
            console.error('Error posting blog:', error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTopic(e.target.value);
    };

    // Delete Blog
    const handleDelete = async (id: string) => {
        setLoading(true);
        try {
            const success = await deleteBlog(id);
            if (success) {
                setBlogs((prev) => prev.filter((blog) => blog.id !== id));
            }
        } catch (error) {
            console.error('Error deleting blog:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFetchBlogById = async (id: string) => {
        setLoading(true);
        try {
            const foundBlog = await fetchBlogById(String(id));
            if (foundBlog) {
                setBlog(foundBlog);
            } else {
                console.error('Blog not found');
            }
        } finally {
            setLoading(false);
        }
    };


    const handleUpdate = async (id: string) => {
        if (!blog) return;
        const success = await updateBlog(blog);

        if (success) {
            // alert('Blog updated successfully!');
            router.push(`/blog/${id}`); // Redirect to the updated blog page
        } else {
            console.error('Failed to update blog');
        }
    };

    const handleQuickFilter = (type: string) => {
        setQuickFilter(type);
        const now = new Date();
        let startDate = new Date();

        switch (type) {
            case 'lastWeek':
                startDate.setDate(now.getDate() - 7);
                break;
            case 'lastMonth':
                startDate.setMonth(now.getMonth() - 1);
                break;
            case 'lastYear':
                startDate.setFullYear(now.getFullYear() - 1);
                break;
            default:
                setFromDate('');
                setToDate('');
                return;
        }

        setFromDate(startDate.toISOString().split('T')[0]);
        setToDate(now.toISOString().split('T')[0]);
    };

    const filterBlogs = useMemo(() => {
        return blogs
            .filter((blog) => {
                if (!blog?.createdAt) return false;

                const blogDate = new Date(blog.createdAt);
                const from = fromDate ? new Date(fromDate + 'T00:00:00') : null;
                const to = toDate ? new Date(toDate + 'T23:59:59') : null;

                return (
                    (!searchTerm ||
                        (searchType === 'title' && blog.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
                        (searchType === 'user' && blog.createdBy.toLowerCase().includes(searchTerm.toLowerCase()))) &&
                    (!from || blogDate >= from) &&
                    (!to || blogDate <= to)
                );
            })
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }, [blogs, searchTerm, searchType, fromDate, toDate]);

    return (
        <BlogContext.Provider value={{ topic, blogs, loading, generate, isModalOpen, previewBlog, handleGenerate, handlePostBlog, handleChange, handleDelete, setPreviewBlog, setIsModalOpen, filterBlogs, quickFilter, searchType, searchTerm, fromDate, toDate, setQuickFilter, setSearchType, setSearchTerm, setFromDate, setToDate, handleQuickFilter, blog, setBlog, handleFetchBlogById, handleUpdate }}>
            {children}
        </BlogContext.Provider>
    );
};