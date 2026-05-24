const fs = require('fs');
const path = require('path');

/**
 * Parser module: Extracts lesson data from Markdown files
 * Expected format:
 * ---
 * title: Lesson Title
 * sipTime: 5 mins
 * difficulty: Level
 * prerequisites: Prerequisites
 * ---
 * Main content goes here in markdown format
 */

function parseFrontmatter(content) {
  // Handle both \n and \r\n line endings
  const frontmatterRegex = /^---[\r\n]+([\s\S]*?)[\r\n]+---/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    console.warn('⚠️  No frontmatter found. Using defaults.');
    return {
      title: 'Untitled Lesson',
      sipTime: 'TBD',
      difficulty: 'TBD',
      prerequisites: 'TBD',
    };
  }

  const frontmatterText = match[1];
  const metadata = {};

  // Parse YAML-style key: value pairs
  const lines = frontmatterText.split(/[\r\n]+/);
  lines.forEach((line) => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > -1) {
      const key = line.substring(0, colonIndex).trim();
      const value = line.substring(colonIndex + 1).trim().replace(/^["']|["']$/g, '');
      metadata[key] = value;
    }
  });

  return {
    title: metadata.title || 'Untitled Lesson',
    sipTime: metadata.sipTime || 'TBD',
    difficulty: metadata.difficulty || 'TBD',
    prerequisites: metadata.prerequisites || 'TBD',
  };
}

function extractContent(content) {
  // Remove frontmatter (handles both \n and \r\n line endings)
  const frontmatterRegex = /^---[\r\n]+([\s\S]*?)[\r\n]+---[\r\n]+/;
  const contentWithoutFrontmatter = content.replace(frontmatterRegex, '');
  return contentWithoutFrontmatter.trim();
}

function convertMarkdownToReactComponent(markdownContent) {
  // Escape special characters for React
  let escaped = markdownContent
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$/g, '\\$')
    .replace(/\n/g, '\\n');

  // Very basic markdown to React conversion
  escaped = escaped.replace(/^### (.+?)$/gm, '<h3>$1</h3>');
  escaped = escaped.replace(/^## (.+?)$/gm, '<h2>$1</h2>');
  escaped = escaped.replace(/^# (.+?)$/gm, '<h1>$1</h1>');

  return escaped;
}

function parseMarkdownFile(filePath, config) {
  if (!fs.existsSync(filePath)) {
    console.error(`❌ File not found: ${filePath}`);
    return null;
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  const metadata = parseFrontmatter(content);
  const markdownContent = extractContent(content);

  // Generate lesson ID from filename (kebab-case)
  const fileName = path.basename(filePath, '.md');

  // Find lesson config
  const lessonConfig = config.lessons.find((lesson) => lesson.fileName === path.basename(filePath));
  const lessonId = lessonConfig ? lessonConfig.id : fileName;

  return {
    id: lessonId,
    title: metadata.title,
    fileName: path.basename(filePath),
    metadata: {
      sipTime: metadata.sipTime,
      difficulty: metadata.difficulty,
      prerequisites: metadata.prerequisites,
    },
    markdownContent: markdownContent,
    hasProject: lessonConfig ? lessonConfig.hasProject : false,
  };
}

function parseAllLessons(inputDir, config) {
  if (!fs.existsSync(inputDir)) {
    console.error(`❌ Input directory not found: ${inputDir}`);
    return [];
  }

  const files = fs.readdirSync(inputDir).filter((file) => file.endsWith('.md'));

  console.log(`📖 Found ${files.length} Markdown files to parse...`);

  const lessons = files
    .map((file) => parseMarkdownFile(path.join(inputDir, file), config))
    .filter((lesson) => lesson !== null);

  console.log(`✅ Successfully parsed ${lessons.length} lessons`);
  return lessons;
}

module.exports = {
  parseMarkdownFile,
  parseAllLessons,
  parseFrontmatter,
  extractContent,
  convertMarkdownToReactComponent,
};
