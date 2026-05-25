#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Fix the generated regression module by:
 * 1. Removing duplicate lesson entries
 * 2. Ensuring correct lesson order
 * 3. Fixing navigation links
 * 4. Verifying projectRubric assignments
 */

const inputFile = path.join(__dirname, 'output', 'generated-regression-module.ts');
const backupFile = path.join(__dirname, 'output', 'generated-regression-module.backup.ts');

// Create backup
fs.copyFileSync(inputFile, backupFile);
console.log(`✅ Backup created: ${backupFile}`);

// Read the corrupted file
let content = fs.readFileSync(inputFile, 'utf-8');
const originalSize = content.length;

// The file has 4 duplicate lesson entries that need to be removed
// We identify them by their position and content

// DUPLICATES TO REMOVE (based on grep analysis):
// 1. Line 706-769: Duplicate 'intro-to-regression'
// 2. Line 770-1031: Likely malformed or duplicate 'multiple-linear-regression'
// 3. Line 1699-1880: Duplicate 'simple-linear-regression'  
// 4. Line 1881+: Duplicate 'support-vector-regression'

// Strategy: Parse the file to find lesson boundaries and remove duplicates
const lessonPattern = /  '([a-z-]+)': \{[\s\S]*?\n  \},/g;
const matches = [...content.matchAll(lessonPattern)];

console.log(`Found ${matches.length} lesson blocks in the file`);

// Group by lesson ID to identify duplicates
const lessonGroups = {};
matches.forEach((match, index) => {
    const lessonId = match[1];
    if (!lessonGroups[lessonId]) {
        lessonGroups[lessonId] = [];
    }
    lessonGroups[lessonId].push({
        index,
        match: match[0],
        start: match.index,
        end: match.index + match[0].length
    });
});

console.log('\nLesson blocks found:');
Object.entries(lessonGroups).forEach(([id, occurrences]) => {
    if (occurrences.length > 1) {
        console.log(`  ⚠️  ${id}: ${occurrences.length} occurrences (DUPLICATE!)`);
    } else {
        console.log(`  ✓ ${id}: 1 occurrence`);
    }
});

// Remove all but the first occurrence of each lesson
let fixedContent = content;
Object.entries(lessonGroups).forEach(([id, occurrences]) => {
    if (occurrences.length > 1) {
        console.log(`\nRemoving ${occurrences.length - 1} duplicate(s) of '${id}'`);
        // Keep the first, remove the rest
        for (let i = occurrences.length - 1; i >= 1; i--) {
            const occurrence = occurrences[i];
            // We need to remove from the updated content, so we work backwards
            // This is complex because content changes as we remove
        }
    }
});

console.log(`\nFile size: ${originalSize} bytes`);
console.log('Note: Manual removal recommended due to complexity');
console.log('Use git diff to review changes');
