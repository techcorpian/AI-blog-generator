import { NextRequest, NextResponse } from 'next/server';
import { getBlog, deleteBlog } from '@/lib/blogs';

export async function GET(
  request: Request,
  context: { params: { id: string } }
): Promise<Response> {
  const blogId = parseInt(context.params.id, 10);
  if (isNaN(blogId)) {
    return NextResponse.json({ error: 'Invalid blog ID' }, { status: 400 });
  }

  await new Promise((resolve) => setTimeout(resolve, 500)); // Simulating delay

  const blog = await getBlog(blogId);
  if (!blog) {
    return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
  }

  return NextResponse.json(blog);
}

export async function DELETE(
  request: Request,
  context: { params: { id: string } }
): Promise<Response> {
  const blogId = parseInt(context.params.id, 10);
  if (isNaN(blogId)) {
    return NextResponse.json({ error: 'Invalid blog ID' }, { status: 400 });
  }

  await new Promise((resolve) => setTimeout(resolve, 500)); // Simulating delay

  const deleted = await deleteBlog(blogId);
  if (!deleted) {
    return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
  }

  return NextResponse.json({ message: 'Blog deleted successfully' });
}

