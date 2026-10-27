// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://sabrichamtouri.com',
  // Astro 7 defaults to 'jsx', which can drop spaces between inline elements.
  compressHTML: true,
  integrations: [mdx(), sitemap({ filter: (page) => !page.endsWith('/cv/') })],
  markdown: {
    // Two code themes; global.css picks one based on the site theme.
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark-dimmed' },
      defaultColor: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
