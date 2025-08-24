#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get command line arguments
const args = process.argv.slice(2);
const title = args[0];

if (!title) {
  console.error('❌ Please provide a title for your blog post');
  console.log('Usage: npm run new-post "Your Blog Post Title"');
  process.exit(1);
}

// Generate slug from title
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim();
}

// Generate current date in ISO format
function getCurrentDate() {
  return new Date().toISOString();
}

// Blog post template
function generateBlogTemplate(title, slug) {
  const currentDate = getCurrentDate();
  
  return `---
title: "${title}"
pubDate: ${currentDate}
draft: true
heroImage: "/blog-assets/${slug}/images/hero.jpg"
---

Your blog post content goes here. This is where you'll write your technical article, tutorial, or opinion piece.

## Introduction

Start with an engaging introduction that hooks the reader and explains what they'll learn.

## Main Content

Organize your content with clear headings and sections. Use:

- **Code blocks** for examples
- **Lists** for key points
- **Images** for visual explanations
- **Links** for references

\`\`\`javascript
// Example code block
function example() {
  console.log("Hello, world!");
}
\`\`\`

## Key Takeaways

- Summarize the main points
- Provide actionable insights
- Include next steps for readers

## Conclusion

Wrap up your article with a strong conclusion that reinforces the main message and encourages engagement.

---

*What are your thoughts on this topic? Feel free to reach out and let's discuss!*
`;
}

// Main function
function createNewPost() {
  const slug = generateSlug(title);
  const filename = `${slug}.mdx`;
  const contentDir = path.join(__dirname, '..', 'src', 'content', 'blog');
  const filePath = path.join(contentDir, filename);
  
  // Check if file already exists
  if (fs.existsSync(filePath)) {
    console.error(`❌ Blog post "${filename}" already exists!`);
    process.exit(1);
  }
  
  // Create content directory if it doesn't exist
  if (!fs.existsSync(contentDir)) {
    fs.mkdirSync(contentDir, { recursive: true });
  }
  
  // Create asset directories for the new post
  const assetBaseDir = path.join(__dirname, '..', 'public', 'blog-assets', slug);
  const assetDirs = ['images', 'videos', 'data'];
  
  assetDirs.forEach(dir => {
    const dirPath = path.join(assetBaseDir, dir);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  });
  
  // Generate and write the blog post
  const content = generateBlogTemplate(title, slug);
  
  try {
    fs.writeFileSync(filePath, content, 'utf8');
    
    console.log('✅ Blog post created successfully!');
    console.log('');
    console.log(`File: src/content/blog/${filename}`);
    console.log(`URL: /blog/${slug}`);
    console.log(`Assets: public/blog-assets/${slug}/`);
    console.log('');
    console.log('Asset directories created:');
    console.log(`  • public/blog-assets/${slug}/images/ - Place images here`);
    console.log(`  • public/blog-assets/${slug}/videos/ - Place videos here`);
    console.log(`  • public/blog-assets/${slug}/data/ - Place data files here`);
    console.log('');
    console.log('Next steps:');
    console.log('1. Write your content');
    console.log('2. Add assets to the created directories');
    console.log('3. Reference assets using: /blog-assets/' + slug + '/images/filename.jpg');
    console.log('4. Set draft: false when ready to publish');
    console.log('5. Commit and push to deploy automatically');
    console.log('');
    console.log(`Open the file: code src/content/blog/${filename}`);
    
  } catch (error) {
    console.error('❌ Error creating blog post:', error.message);
    process.exit(1);
  }
}

createNewPost();