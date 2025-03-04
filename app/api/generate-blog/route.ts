import { NextResponse } from 'next/server';
import { addBlog } from '../../../lib/blogs';

export async function POST(request: Request) {
  const body = await request.json();
  const { topic } = body;
  if (!topic) {
    return NextResponse.json({ error: 'Topic is required' }, { status: 400 });
  }

  // Array of image URLs
  const images = [
    'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1432821596592-e2c18b78144f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  ];

  // Select a random image from the array
  const randomImage = images[Math.floor(Math.random() * images.length)];

  const newBlogData = {
    title: `Blog on ${topic}`,
    img: randomImage,
    content: `This is a mock blog post about ${topic}. Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    createdAt: new Date(),
  };

  // Simulate asynchronous delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  const blog = addBlog(newBlogData);
  return NextResponse.json(blog, { status: 201 });
}
