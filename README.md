# Personal Website & Blog Platform

A clean, minimal personal website and blog platform built with Astro. Designed for authentic knowledge sharing with a focus on content over features. Simple, fast, and elegant - perfect for developers and technical professionals who want to share their thoughts without distractions.

## 🌟 Features

### Content Management
- **Blog System**: Write posts in Markdown/MDX with clean, distraction-free formatting
- **Auto-Generated Descriptions**: Blog descriptions automatically extracted from content
- **MDX About Content**: Rich markdown authoring for personal content
- **Content Collections**: Type-safe schema validation
- **CLI Tools**: Generate new blog posts with templates
- **Asset Management**: Organized asset system for images and media

### Design & User Experience
- **Minimal Design**: Clean, uncluttered interface that puts content first
- **Dark Mode Support**: Toggle between light and dark themes with system preference detection
- **Mobile Navigation**: Responsive hamburger menu for mobile screens with touch-optimized interface
- **System Fonts**: Native typography for optimal performance and readability
- **Responsive Design**: Mobile-first approach with modern flexbox layouts and adaptive navigation
- **Professional Layout**: Elegant, confident design without unnecessary decorations
- **Focus on Reading**: Optimized for comfortable content consumption across all devices

### Performance & SEO
- **Static Site Generation**: Lightning-fast loading with Astro
- **SEO Optimized**: Essential meta tags and social sharing with auto-generated descriptions
- **RSS Feed**: Automatically generated for subscribers with extracted content
- **Minimal Dependencies**: System fonts and essential features only
- **Optimized Images**: Proper dimensions and loading attributes to prevent layout shift
- **Clean CSS**: Streamlined styling without redundant code or anti-patterns

### Developer Experience
- **TypeScript**: Full type safety throughout the project
- **Automated Deployment**: GitHub Actions pipeline to GitHub Pages
- **Hot Reload**: Development server with instant updates
- **Content-First Workflow**: Write and publish with minimal setup
- **Simple Asset Management**: Straightforward organization system

## Tech Stack

- **Framework**: [Astro](https://astro.build/) - Static Site Generator
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS with dark mode
- **Content**: [MDX](https://mdxjs.com/) - Markdown with React components
- **Typography**: System fonts for optimal performance
- **Theme System**: Dark/light mode with system preference detection
- **Deployment**: [GitHub Pages](https://pages.github.com/) via GitHub Actions
- **Language**: TypeScript for type safety

## Project Structure

```
personal-website/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Header.astro     # Responsive navigation header with mobile hamburger menu
│   │   ├── Footer.astro     # Copyright footer component
│   │   ├── ThemeToggle.astro # Dark/light mode toggle button
│   │   ├── ThemeScript.astro # Theme management script with mobile support
│   │   ├── SEO.astro       # SEO meta tags component
│   │   ├── HamburgerIcon.astro # Mobile hamburger menu icon
│   │   ├── CloseIcon.astro  # Mobile menu close icon
│   │   ├── GitHubIcon.astro # GitHub icon component
│   │   └── LinkedInIcon.astro # LinkedIn icon component
│   ├── content/            # Content collections
│   │   ├── about/          # About content (.mdx files)
│   │   │   └── index.mdx   # Personal content with frontmatter
│   │   ├── blog/           # Blog posts (.mdx files)
│   │   └── config.ts       # Content schema validation
│   ├── utils/              # Utility functions
│   │   └── extractDescription.js # Auto-extract descriptions from content
│   ├── pages/              # Routes (file-based routing)
│   │   ├── index.astro     # Homepage
│   │   ├── blog.astro      # Blog listing
│   │   ├── blog/[...slug].astro # Individual blog posts
│   │   └── rss.xml.js      # RSS feed
├── scripts/                # CLI tools
│   ├── new-post.js         # Blog post generator with asset management
│   └── blog-assets.js      # Asset management utilities
├── public/                 # Static assets
│   ├── blog-assets/        # Post-specific assets (organized by slug)
│   │   └── [post-slug]/    # Individual post assets
│   │       ├── images/     # Images for the post
│   │       ├── videos/     # Videos for the post
│   │       └── data/       # Data files for the post
│   ├── robots.txt          # Search engine instructions
│   ├── manifest.json       # PWA manifest
│   └── favicon.svg         # Site icon
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions deployment
└── astro.config.mjs        # Astro configuration
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd personal-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:4321`

### Build for Production

```bash
npm run build
```

The built site will be in the `dist/` directory.

## ✍️ Creating Blog Posts

### Method 1: CLI Tool (Recommended)

Generate a new blog post with proper template:

```bash
npm run new-post "Your Blog Post Title"
```

This will:
- Create a new `.mdx` file in `src/content/blog/`
- Generate SEO-friendly slug
- Add clean frontmatter template (description auto-generated from content)
- Create organized asset directories for images and media
- Provide next steps guidance

### Method 2: Manual Creation

1. Create a new file in `src/content/blog/your-post-slug.mdx`

2. Add frontmatter:
   ```markdown
   ---
   title: "Your Blog Post Title"
   pubDate: 2024-01-15T00:00:00.000Z
   draft: false # Set to true to hide from published posts
   heroImage: "/blog-assets/your-post-slug/images/hero.jpg" # Optional
   ---

   Your content goes here...
   ```

3. Write your content using Markdown or MDX

### Blog Post Guidelines

**Frontmatter Fields:**
- `title`: Post title displayed on the page (required)
- `pubDate`: Publication date in ISO format (required)
- `draft`: Boolean - hidden from site if true
- `heroImage`: Optional featured image path

**Note**: Descriptions are automatically extracted from the first paragraph of your content for SEO and social sharing.

**Content Tips:**
- Use descriptive headings (`## Section Title`)
- Include code blocks with language specification
- Add images to post-specific asset directories with captions using `<figure>` and `<figcaption>`
- Focus on clear, readable content
- Keep paragraphs concise for better flow

## Asset Management

### Organized Asset Structure

Each blog post gets its own asset directory automatically created when using `npm run new-post`:

```
public/blog-assets/
├── my-first-post/
│   ├── images/          # Images for this post only
│   │   ├── hero.jpg     # Hero/featured image
│   │   ├── diagram.png  # Content images
│   │   └── screenshot.jpg
│   ├── videos/          # Videos for this post only
│   │   └── demo.mp4
│   └── data/            # Data files for this post only
│       └── results.csv
└── another-post/
    ├── images/
    ├── videos/
    └── data/
```

### Asset Management Commands

Manage your blog assets with these CLI tools:

```bash
# List all blog posts with metadata and status
npm run blog:posts

# List all assets for a specific post
npm run blog:assets list my-post-slug

# Show asset usage statistics across all posts
npm run blog:audit

# Find and clean up orphaned asset directories
npm run blog:cleanup

# Delete a post and all its assets
npm run blog:delete my-post-slug
```

### Adding Assets to Posts

1. **Place assets in the correct directories:**
   ```bash
   # For a post with slug "my-awesome-post"
   public/blog-assets/my-awesome-post/images/diagram.png
   public/blog-assets/my-awesome-post/videos/demo.mp4
   ```

2. **Reference assets in your content:**
   
   **Basic images:**
   ```markdown
   ![System Architecture](/blog-assets/my-awesome-post/images/diagram.png)
   ```
   
   **Images with captions:**
   ```html
   <figure>
     <img src="/blog-assets/my-awesome-post/images/diagram.png" alt="System Architecture" />
     <figcaption>Complete system architecture showing data flow between components</figcaption>
   </figure>
   ```
   
   **Videos:**
   ```html
   <video controls>
     <source src="/blog-assets/my-awesome-post/videos/demo.mp4" type="video/mp4" />
   </video>
   ```

3. **Benefits of this approach:**
   - **No naming conflicts** between posts
   - **Easy cleanup** when deleting posts
   - **Clear ownership** of assets
   - **Scalable** for large numbers of posts

## Platform Customization

This platform separates content from presentation, making it easy to customize layouts, themes, and functionality while keeping the same content management system.

### Customizing Layouts

**Homepage (`src/pages/index.astro`)**:
- Modify the design, layout, and sections
- Change typography, colors, and styling  
- Add or remove content sections
- The data comes from `src/content/about/index.mdx`

**Blog Pages**:
- `src/pages/blog.astro` - Blog listing layout
- `src/pages/blog/[...slug].astro` - Individual post layout
- Customize navigation, typography, and styling
- Content comes from MDX files in `src/content/blog/`

**Adding New Pages**:
- Create new `.astro` files in `src/pages/`
- Import data from content collections or create new data files
- Use existing components or create new ones

### Theming
- Colors: Edit Tailwind classes throughout the files
- Fonts: Update font imports and CSS classes
- Layout: Modify container sizes, spacing, and grid layouts
- Components: Create reusable UI components in `src/components/`

## Managing Personal Content

Edit `src/content/about/index.mdx` to update your personal information using rich markdown:

### Frontmatter (Structured Data)
```yaml
---
name: "Your Name"
profileImage: "/images/profile.jpg"  # Required: Path to your profile image
github: "https://github.com/username"
linkedin: "https://linkedin.com/in/username"
---
```

### Markdown Content (Rich Text)
```markdown
I am a Lead Data Scientist, currently working at Company. I specialize in Generative AI, Natural Language Processing and Computer Vision.

I work at the intersection of ML research and engineering and have expertise in building zero to one ML systems.
```

**Benefits of this approach:**
- **Rich formatting**: Bold, italics, links, lists, headings
- **Natural authoring**: Write in markdown for easy editing
- **Clean presentation**: Focus on your story and expertise
- **Type-safe**: Validated through content collections schema
- **SEO optimized**: First paragraph automatically used as meta description

**Usage across the platform:**
- Homepage displays your name, title, and rich content with professional image
- Blog pages use consistent branding and navigation
- Social links appear as clean icons in the header

## 🚀 Deployment

### GitHub Pages (Automatic)

The site automatically deploys to GitHub Pages when you push to the main branch.

1. **Push your changes**
   ```bash
   git add .
   git commit -m "Add new blog post"
   git push origin main
   ```

2. **GitHub Actions will:**
   - Build the site
   - Deploy to GitHub Pages
   - Update sitemap and RSS feed

3. **Your site will be live at:**
   `https://your-username.github.io/personal-website`

### Vercel (One Command)

Deploy instantly to Vercel with a single command:

```bash
# First-time setup (links your project to Vercel)
npm run deploy:setup-vercel

# Deploy to production
npm run deploy:vercel

# Deploy to preview URL (for testing)
npm run deploy:vercel-preview
```

**Benefits:**
- ✅ **Instant deployment** - No waiting for CI/CD
- ✅ **Preview URLs** - Test changes before going live
- ✅ **Global CDN** - Fast loading worldwide
- ✅ **Custom domains** - Easy to configure

### Manual Build

1. **Build the site**
   ```bash
   npm run build
   ```

2. **Deploy the `dist/` folder** to your hosting provider

### Deployment Setup

#### GitHub Pages Setup

**For Subdirectory Hosting (`https://your-username.github.io/repo-name`):**

1. **Enable GitHub Pages**
   - Go to repository Settings > Pages
   - Source: GitHub Actions
   - The deploy workflow will handle the rest

2. **Update configuration**
   - Edit `astro.config.mjs`:
     ```js
     export default defineConfig({
       site: 'https://your-username.github.io',
       base: '/your-repo-name'
     });
     ```

**For Root Domain Hosting (`https://your-username.github.io`):**

1. **Create repository with special name**
   - Repository must be named exactly: `your-username.github.io`
   - Replace `your-username` with your actual GitHub username

2. **Update configuration**
   - Edit `astro.config.mjs`:
     ```js
     export default defineConfig({
       site: 'https://your-username.github.io',
       base: undefined  // Remove base path for root domain
     });
     ```

3. **Enable GitHub Pages**
   - Go to repository Settings > Pages
   - Source: GitHub Actions
   - GitHub will automatically serve at root domain

#### Vercel Setup

1. **Install Vercel CLI** (one-time)
   ```bash
   npm i -g vercel
   ```

2. **Link your project** (one-time)
   ```bash
   npm run deploy:setup-vercel
   ```
   Follow the prompts to connect your GitHub repo to Vercel.

3. **Deploy instantly**
   ```bash
   npm run deploy:vercel
   ```

#### Personal Information Setup

**Update personal information**
- Edit `src/content/about/index.mdx`
- Update frontmatter with your details
- Write your about content in rich markdown
- Replace placeholder content with your information

## 📝 Content Workflow

### Publishing a New Blog Post

1. **Create the post**
   ```bash
   npm run new-post "My Awesome Article"
   ```

2. **Add your assets**
   - Place images in `public/blog-assets/my-awesome-article/images/`
   - Place videos in `public/blog-assets/my-awesome-article/videos/`
   - Place data files in `public/blog-assets/my-awesome-article/data/`

3. **Edit the generated file**
   - Write your content using proper asset paths
   - Set `draft: false` when ready
   - Ensure first paragraph is engaging (used for auto-generated description)

4. **Preview locally**
   ```bash
   npm run dev
   ```
   Visit `http://localhost:4321/blog` to see your post

5. **Publish**
   ```bash
   git add .
   git commit -m "Add: My Awesome Article"
   git push origin main
   ```

6. **Verify deployment**
   - Check GitHub Actions tab for build status
   - Visit your live site to confirm
   - Use `npm run blog:audit` to verify assets are properly organized


## Configuration

### Site Configuration

Edit `astro.config.mjs`:

```js
export default defineConfig({
  site: 'https://your-domain.com',
  base: '/subdirectory', // Remove if using root domain
  integrations: [mdx(), tailwind(), sitemap()]
});
```

### SEO Configuration

Update `src/components/SEO.astro` to customize:
- Default meta tags
- Social media handles
- Analytics tracking codes

### Styling

The site uses Tailwind CSS. To customize:

1. **Colors**: Edit `tailwind.config.mjs`
2. **Fonts**: Update font imports in individual page layouts
3. **Components**: Modify files in `src/components/`

## 📱 Features Deep Dive

### Blog Features
- **Clean Listing**: Compact, scannable blog post layout optimized for reading
- **Auto-Generated Descriptions**: SEO descriptions extracted from first paragraph of content
- **Simple Organization**: Chronological post organization without complex categorization
- **Hero Image Support**: Optional featured images for visual appeal
- **Reading Time**: Automatically calculated and displayed
- **RSS Feed**: Automatically generated at `/rss.xml` with extracted descriptions
- **Minimal Design**: Content-first approach with no distractions
- **Social Navigation**: Clean GitHub/LinkedIn icons in header
- **Fast Performance**: Optimized for speed with system fonts and minimal JavaScript
- **Dark Mode**: Professional dark theme with neutral backgrounds and proper contrast

### About Page Features
- **Personal Introduction**: Clean, narrative-style about section
- **Professional Image**: Optional profile photo with elegant circular styling
- **Contact Links**: GitHub and LinkedIn integration
- **Theme Toggle**: Sun/moon icon for switching between light and dark modes
- **Mobile Navigation**: Touch-friendly hamburger menu with slide-out navigation
- **Responsive Design**: Optimized for all devices with adaptive navigation patterns

### Navigation Features
- **Desktop Navigation**: Clean horizontal navigation with dot separators (≥768px)
- **Mobile Navigation**: Responsive hamburger menu for smaller screens (<768px)
- **Touch Optimized**: Large tap targets and smooth animations on mobile
- **Theme Integration**: Theme toggle available in both desktop and mobile views
- **Accessibility**: Full keyboard support, ARIA attributes, and focus management
- **User Experience**: Click-outside-to-close, ESC key support, auto-close on navigation

### SEO Features
- **Meta Tags**: Complete Open Graph and Twitter Card support
- **Structured Data**: Schema.org markup for rich snippets
- **Sitemap**: Auto-generated XML sitemap
- **Canonical URLs**: Proper URL canonicalization
- **Performance**: Optimized Core Web Vitals

## Design Philosophy

### Authentic Personal Blogging
- **Content First**: No distracting features, tags, or complex filtering
- **Clean Aesthetics**: System fonts, minimal design, professional appearance
- **Adaptive Theming**: Seamless dark/light mode with neutral color palettes
- **Mobile-First Design**: Responsive navigation that adapts to screen size
- **Fast Performance**: Optimized for speed and readability across all devices

### Technical Excellence  
- **Type Safety**: Full TypeScript support with content schema validation
- **Modern Stack**: Astro, Tailwind CSS with dark mode, and MDX for optimal performance
- **Component Architecture**: Reusable components with proper separation of concerns
- **Developer Friendly**: Simple setup, clear structure, easy maintenance

### Focused Experience
- **Reader-Centric**: Optimized for comfortable reading and content discovery
- **Minimal Distractions**: Clean navigation, no unnecessary features
- **Professional Presence**: Elegant design suitable for technical professionals

## Resources

### Documentation
- [Astro Documentation](https://docs.astro.build/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [MDX Documentation](https://mdxjs.com/)


## Troubleshooting

### Common Issues

**Build fails with content collection errors:**
- Check frontmatter format in blog posts
- Ensure dates are in ISO format: `2024-01-15T00:00:00.000Z`
- Verify required fields are present

**Styles not loading:**
- Clear browser cache
- Check Tailwind CSS configuration
- Restart development server

**Images not displaying:**
- Ensure images are in `/public/` directory
- Use absolute paths: `/images/photo.jpg`
- Check image file extensions

**404 errors in production:**
- Verify `base` configuration in `astro.config.mjs`
- Check GitHub Pages settings
- Ensure all links use relative paths

### Development Commands

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Content Creation
npm run new-post "Title"     # Create new blog post with asset directories

# Asset Management
npm run blog:posts              # List all blog posts
npm run blog:assets list <slug>  # List assets for a post
npm run blog:audit              # Show asset usage statistics
npm run blog:cleanup            # Find orphaned assets
npm run blog:delete <slug>      # Delete post and assets
```