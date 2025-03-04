import { Blog } from "./Interface";

let blogs: Blog[] = [];
let currentId = 1;

export function getBlogs(): Blog[] {
  return blogs;
}

export function getBlog(id: string): Blog | undefined {
  return blogs.find((b) => b.id === id);
}

export function addBlog(blog: Omit<Blog, 'id'>): Blog {
  const newBlog: Blog = { ...blog, id: (currentId++).toString() };
  blogs.push(newBlog);
  return newBlog;
}

export function deleteBlog(id: string): Blog | null {
  const index = blogs.findIndex((b) => b.id === id);
  if (index !== -1) {
    const [deletedBlog] = blogs.splice(index, 1);
    return deletedBlog;
  }
  return null;
}
