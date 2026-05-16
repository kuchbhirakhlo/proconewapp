import Link from 'next/link';
import { getSortedPostsData } from '@/lib/blog';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | Proco Computer Institute & Proco Technologies',
  description: 'Latest blogs on computer courses, IT training, and digital marketing in Lucknow.',
};

export default async function BlogPage() {
  const posts = await getSortedPostsData();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <div key={post.slug} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-2">
              <Link href={`/blog/${post.slug}`} className="text-blue-600 hover:underline">
                {post.title}
              </Link>
            </h2>
            <p className="text-gray-600 mb-4">{post.description}</p>
            <p className="text-sm text-gray-500">Published on {post.date}</p>
            <Link href={`/blog/${post.slug}`} className="text-blue-600 hover:underline">
              Read more →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}