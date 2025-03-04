// APIs

// Fetch Blog API
export const fetchBlogsApi = async () => {
    try {
        const res = await fetch('/api/blogs');
        if (!res.ok) {
            throw new Error('Failed to fetch blogs');
        }

        return await res.json();
    } catch (error) {
        console.error('Error fetching blogs:', error);
        return [];
    }
};

// AI Generate Blog API
export const generateBlog = async (topic: string) => {
    try {
        const res = await fetch('/api/generate-blog', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ topic }),
        });

        if (!res.ok) {
            throw new Error('Failed to generate blog');
        }

        return await res.json();
    } catch (error) {
        console.error('Error generating blog:', error);
        return null;
    }
};

// Post Blog API
export const postBlog = async (blogData: object) => {
    try {
        const res = await fetch('/api/blogs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(blogData),
        });

        if (!res.ok) {
            throw new Error('Failed to save blog');
        }

        return await res.json();
    } catch (error) {
        console.error('Error saving blog:', error);
        return null;
    }
};

// Delete Blog API
export const deleteBlog = async (id: string) => {
    try {
        const res = await fetch('/api/blogs', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id }),
        });

        if (!res.ok) {
            throw new Error('Failed to delete blog');
        }

        return true;
    } catch (error) {
        console.error('Error deleting blog:', error);
        return false;
    }
};

// Fetch Blog By Id
export const fetchBlogById = async (id: string) => {
    try {
        const res = await fetch('/api/blogs');
        if (!res.ok) {
            throw new Error('Failed to fetch blogs');
        }

        const blogs = await res.json();
        const foundBlog = blogs.find((b: { id: string }) => b.id === id);
        return foundBlog; // Return the found blog or null if not found
    } catch (error) {
        console.error('Error fetching blog:', error);
        return null; // Return null in case of error
    }
};

// Update Blog API
export const updateBlog = async (blog: object) => {
    try {
        const res = await fetch('/api/blogs', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(blog),
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || 'Failed to update blog');
        }

        return true; // Return true for successful update
    } catch (error) {
        console.error('Error updating blog:', error);
        return false; // Return false in case of failure
    }
};

