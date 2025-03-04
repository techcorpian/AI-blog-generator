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
    content: `This is a mock blog post about ${topic}. The topic of ${topic} is highly relevant in today's world, and understanding its intricacies is crucial. Whether you're just getting started or looking to deepen your knowledge, there’s always something new to learn. In this post, we'll explore key aspects and insights surrounding ${topic}, offering a comprehensive overview. From historical perspectives to modern advancements, the subject of ${topic} continues to evolve, influencing various fields and industries. The challenges, innovations, and trends within this area are not only fascinating but also impactful. As we delve into these elements, it’s essential to recognize the significance of staying informed and adaptable in a constantly changing environment. Ultimately, the study and application of ${topic} hold great potential for personal and professional growth. Stay tuned as we uncover deeper insights and explore how ${topic} can shape the future.`,
    createdAt: new Date().toString() ,
    createdBy: 'You'
  };

  // Simulate asynchronous delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  const blog = addBlog(newBlogData);
  return NextResponse.json(blog, { status: 201 });
}
