const fs = require('fs');
const config = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));

// Simulate some parsed lessons (in random order)
const lessons = [
  { id: 'simple-linear-regression' },
  { id: 'intro-to-regression' },
  { id: 'polynomial-regression' },
  { id: 'multiple-linear-regression' },
  { id: 'regression-model-selection' },
  { id: 'decision-tree-regression' },
  { id: 'support-vector-regression' },
  { id: 'random-forest-regression' },
  { id: 'evaluating-regression-models' },
];

console.log('Original lessons array:');
lessons.forEach((l, i) => console.log(`  ${i+1}. ${l.id}`));

// Test the sorting logic
const lessonMap = new Map(lessons.map((l) => [l.id, l]));
const sortedLessons = config.lessons
  .map((configLesson) => lessonMap.get(configLesson.id))
  .filter((lesson) => lesson !== undefined);

console.log('\nAfter sorting to config order:');
sortedLessons.forEach((l, i) => console.log(`  ${i+1}. ${l.id}`));

console.log('\nConfig order:');
config.lessons.forEach((l, i) => console.log(`  ${i+1}. ${l.id}`));

console.log('\nAre they the same order?', JSON.stringify(sortedLessons.map(l => l.id)) === JSON.stringify(config.lessons.map(l => l.id)));
