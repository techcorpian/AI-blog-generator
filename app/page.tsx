'use client';

import { useState, useEffect, FormEvent } from 'react';

import InputGen from './blog/UIElements/InputGen';
import Loading from './blog/UIElements/Loading';
import Card from './blog/UIElements/Card';
import PostModal from './blog/UIElements/PostModal';

interface Blog {
  id: number;
  img: string;
  title: string;
  content: string;
  createdAt: string;
  createdBy: string;
}

export default function HomePage() {
  const [topic, setTopic] = useState('');
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [previewBlog, setPreviewBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(false);
  const [generate, setGenerate] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("title");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [quickFilter, setQuickFilter] = useState("");

  // Fetch blogs from backend
  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/blogs');
      if (res.ok) {
        const data = await res.json();
        setBlogs(data);
      }
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
    if (!topic) return;

    setGenerate(true);
    try {
      const res = await fetch('/api/generate-blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic }),
      });

      if (res.ok) {
        const newBlog = await res.json();
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

    console.log(previewBlog);

    try {
      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(previewBlog),
      });

      if (res.ok) {
        const newBlog = await res.json();
        setBlogs((prev) => [...prev, newBlog]);
        setPreviewBlog(null);
        setTopic('');
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error('Error saving blog:', error);
    }
  };

  const handleChange = async (e: any) => {
    setTopic(e.target.value);
  };

  // Delete Blog
  const handleDelete = async (id: number) => {
    setLoading(true);
    try {
      const res = await fetch('/api/blogs', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        setBlogs((prev) => prev.filter((blog) => blog.id !== id));
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleQuickFilter = (type: string) => {
    setQuickFilter(type);

    const now = new Date();
    let startDate = new Date();

    if (type === "lastWeek") startDate.setDate(now.getDate() - 7);
    else if (type === "lastMonth") startDate.setMonth(now.getMonth() - 1);
    else if (type === "lastYear") startDate.setFullYear(now.getFullYear() - 1);
    else {
      setFromDate("");
      setToDate("");
      return;
    }

    // Set 'from' time to 00:00:00
    startDate.setHours(0, 0, 0, 0);

    // Set 'to' time to 23:59:59
    const endDate = new Date(now);
    endDate.setHours(23, 59, 59, 999);

    setFromDate(startDate.toISOString().split("T")[0]); // Format: YYYY-MM-DD
    setToDate(endDate.toISOString().split("T")[0]); // Format: YYYY-MM-DD
  };


  // Filter blogs dynamically
  const filteredBlogs = blogs.filter((blog) => {
    const blogDate = new Date(blog.createdAt);
    const from = fromDate ? new Date(fromDate + "T00:00:00") : null; // Set time to 00:00:00
    const to = toDate ? new Date(toDate + "T23:59:59") : null; // Set time to 23:59:59

    // Filtering based on search term, category, user, and date range
    return (
      // Filter by search term
      (searchTerm === "" ||
        (searchType === "title" && blog.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (searchType === "user" && blog.createdBy.toLowerCase().includes(searchTerm.toLowerCase()))) &&

      // Filter by date range
      (!from || blogDate >= from) &&
      (!to || blogDate <= to)
    );
  });

console.log(blogs)


  return (
    <div className="max-w-7xl mx-auto p-4 px-9">
      <div className="max-w-3xl mx-auto p-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Generate Your Blog With Our AI-Powered Blog Generator.</h1>
        <InputGen handleGenerate={handleGenerate} handleChange={handleChange} loading={generate} topic={topic} />
      </div>

      <div className='flex justify-between items-center mb-4 mt-9'>
        <div className='text-3xl font-bold pb-4'></div>
        <div className="flex flex-wrap mb-4 gap-4 text-sm text-neutral-500">

          <div className='flex bg-white rounded-full'>
            {/* Quick Filters Dropdown */}
            <select
              value={quickFilter}
              onChange={(e) => handleQuickFilter(e.target.value)}
              className="p-2 px-4 border-l border-y border-neutral-400 text-black rounded-l-full focus:outline-none"
            >
              <option value="">Select Date Filter</option>
              <option value="lastWeek">Last Week</option>
              <option value="lastMonth">Last Month</option>
              <option value="lastYear">Last Year</option>
            </select>

            <div className='flex items-center'>
              {/* From Date */}
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="p-2 border-l border-y border-neutral-400 focus:outline-none"
              />

              {/* To Date */}
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="p-2 pr-4 border-r border-y border-neutral-400 focus:outline-none rounded-r-full"
              />
            </div>
          </div>

          <div className='flex bg-white rounded-full'>
            {/* Search Type Dropdown */}
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="p-2 pl-4 border-l border-y border-neutral-400 text-black rounded-l-full focus:outline-none"
            >
              <option value="title">Search by Title</option>
              <option value="user">Search by User</option>
              <option value="category">Search by Category</option>
            </select>

            {/* Search Input */}
            <input
              type="text"
              placeholder={`Search by ${searchType.charAt(0).toUpperCase() + searchType.slice(1)}...`}
              value={searchTerm}
              onChange={handleSearchChange}
              className="p-2 pr-4 border border-neutral-400 focus:outline-none rounded-r-full w-64"
            />
          </div>
        </div>

      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-6">
          {filteredBlogs.length === 0 && <p>No blogs available. Generate one!</p>}
          {filteredBlogs
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) // Sort by date in descending order
            .map((blog) => (
              <Card key={Number(blog.id)} blog={blog} handleDelete={handleDelete} />
            ))}
        </div>

      )}

      <PostModal isModalOpen={isModalOpen} previewBlog={previewBlog} setPreviewBlog={setPreviewBlog} setIsModalOpen={setIsModalOpen} handlePostBlog={handlePostBlog}/>
    </div>
  );
}
