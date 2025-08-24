import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { extractDescription } from '../utils/extractDescription.js';

export async function GET(context) {
  const blog = await getCollection('blog');
  
  // Filter out draft posts and sort by date
  const publishedPosts = blog
    .filter(post => !post.data.draft)
    .sort((a, b) => new Date(b.data.pubDate) - new Date(a.data.pubDate));

  return rss({
    title: 'AI/ML Blog | Your Name',
    description: 'Technical insights, tutorials, and thoughts on AI/ML, software development, and emerging technologies',
    site: context.site,
    items: publishedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: extractDescription(post.body),
      link: `/blog/${post.slug}/`,
      author: 'Your Name',
    })),
    customData: `<language>en-us</language>`,
  });
}