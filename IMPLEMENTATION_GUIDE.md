# Markdown Parser Implementation Guide

## ✅ What I've Already Done

### 1. **Installed Dependencies**
- ✓ `react-markdown@9.0.1` installed

### 2. **Updated `page.tsx`** 
Updated `frontend/src/app/classroom/[moduleId]/[lessonId]/page.tsx` with:
- Import for ReactMarkdown
- 14+ custom markdown component overrides for:
  - **Headings**: h1-h4 styled with text-[#590D22], proper font sizes, and 2.5rem line height
  - **Paragraphs**: text-lg with proper leading
  - **Lists**: ul/ol/li with proper spacing
  - **Code blocks** (`pre`): Dark mode styling (#1a1a2e background, white text)
  - **Inline code**: Pink background, pink text
  - **Links**: Pink color with underline, opens external links in new tab
  - **Images**: Rounded with pink border and shadow
  - **Blockquotes**: Left border styling
  - **Tables**: Full styling with borders and pink header

- Intelligent content rendering:
  - Checks if `lesson.markdownContent` exists → renders with ReactMarkdown
  - Falls back to old `ContentComponent` for backward compatibility
  - Maintains all notebook styling (pink line, 2.5rem line height)

### 3. **Updated TypeScript Types** 
Updated `frontend/src/types/course.ts`:
- `Lesson` interface now supports optional `markdownContent?: string` property
- Kept `content` optional for backward compatibility

## 🔄 What You Need to Do

### Step 1: Update `generated-regression-module.ts`

Replace each lesson's structure from:
```typescript
content: () => React.createElement('div', { dangerouslySetInnerHTML: { __html: `## Markdown here...` } }),
```

To:
```typescript
markdownContent: `## Markdown here...`,
content: () => React.createElement('div', {}),
```

### Step 2: Fix Image Paths

Change image paths from:
```
../../../public/images/modules/regression/...
```

To:
```
/images/modules/regression/...
```

### Step 3: Reference Example

I've created `EXAMPLE_UPDATED_MODULE.ts` showing exactly how to update:
- `intro-to-regression` lesson
- `simple-linear-regression` lesson (with full code block example)

Use this as your template for updating all other lessons!

## 🎨 Styling Features Automatically Applied

When you add markdown content, it automatically gets:

✓ **Color**: Text in #590D22 (your dark purple/maroon)  
✓ **Line Height**: 2.5rem (matches notebook grid lines)  
✓ **Headings**: Proper sizing with top margins  
✓ **Code**: Dark terminal styling for blocks, inline pink styling  
✓ **Links**: Pink with underline, external links open in new tab  
✓ **Images**: Rounded corners, pink border, full width  
✓ **Lists**: Proper spacing and alignment  
✓ **Tables**: Pink headers, bordered cells  

## 📝 Markdown Syntax Cheat Sheet

```markdown
# H1 Heading
## H2 Heading
### H3 Heading

**Bold text**
*Italic text*
***Bold italic***

- Bullet list
- Item 2

1. Numbered list
2. Item 2

[Link text](https://example.com)

![Image alt](/images/path/to/image.png)

`inline code`

\`\`\`python
# Code block
print("Hello")
\`\`\`

> Blockquote

| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |
```

## 🚀 Next Steps

1. **Copy the structure** from `EXAMPLE_UPDATED_MODULE.ts`
2. **Update all lessons** in `generated-regression-module.ts` with `markdownContent`
3. **Test in browser** - Navigate to any lesson and verify markdown renders beautifully
4. **Troubleshoot images** - If images don't appear, verify paths are correct

## 🔧 Troubleshooting

**Q: I see `##` symbols on screen**
- A: The lesson still has `content` with dangerouslySetInnerHTML. Add `markdownContent` property.

**Q: Images aren't showing**
- A: Change image paths from relative (`../../../public/...`) to absolute (`/images/...`)

**Q: Styling looks wrong**
- A: Make sure `markdownContent` is a string, not JSX. The `content` property should be empty: `content: () => React.createElement('div', {})`

**Q: Code blocks don't have color**
- A: Use triple backticks with language:
  ```python
  your code here
  ```

---

**Everything is ready!** Just update your module file following the example, and your markdown will render beautifully with all the IT-GIRL aesthetic styling.
