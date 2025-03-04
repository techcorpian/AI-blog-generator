import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card as MuiCard, CardContent, Typography, Button, Box } from '@mui/material';
import { BlogContext } from '../context/BlogContext';

import { LuDot } from "react-icons/lu";
import { CiEdit, CiTrash } from "react-icons/ci";
import { Blog } from '@/lib/Interface';


interface CardProps {
    blog: Blog;
}

export default function Card({ blog }: CardProps) {
    const { handleDelete } =
        useContext(BlogContext) ?? {};
    const router = useRouter();

    return (
        <MuiCard key={blog.id} sx={{
            p: 0,
            background: 'none',
            boxShadow: '0',
            borderRadius: '1rem',
            transition: 'all 0.3s ease',
            '&:hover': {
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                transform: 'scale(1.05)',
            },
        }} className='flex flex-col justify-between '>

            <CardContent className='flex flex-col'>
                <img src={String(blog.img)} className='h-50 w-full bg-neutral-200 mb-6 rounded-xl object-cover' />
                <div className='flex items-center text-xs font-medium text-neutral-500'>
                    <div>
                        {blog.createdBy}
                    </div>
                    <LuDot />
                    <div>
                        {new Date(blog.createdAt).toLocaleString()}
                    </div>
                </div>
                <Typography variant="h6" component="div" gutterBottom className='break-words'>
                    <Link href={`/blog/${blog.id}`} className='text-2xl font-semibold'>
                        {blog.title.length > 30 ? blog.title.slice(0, 40) + '...' : blog.title}
                    </Link>
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }} className='text-wrap text-neutral-600 font-thin'>
                    {blog.content.length > 150 ? blog.content.slice(0, 150) + '...' : blog.content}
                </Typography>

            </CardContent>
            <Box sx={{ mt: 2, display: 'flex', gap: 1, px: 2, py: 1, justifyContent: 'space-between' }}>
                <Link href={`/blog/${blog.id}`} className='' passHref>
                    <Button variant="text" color="primary">Read More</Button>
                </Link>
                {blog.createdBy != 'You' ? "" :
                    <div className='flex gap-2'>
                        <Button
                            sx={{ minWidth: '20px', padding: '4px' }}
                            onClick={() => handleDelete && handleDelete(blog.id)}
                        >
                            <CiTrash className='text-2xl' />
                        </Button>
                        <Button
                            sx={{ minWidth: '20px', padding: '4px' }}
                            onClick={() => router.push(`/blog/${blog.id}/edit`)}
                        >
                            <CiEdit className='text-2xl' />
                        </Button>
                    </div>
                }
            </Box>
        </MuiCard>
    );
}