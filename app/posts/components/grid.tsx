'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Calendar, User, Clock, ArrowRight } from 'lucide-react';

interface Blog {
  _id: string;
  title: string;
  content: string;
  author: string;
  slug: string;
  createdAt: string;
}

const stripHtml = (html: string) => {
  if (typeof window === 'undefined') return html;
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
};

export default function Grid() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/api/posts');
        if (!response.ok) {
          throw new Error('Failed to fetch blogs');
        }
        const data = await response.json();
        setBlogs(data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Loading blog posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-6 py-12">
        {blogs.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-16 text-center">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-slate-400 text-4xl">📖</span>
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">No posts available</h3>
            <p className="text-slate-600">Check back later for new content!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {blogs.map((blog, key) => (
              <Link href={`/posts/${blog.slug}`} key={key} className="group">
                <article className="group bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl border border-white/20 p-8 transition-all duration-300 hover:-translate-y-2 h-full flex flex-col">
                  <div className="flex-1 mb-6">
                    <h2 className="text-xl font-bold text-slate-800 mb-4 group-hover:text-blue-600 transition-colors duration-200 line-clamp-3 leading-tight">
                      {blog.title}
                    </h2>
                    
                    <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                      <div className="flex items-center gap-1">
                        <User size={14} />
                        <span className="font-medium">{blog.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}</span>
                      </div>
                    </div>
                    
                    <p className="text-slate-600 leading-relaxed line-clamp-4">
                      {stripHtml(blog.content).substring(0, 150)}...
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100">
                    <div className="inline-flex items-center gap-2 text-blue-600 font-medium group-hover:text-blue-700 transition-colors duration-200">
                      <Clock size={16} />
                      <span>Read article</span>
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}