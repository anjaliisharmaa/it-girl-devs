# Updated Module Structure Template

Update your `generated-regression-module.ts` to use the new `markdownContent` property. Here's the pattern:

```typescript
import React from 'react';
import { Module } from '@/types/course';

export const regressionModule: Module = {
  'lesson-id': {
    title: 'Lesson Title',
    markdownContent: `
## Heading 2

Your markdown content here...

### Heading 3

More content with **bold** and *italic*.

- Bullet point 1
- Bullet point 2

[Link text](https://example.com)

![Image alt text](/images/path/to/image.png)

\`\`\`python
# Code block
print("Hello world")
\`\`\`

Inline \`code\` example.
`,
    content: () => React.createElement('div', {}), // Empty fallback
    metadata: {
      sipTime: '8 mins',
      difficulty: 'Beginner-Friendly',
      prerequisites: 'Basic Python',
    },
    prevLesson: undefined,
    nextLesson: 'next-lesson-id',
    datasetFile: 'dataset.csv', // Optional
  },
};
```

## Key Changes:

1. **Add `markdownContent`** - Store your raw markdown string here
2. **Keep `content` empty** - Just use `React.createElement('div', {})` for backward compatibility
3. **Use `/images/...` paths** - Not relative paths like `../../../public/images/...`
4. **No HTML needed** - Pure markdown gets parsed and styled automatically

## Markdown Features Supported:

- Headers: `# H1`, `## H2`, `### H3`, etc.
- **Bold**: `**text**`
- *Italic*: `*text*`
- Lists: `- item` or `1. item`
- Links: `[text](url)`
- Images: `![alt text](path/to/image.png)`
- Code blocks:
  ```
  \`\`\`python
  code here
  \`\`\`
  ```
- Inline code: `` `code` ``

All elements will be automatically styled with your pink color scheme (#590D22), proper spacing (2.5rem line-height), and notebook aesthetics!
