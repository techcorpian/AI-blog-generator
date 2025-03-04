'use client';

import { useContext, useState } from 'react';
import { BlogContext } from './blog/context/BlogContext';

import InputGen from './blog/UIElements/InputGen';
import Loading from './blog/UIElements/Loading';
import Card from './blog/UIElements/Card';
import PostModal from './blog/UIElements/PostModal';
import FilterBar from './blog/UIElements/FilterBar';

export default function HomePage() {
  const { blogs, loading, filterBlogs } =
    useContext(BlogContext) ?? {};

  if (!blogs) return null;

  return (
    <div className="max-w-7xl mx-auto p-4 px-9">

      {/* AI Generator */}
      <div className="max-w-3xl mx-auto p-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Generate Your Blog With Our AI-Powered Blog Generator.</h1>
        <InputGen />
      </div>

      {/* Filter Bar */}
      <FilterBar />

      {/* Blog Cards */}
      {loading ? (
        <Loading />
      ) : (
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-6">
          {filterBlogs?.length === 0 ? <p>No blogs available. Generate one!</p> : filterBlogs?.map((blog) => <Card key={blog.id} blog={blog} />)}
        </div>
      )}

      {/* Generated Preview Modal */}
      <PostModal />
    </div>
  );
}
