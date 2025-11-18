import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';

export function BlogCard({ blog }) {
  const formattedDate = new Date(blog.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Function to truncate content to first 150 characters
  const truncateContent = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Blog Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={blog.imageUrl || 'https://placehold.co/800x600/e2e8f0/64748b?text=Blog+Image'}
          alt={blog.heading}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src = 'https://placehold.co/800x600/e2e8f0/64748b?text=Blog+Image';
          }}
        />
      </div>

      {/* Blog Content */}
      <div className="p-6">
        {/* Date */}
        <div className="flex items-center gap-2 text-sm text-slate-600 mb-3">
          <Calendar className="w-4 h-4" />
          <span>{formattedDate}</span>
        </div>

        {/* Heading */}
        <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2">
          {blog.heading}
        </h3>

        {/* Blog Excerpt */}
        <p className="text-slate-600 mb-4 line-clamp-3">
          {truncateContent(blog.content)}
        </p>

        {/* Read More Link */}
        <Link
          href={`/blog/${blog.id}`}
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
        >
          Read More
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
