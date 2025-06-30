'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface Blog {
  _id: string;
  title: string;
  content: string;
  author: string;
  slug: string;
  createdAt: string;
}

export default function Blog() {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`/api/posts/${slug}`);
        if (!response.ok) {
          throw new Error('Blog not found');
        }
        const data = await response.json();
        setBlog(data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };
    if (slug) {
      fetchBlog();
    }
  }, [slug]);

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (error || !blog) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">Error: {error || 'Blog not found'}</p>
        <Link href="/posts" className="text-blue-500 hover:underline">
          Back to Blogs
        </Link>
      </div>
    );
  }
  console.log(blog.author);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Link href="/posts" className="text-blue-500 hover:underline mb-4 inline-block">
        &larr; Back to Blogs
      </Link>
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <p className="text-gray-600 mb-2">By Admin</p>
      <p className="text-sm text-gray-500 mb-6">
        Published: {new Date(blog.createdAt).toLocaleDateString()}
      </p>
      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </div>
  );
}