import { defineConfig } from 'astro/config';

import compress from "astro-compress";
import compressor from 'astro-compressor';
import robotsTxt from 'astro-robots-txt';

import mdx from '@astrojs/mdx';
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [
    compress(),
    compressor(),
    mdx(),
    react(),
    robotsTxt(),
    sitemap(),
    tailwind(),
  ],
  site: 'https://twinflame.tf'
});
