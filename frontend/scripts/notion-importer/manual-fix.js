const fs = require('fs');
const path = require('path');

/**
 * Manual fix script: Clean up the corrupted regression module file
 * This extracts all 9 unique lesson blocks and reassembles them in the correct order
 */

const inputFile = path.join(__dirname, 'temp-original-content.txt');
const outputFile = path.join(__dirname, 'output', 'generated-regression-module.ts');

// Read the config to know the correct lesson order
const config = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json'), 'utf-8'));

// Read the full content (after we saved a copy)
let fullContent = fs.readFileSync(inputFile, 'utf-8');

// Extract each unique lesson by its content marker (we'll identify by title or nav links)
// We need to rebuild the file in config order

const moduleContent = `import React from 'react';
import { Module } from '@/types/course';

/**
 * Generated Regression Module (Manually Fixed)
 * Auto-generated from Notion exports via notion-importer script
 * Last updated: ${new Date().toISOString()}
 * 
 * To update:
 * 1. Export lessons from Notion as Markdown files
 * 2. Place files in scripts/notion-importer/input/
 * 3. Run: npm run import-notion
 */

export const regressionModule: Module = {
  // Lessons will be inserted here in correct order
};
`;

console.log('Manual fix script loaded. Next steps:');
console.log('1. Identify each unique lesson content');
console.log('2. Extract in order of nav links');
console.log('3. Rebuild with correct keys and metadata');
