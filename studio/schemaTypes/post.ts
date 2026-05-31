import { defineType, defineField, defineArrayMember } from 'sanity';

/**
 * The "Blog Post" document — this is the form you fill in to publish a post.
 * Every field here maps 1:1 to what the website's build script reads.
 */
export const post = defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      description: 'The /blog/<slug> part of the URL. Click "Generate" from the title.',
      options: { source: 'title', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'Short summary shown on the blog list card (also used for SEO if no meta description).',
    }),
    defineField({
      name: 'tag',
      title: 'Tag',
      type: 'string',
      options: { list: ['TUTORIAL', 'DEEP DIVE', 'FIELD NOTE', 'GUIDE', 'NEWS'] },
      initialValue: 'TUTORIAL',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: { list: ['.NET', 'Angular', 'React', 'DevOps', 'General'] },
      initialValue: '.NET',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover image',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt text', type: 'string' })],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'readMins',
      title: 'Read time (minutes)',
      type: 'number',
      initialValue: 5,
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      description: 'Write your post here. Paste text, add images, and insert code blocks.',
      of: [
        defineArrayMember({ type: 'block' }), // rich text (headings, lists, links, bold…)
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', title: 'Alt text', type: 'string' }),
            defineField({ name: 'caption', title: 'Caption', type: 'string' }),
          ],
        }),
        defineArrayMember({ type: 'code', options: { withFilename: true } }), // code block
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: 'metaDescription', title: 'Meta description', type: 'text', rows: 2 }),
        defineField({ name: 'keywords', title: 'Keywords', type: 'string' }),
      ],
    }),
  ],
  orderings: [
    {
      title: 'Published date, newest first',
      name: 'publishedDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'category', media: 'coverImage' },
  },
});
