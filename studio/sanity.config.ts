import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { codeInput } from '@sanity/code-input';
import { schemaTypes } from './schemaTypes';

/**
 * Sanity Studio config — this IS your blog admin panel.
 * Run `npm run dev` in this folder → http://localhost:3333
 * Deploy a free hosted version with `npm run deploy` → <name>.sanity.studio
 */
export default defineConfig({
  name: 'default',
  title: 'Learn Hub Blog',

  projectId: 'wzunc2e4',
  dataset: 'production',

  plugins: [
    structureTool(), // the content editing UI
    visionTool(),    // a GROQ query playground (handy for debugging)
    codeInput(),     // adds the "Code" block type used in posts
  ],

  schema: {
    types: schemaTypes,
  },
});
