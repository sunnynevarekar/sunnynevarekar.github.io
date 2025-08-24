#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const command = process.argv[2];
const postSlug = process.argv[3];

// Helper functions
function getPostAssetDir(slug) {
  return path.join(__dirname, '..', 'public', 'blog-assets', slug);
}

function getPostPath(slug) {
  return path.join(__dirname, '..', 'src', 'content', 'blog', `${slug}.mdx`);
}

function getAllPosts() {
  const blogDir = path.join(__dirname, '..', 'src', 'content', 'blog');
  return fs.readdirSync(blogDir)
    .filter(file => file.endsWith('.mdx'))
    .map(file => file.replace('.mdx', ''));
}

function getAllAssetDirs() {
  const assetsDir = path.join(__dirname, '..', 'public', 'blog-assets');
  if (!fs.existsSync(assetsDir)) return [];
  return fs.readdirSync(assetsDir).filter(item => {
    return fs.statSync(path.join(assetsDir, item)).isDirectory();
  });
}

// Command: List assets for a specific post
function listAssets(slug) {
  if (!slug) {
    console.error('❌ Please provide a post slug');
    console.log('Usage: npm run blog:assets list <post-slug>');
    return;
  }

  const assetDir = getPostAssetDir(slug);
  
  if (!fs.existsSync(assetDir)) {
    console.log(`No assets directory found for: ${slug}`);
    return;
  }

  console.log(`Assets for: ${slug}`);
  console.log(`Directory: ${assetDir.replace(__dirname + '/..', '')}`);
  console.log('');

  const subdirs = ['images', 'videos', 'data'];
  subdirs.forEach(subdir => {
    const subdirPath = path.join(assetDir, subdir);
    if (fs.existsSync(subdirPath)) {
      const files = fs.readdirSync(subdirPath);
      console.log(`${subdir}/`);
      if (files.length === 0) {
        console.log('  (empty)');
      } else {
        files.forEach(file => {
          const filePath = path.join(subdirPath, file);
          const stats = fs.statSync(filePath);
          const size = (stats.size / 1024).toFixed(1);
          console.log(`  ${file} (${size}KB)`);
        });
      }
      console.log('');
    }
  });
}

// Command: Clean up orphaned assets
function cleanupOrphans() {
  const posts = getAllPosts();
  const assetDirs = getAllAssetDirs();
  
  const orphanedDirs = assetDirs.filter(dir => !posts.includes(dir));
  
  if (orphanedDirs.length === 0) {
    console.log('✅ No orphaned asset directories found');
    return;
  }

  console.log(`Found ${orphanedDirs.length} orphaned asset directories:`);
  console.log('');

  orphanedDirs.forEach(dir => {
    const assetDir = getPostAssetDir(dir);
    console.log(`${dir}`);
    
    // List files in the orphaned directory
    const subdirs = ['images', 'videos', 'data'];
    let totalFiles = 0;
    
    subdirs.forEach(subdir => {
      const subdirPath = path.join(assetDir, subdir);
      if (fs.existsSync(subdirPath)) {
        const files = fs.readdirSync(subdirPath);
        totalFiles += files.length;
        if (files.length > 0) {
          console.log(`  ${subdir}: ${files.join(', ')}`);
        }
      }
    });
    
    if (totalFiles === 0) {
      console.log('  (empty directory)');
    }
    console.log('');
  });

  console.log('🗑️  To remove these directories, run:');
  orphanedDirs.forEach(dir => {
    console.log(`rm -rf public/blog-assets/${dir}`);
  });
}

// Command: Audit all assets
function auditAssets() {
  const posts = getAllPosts();
  console.log(`Asset Audit Report`);
  console.log(`Posts: ${posts.length}`);
  console.log('');

  let totalAssets = 0;
  let totalSize = 0;

  posts.forEach(slug => {
    const assetDir = getPostAssetDir(slug);
    if (!fs.existsSync(assetDir)) {
      console.log(`⚠️  ${slug}: No asset directory`);
      return;
    }

    let postAssets = 0;
    let postSize = 0;

    const subdirs = ['images', 'videos', 'data'];
    subdirs.forEach(subdir => {
      const subdirPath = path.join(assetDir, subdir);
      if (fs.existsSync(subdirPath)) {
        const files = fs.readdirSync(subdirPath);
        files.forEach(file => {
          const filePath = path.join(subdirPath, file);
          const stats = fs.statSync(filePath);
          postAssets++;
          postSize += stats.size;
        });
      }
    });

    totalAssets += postAssets;
    totalSize += postSize;

    if (postAssets === 0) {
      console.log(`${slug}: No assets`);
    } else {
      console.log(`${slug}: ${postAssets} assets (${(postSize / 1024 / 1024).toFixed(1)}MB)`);
    }
  });

  console.log('');
  console.log(`Summary:`);
  console.log(`   Total assets: ${totalAssets}`);
  console.log(`   Total size: ${(totalSize / 1024 / 1024).toFixed(1)}MB`);
  console.log(`   Average per post: ${(totalAssets / posts.length).toFixed(1)} assets`);
}

// Command: List all blog posts
function listPosts() {
  const posts = getAllPosts();
  
  if (posts.length === 0) {
    console.log('No blog posts found');
    return;
  }

  console.log(`All Blog Posts (${posts.length} total)`);
  console.log('');

  posts.forEach(slug => {
    const postPath = getPostPath(slug);
    const assetDir = getPostAssetDir(slug);
    
    // Read post metadata
    try {
      const content = fs.readFileSync(postPath, 'utf8');
      const frontmatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---/);
      
      let title = slug;
      let draft = false;
      let category = '';
      
      if (frontmatterMatch) {
        const frontmatter = frontmatterMatch[1];
        const titleMatch = frontmatter.match(/title:\s*["']([^"']+)["']/);
        const draftMatch = frontmatter.match(/draft:\s*(true|false)/);
        const categoryMatch = frontmatter.match(/category:\s*["']([^"']+)["']/);
        
        if (titleMatch) title = titleMatch[1];
        if (draftMatch) draft = draftMatch[1] === 'true';
        if (categoryMatch) category = categoryMatch[1];
      }

      // Count assets
      let assetCount = 0;
      if (fs.existsSync(assetDir)) {
        const subdirs = ['images', 'videos', 'data'];
        subdirs.forEach(subdir => {
          const subdirPath = path.join(assetDir, subdir);
          if (fs.existsSync(subdirPath)) {
            assetCount += fs.readdirSync(subdirPath).length;
          }
        });
      }

      // Status indicators
      const statusIcons = [];
      if (draft) statusIcons.push('DRAFT');
      
      const status = statusIcons.length > 0 ? ` (${statusIcons.join(', ')})` : '';
      const assets = assetCount > 0 ? ` • ${assetCount} assets` : '';

      console.log(`${slug}`);
      console.log(`   Title: ${title}${status}`);
      if (category) console.log(`   Category: ${category}`);
      if (assets) console.log(`   Assets: ${assetCount} files`);
      console.log('');
      
    } catch (error) {
      console.log(`${slug} (error reading metadata)`);
      console.log('');
    }
  });
}

// Command: Delete post and assets
function deletePost(slug) {
  if (!slug) {
    console.error('❌ Please provide a post slug');
    console.log('Usage: npm run blog:delete <post-slug>');
    return;
  }

  const postPath = getPostPath(slug);
  const assetDir = getPostAssetDir(slug);

  if (!fs.existsSync(postPath)) {
    console.error(`❌ Post not found: ${slug}`);
    return;
  }

  console.log(`🗑️  Deleting post: ${slug}`);
  
  // Delete the post file
  fs.unlinkSync(postPath);
  console.log(`   ✅ Deleted: src/content/blog/${slug}.mdx`);

  // Delete asset directory if it exists
  if (fs.existsSync(assetDir)) {
    fs.rmSync(assetDir, { recursive: true, force: true });
    console.log(`   ✅ Deleted: public/blog-assets/${slug}/`);
  } else {
    console.log(`   ℹ️  No assets directory to delete`);
  }

  console.log('');
  console.log('✅ Post and assets deleted successfully!');
}

// Main command router
function main() {
  switch (command) {
    case 'list':
      listAssets(postSlug);
      break;
    case 'posts':
      listPosts();
      break;
    case 'cleanup':
      cleanupOrphans();
      break;
    case 'audit':
      auditAssets();
      break;
    case 'delete':
      deletePost(postSlug);
      break;
    default:
      console.log('Blog Asset Management');
      console.log('');
      console.log('Available commands:');
      console.log('  posts          - List all blog posts with metadata');
      console.log('  list <slug>    - List all assets for a specific post');
      console.log('  cleanup        - Find and list orphaned asset directories');
      console.log('  audit          - Show asset usage statistics');
      console.log('  delete <slug>  - Delete a post and all its assets');
      console.log('');
      console.log('Examples:');
      console.log('  npm run blog:assets posts');
      console.log('  npm run blog:assets list my-post-slug');
      console.log('  npm run blog:assets cleanup');
      console.log('  npm run blog:assets audit');
      console.log('  npm run blog:assets delete my-post-slug');
  }
}

main();