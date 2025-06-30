'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Edit3, Trash2, Plus, LogOut, Calendar, User } from 'lucide-react';

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

export default function Admin() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
      router.push('/');
    } else {
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
    }
  }, [router, isClient]);

  const handleDelete = async (slug: string) => {
    if (confirm('Are you sure you want to delete this blog?')) {
      try {
        const response = await fetch(`/api/posts/${slug}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to delete blog');
        }
        setBlogs(blogs.filter((blog) => blog.slug !== slug));
      } catch (err: any) {
        setError(err.message);
      }
    }
  };

  if (!isClient || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Loading your content...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl shadow-xl p-8 max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-500 text-2xl">⚠️</span>
          </div>
          <h3 className="text-lg font-semibold text-slate-800 mb-2">Something went wrong</h3>
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-6 py-10">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 mb-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
                Content Dashboard
              </h1>
              <p className="text-slate-600">Manage and organize your blog posts</p>
            </div>
            <div className="flex gap-3">
              <Link 
                href="/create" 
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-medium"
              >
                <Plus size={18} />
                New Post
              </Link>
              <button
                onClick={() => {
                  if (isClient) {
                    localStorage.removeItem('isLoggedIn');
                    router.push('/');
                  }
                }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500 to-red-500 text-white px-6 py-3 rounded-2xl hover:from-rose-600 hover:to-red-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-medium"
              >
                <LogOut size={18} />
                Sign Out
              </button>
            </div>
          </div>
        </div>


        {blogs.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-16 text-center">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-slate-400 text-4xl">📝</span>
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">No posts yet</h3>
            <p className="text-slate-600 mb-6">Get started by creating your first blog post.</p>
            <Link 
              href="/create" 
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-medium"
            >
              <Plus size={18} />
              Create First Post
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {blogs.map((blog, key) => (
              <div 
                key={key} 
                className="group bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl border border-white/20 p-8 transition-all duration-300 hover:-translate-y-2"
              >
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2 leading-tight">
                    {blog.title}
                  </h2>
                  
                  <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                    <div className="flex items-center gap-1">
                      <User size={14} />
                      <span>{blog.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <p className="text-slate-600 leading-relaxed line-clamp-3">
                    {stripHtml(blog.content).substring(0, 120)}...
                  </p>
                </div>

                <div className="flex gap-3 pt-4 border-t border-slate-100">
                  <Link
                    href={`/edit/${blog.slug}`}
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-3 rounded-xl hover:bg-emerald-100 transition-colors duration-200 font-medium"
                  >
                    <Edit3 size={16} />
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(blog.slug)}
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-rose-50 text-rose-600 px-4 py-3 rounded-xl hover:bg-rose-100 transition-colors duration-200 font-medium"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}