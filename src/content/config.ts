import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    draft: z.boolean().default(false),
    heroImage: z.string().optional(),
    readingTime: z.number().optional(),
  })
});

const aboutCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    profileImage: z.string(),
    github: z.string(),
    linkedin: z.string(),
  })
});

export const collections = {
  'blog': blogCollection,
  'about': aboutCollection,
};