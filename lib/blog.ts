import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'content/blog');

export interface PostData {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  location: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  featuredImage?: string;
  contentHtml: string;
}

export async function getSortedPostsData(): Promise<PostData[]> {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = await Promise.all(
    fileNames.map(async (fileName) => {
      // Remove ".md" from file name to get id
      const slug = fileName.replace(/\.md$/, '');

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);

      // Ensure date is a string and secondaryKeywords is an array
      const data = { ...matterResult.data };
      if (data.date instanceof Date) {
        data.date = data.date.toISOString().split('T')[0];
      }
      if (typeof data.secondaryKeywords === 'string') {
        data.secondaryKeywords = data.secondaryKeywords.split(',').map((s: string) => s.trim());
      }

      // Use remark to convert markdown into HTML string
      const processedContent = await remark()
        .use(html)
        .process(matterResult.content);
      const contentHtml = processedContent.toString();

      // Combine the data with the id
      return {
        slug,
        contentHtml,
        ...(data as Omit<PostData, 'slug' | 'contentHtml'>),
      };
    })
  );
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export async function getAllPostSlugs(): Promise<{ slug: string }[]> {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => ({
    slug: fileName.replace(/\.md$/, ''),
  }));
}

export async function getPostData(slug: string): Promise<PostData> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Ensure date is a string and secondaryKeywords is an array
  const data = { ...matterResult.data };
  if (data.date instanceof Date) {
    data.date = data.date.toISOString().split('T')[0];
  }
  if (typeof data.secondaryKeywords === 'string') {
    data.secondaryKeywords = data.secondaryKeywords.split(',').map((s: string) => s.trim());
  }

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the slug
  return {
    slug,
    contentHtml,
    ...(data as Omit<PostData, 'slug' | 'contentHtml'>),
  };
}