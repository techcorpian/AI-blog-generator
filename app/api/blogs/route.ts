import { NextResponse } from 'next/server';

interface Blog {
  id: string;
  img: string;
  title: string;
  content: string;
  createdAt: string;
  createdBy: String;
}

let blogs: Blog[] = [
    { id: '1', img: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1966&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', title: 'The Evolution of Luxury Cars From Classic Elegance to Modern Innovation', content: 'Luxury cars have always been symbols of wealth, status, and superior engineering. From the first opulent automobiles of the early 20th century to today’s high-tech marvels, the luxury car market has seen a remarkable evolution. This blog post takes a look at how luxury cars have transformed over the decades, blending timeless elegance with cutting-edge technology. In the early 1900s, luxury cars were defined by their craftsmanship and exclusivity. Brands like Rolls-Royce and Mercedes-Benz set the standard for what a luxury car should be. These cars were not just modes of transportation—they were expressions of wealth and prestige. They were built with meticulous attention to detail, featuring premium materials like leather interiors and handcrafted wood finishes. Today’s luxury cars are all about combining high performance, state-of-the-art technology, and sustainable practices. Luxury brands like Audi, BMW, and Mercedes-Benz continue to lead the way with electric vehicles (EVs) like the Audi e-Tron and the Mercedes EQS, offering eco-friendly options without compromising on luxury. Performance is key, with features like adaptive suspension systems, AI-driven driver assistance, and autonomous driving capabilities.Customization is another hallmark of modern luxury vehicles. Buyers can now tailor their cars to an unprecedented degree, choosing everything from interior materials to exterior colors and even advanced technology options. The concept of luxury has evolved from mere opulence to a more personalized experience, where the driver’s needs and desires take center stage.', createdAt: '2024-03-04T12:00:00.000Z', createdBy: 'Abdul' },

    { id: '2', img: 'https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?q=80&w=1992&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', title: 'The Rise of Artificial Intelligence Transforming Our World', content: 'Artificial Intelligence (AI) has transitioned from a futuristic concept to a key player in nearly every sector, transforming the way we live, work, and interact with technology. From self-driving cars to AI-powered healthcare tools, the rise of AI has redefined industries and opened up new possibilities for the future. This blog post explores the current state of AI, its applications, and its potential to reshape the world. At its core, Artificial Intelligence refers to the simulation of human intelligence processes by machines, particularly computer systems. These processes include learning (the ability to improve performance based on experience), reasoning (the ability to draw conclusions from data), and self-correction. In simpler terms, AI enables machines to mimic cognitive functions such as problem-solving, pattern recognition, and decision-making. AI systems are powered by data and algorithms, using vast amounts of information to train models that can make predictions or perform tasks that would normally require human intelligence. Over the past few decades, advancements in machine learning (ML), deep learning (DL), and natural language processing (NLP) have significantly accelerated the development of AI.', createdAt: '2024-02-02T12:00:00.000Z', createdBy: 'Kishore' },

    { id: '3', img: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', title: 'Exploring the Mysteries of Space and Time A Journey Through the Cosmos', content: 'Space and time—two of the most fundamental concepts in the universe—are intrinsically linked in ways that continue to baffle and inspire scientists, philosophers, and dreamers alike. From Einsteins theory of relativity to the exploration of black holes, our understanding of space and time has evolved significantly over the past century. This blog delves into the nature of space and time, the groundbreaking theories that have shaped our understanding, and the exciting possibilities that lie ahead in the exploration of the cosmos. Space is vast, seemingly infinite, and ever-expanding. It is the "stage" in which everything in the universe occurs, from the movement of planets and stars to the trajectories of spacecraft. The concept of space has fascinated humans for centuries, but our understanding of it only began to take shape with the advent of modern physics. Historically, space was seen as a static and unchanging backdrop for events in the universe. It was thought to be a simple void in which objects existed and moved. However, in the early 20th century, Albert Einstein revolutionized our understanding of space with his theory of general relativity.', createdAt: '2024-01-24T12:00:00.000Z', createdBy: 'Abdul' },

    { id: '4', img: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', title: 'The Importance of Planning: Key to Success in Any Endeavor', content: 'Planning is the foundation of success in any aspect of life, whether in business, personal growth, or everyday tasks. It provides a structured approach to achieving goals and helps individuals and organizations stay focused on their objectives. Without proper planning, even the most promising ideas can fail due to a lack of direction, organization, and preparedness. By taking the time to plan, we can anticipate challenges, allocate resources efficiently, and improve our chances of success. One of the biggest advantages of planning is the clarity it provides. When we plan, we define our goals and break them down into actionable steps. This prevents confusion and ensures that every effort we make is aligned with our ultimate objectives. A well-structured plan also helps in managing time, money, and energy more effectively, reducing wastage and maximizing efficiency. Another critical benefit of planning is its ability to minimize risks and uncertainties. By analyzing potential challenges in advance, we can develop strategies to overcome obstacles before they arise. This proactive approach reduces the likelihood of failure and allows us to navigate unexpected situations with confidence. Furthermore, planning enhances productivity by streamlining tasks and setting priorities. It helps individuals and teams stay organized, meet deadlines, and make steady progress toward their goals.', createdAt: '2024-01-15T12:00:00.000Z', createdBy: 'You' },
]; // In-memory storage

// Get all blogs
export async function GET() {
  return NextResponse.json(blogs);
}

// Create a new blog
export async function POST(req: Request) {
  const { title, content, img } = await req.json();

  if (!title || !content) {
    return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
  }

  const newBlog: Blog = {
    id: Date.now().toString(),
    img,
    title,
    content,
    createdAt: new Date().toISOString(),
    createdBy: 'You'
  };

  blogs.push(newBlog);
  return NextResponse.json(newBlog);
}

// Delete a blog
export async function DELETE(req: Request) {
  const { id } = await req.json();
  blogs = blogs.filter((blog) => blog.id !== id);
  return NextResponse.json({ message: 'Blog deleted' });
}

export async function PUT(req: Request) {
    try {
      const { id, title, content } = await req.json();
      const blogIndex = blogs.findIndex((blog) => blog.id === id);
  
      if (blogIndex === -1) {
        return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
      }
  
      blogs[blogIndex] = { ...blogs[blogIndex], title, content };
      return NextResponse.json({ message: 'Blog updated successfully', blog: blogs[blogIndex] });
    } catch (error) {
      return NextResponse.json({ error: 'Failed to update blog' }, { status: 500 });
    }
  }