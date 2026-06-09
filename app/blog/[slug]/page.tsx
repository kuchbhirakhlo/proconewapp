import { notFound } from 'next/navigation';
import { getPostData, getAllPostSlugs } from '@/lib/blog';
import type { Metadata } from 'next';

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = await getAllPostSlugs();
  return posts;
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await getPostData(resolvedParams.slug);

  return {
    title: post.title,
    description: post.description,
    keywords: [post.primaryKeyword, ...post.secondaryKeywords],
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      authors: [post.author],
    },
  };
}

export default async function Post({ params }: PostPageProps) {
  const resolvedParams = await params;
  const post = await getPostData(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="container mx-auto px-4 py-8 max-w-4xl">
      <header className="mb-8">
        {post.featuredImage && (
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
        )}
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <p className="text-lg text-gray-600 mb-2">{post.description}</p>
        <div className="text-sm text-gray-500">
          <span>By {post.author}</span> • <span>{post.date}</span> • <span>{post.location}</span>
        </div>
      </header>
      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
      <footer className="mt-8 pt-8 border-t">
        <div className="text-center">
          <h3 className="text-2xl font-semibold mb-4">Ready to Start Your Career in Lucknow?</h3>
          <p className="mb-4">Join Proco Computer Institute today!</p>
          <a
            href="tel:+918383811977"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Call Now
          </a>
        </div>
      </footer>
    </article>
  );
}