const fs = require('fs');
const path = require('path');

/**
 * Generator module: Creates TypeScript lesson objects and module exports
 * Generates a complete regression module file that can be integrated into courseData.ts
 */

function generateLessonObject(lesson, config, lessonIndex) {
  const isProjectLesson = config.projectLessonIds.includes(lesson.id);
  
  // Convert markdown to simple React.createElement
  const contentFn = `() => React.createElement('div', { dangerouslySetInnerHTML: { __html: \`${lesson.markdownContent}\` } })`;

  // Escape quotes in metadata
  const title = lesson.title.replace(/'/g, "\\'");
  const sipTime = lesson.metadata.sipTime.replace(/'/g, "\\'");
  const difficulty = lesson.metadata.difficulty.replace(/'/g, "\\'");
  const prerequisites = lesson.metadata.prerequisites.replace(/'/g, "\\'");

  // Determine prev/next lessons from config
  const prevLessonId = lessonIndex > 0 ? config.lessons[lessonIndex - 1].id : 'undefined';
  const nextLessonId = lessonIndex < config.lessons.length - 1 ? config.lessons[lessonIndex + 1].id : 'undefined';

  let lessonObj = `  '${lesson.id}': {
    title: '${title}',
    content: ${contentFn},
    metadata: {
      sipTime: '${sipTime}',
      difficulty: '${difficulty}',
      prerequisites: '${prerequisites}',
    },`;

  if (prevLessonId !== 'undefined') {
    lessonObj += `\n    prevLesson: '${prevLessonId}',`;
  } else {
    lessonObj += `\n    prevLesson: undefined,`;
  }

  if (nextLessonId !== 'undefined') {
    lessonObj += `\n    nextLesson: '${nextLessonId}',`;
  } else {
    lessonObj += `\n    nextLesson: undefined,`;
  }

  // Add datasetFile and projectRubric if it's a project lesson
  if (isProjectLesson) {
    // Generate dataset filename from lesson id
    const datasetFileName = `${lesson.id}.csv`;
    lessonObj += `\n    datasetFile: '${datasetFileName}',`;
    lessonObj += `\n    projectRubric: 'AI Evaluator Rubric: [TODO - Add detailed instructions for evaluating ${lesson.title}. Include acceptance criteria, code quality expectations, and test coverage requirements.]',`;
  }

  lessonObj += `\n  },`;

  return lessonObj;
}

function generateModuleFile(lessons, config) {
  const moduleId = config.moduleName;
  const moduleTitle = config.moduleTitle;

  let output = `import React from 'react';
import { Module } from '@/types/course';

/**
 * Generated Regression Module
 * Auto-generated from Notion exports via notion-importer script
 * Last updated: ${new Date().toISOString()}
 * 
 * To update:
 * 1. Export lessons from Notion as Markdown files
 * 2. Place files in scripts/notion-importer/input/
 * 3. Run: npm run import-notion
 */

export const ${moduleId}Module: Module = {
`;

  // Sort lessons to match config order
  const lessonMap = new Map(lessons.map((l) => [l.id, l]));
  const sortedLessons = config.lessons
    .map((configLesson) => lessonMap.get(configLesson.id))
    .filter((lesson) => lesson !== undefined);

  console.log(`📝 Generated ${sortedLessons.length} lessons in order:`);
  sortedLessons.forEach((lesson) => console.log(`   - ${lesson.id}`));

  // Add each lesson in correct order
  sortedLessons.forEach((lesson, index) => {
    output += generateLessonObject(lesson, config, index);
    output += '\n';
  });

  output += `};
`;

  return output;
}

function writeModuleFile(outputPath, content) {
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(outputPath, content, 'utf-8');
  console.log(`✅ Generated module file: ${outputPath}`);
  return outputPath;
}

module.exports = {
  generateLessonObject,
  generateModuleFile,
  writeModuleFile,
};
