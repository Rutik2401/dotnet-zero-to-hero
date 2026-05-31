import { defineCliConfig } from 'sanity/cli';

// Used by the Sanity CLI (dev / build / deploy) to know which project to target.
export default defineCliConfig({
  api: {
    projectId: 'wzunc2e4',
    dataset: 'production',
  },
});
