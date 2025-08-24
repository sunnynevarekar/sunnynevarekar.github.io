// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  integrations: [
    mdx(), 
    tailwind(),
    sitemap()
  ],
  site: 'https://sunnynevarekar.github.io',
  // Only use base path in production for GitHub Pages
  base: undefined,
  output: 'static',
  build: {
    assets: '_astro'
  }
});
