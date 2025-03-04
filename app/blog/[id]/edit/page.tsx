'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useRouter } from 'next/navigation';

interface Blog {
  id: string;
  img: string;
  title: string;
  content: string;
  createdAt: string;
}

export default function EditBlogPage() {
  const { id } = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false);

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

  const handleUpdate = async () => {
    if (!blog) return;

    try {
      const res = await fetch('/api/blogs', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(blog),
      });

      if (res.ok) {
        alert('Blog updated successfully!');
        router.push(`/blog/${id}`); // Redirect to the updated blog page
      } else {
        const errorData = await res.json();
        console.error('Failed to update blog:', errorData.error);
      }
    } catch (error) {
      console.error('Error updating blog:', error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!blog) return <p>Blog not found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <button onClick={() => router.back()} className="text-blue-500 hover:underline">
        ← Back
      </button>

      <h1 className="text-2xl font-bold my-4">Edit Blog Post</h1>

      {blog.img && (
        <div className="relative h-50 w-full cursor-pointer" onClick={() => setIsImagePreviewOpen(true)}>
          <img
            src={blog.img}
            alt="Preview"
            className="w-full h-full object-cover rounded-xl"
          />
          {/* Overlay with gradient and text */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50 flex items-center justify-center rounded-xl">
            <span className="text-white font-semibold text-lg">Preview Image</span>
          </div>
        </div>
      )}

      <input
        type="text"
        value={blog.title}
        onChange={(e) => setBlog({ ...blog, title: e.target.value })}
        className="w-full p-2 px-4 bg-white rounded-lg mt-2 shadow-md border border-neutral-200"
      />

      <textarea
        value={blog.content}
        onChange={(e) => setBlog({ ...blog, content: e.target.value })}
        className="w-full p-2 px-4 bg-white rounded-lg mt-2 h-40 shadow-md border border-neutral-200"
      />

      <button
        onClick={handleUpdate}
        className="mt-4 bg-neutral-900 text-white px-4 py-2 rounded-full hover:bg-neutral-800"
      >
        Save Changes
      </button>

      {/* Image Preview Modal */}
      <AnimatePresence>
        {isImagePreviewOpen && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative bg-white p-4 rounded-lg shadow-lg"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button
                className="absolute top-2 right-2 text-white bg-black/50 px-2 py-1 rounded-full hover:bg-black"
                onClick={() => setIsImagePreviewOpen(false)} // Close preview modal
              >
                ✕
              </button>
              <img src={blog.img} alt="Full Preview" className="max-w-full max-h-[80vh] rounded-lg" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
