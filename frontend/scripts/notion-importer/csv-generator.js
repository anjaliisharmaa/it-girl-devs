const fs = require('fs');
const path = require('path');

/**
 * CSV Generator module: Creates placeholder CSV files for project lessons
 * Each file gets basic headers; user populates with actual data
 */

function generateCSVStub(lessonTitle, lessonId) {
  // Generate a basic CSV with common columns
  // Adjust headers based on your needs
  const headers = ['ID', 'Feature_1', 'Feature_2', 'Feature_3', 'Target'];
  const rows = [
    headers.join(','),
    '1,10.5,20.3,5.1,100.2',
    '2,12.1,22.5,6.3,115.8',
    '3,11.8,21.2,5.9,112.4',
  ];

  return rows.join('\n') + '\n';
}

function generateCSVFile(outputDir, lessonId, lessonTitle) {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const fileName = `${lessonId}.csv`;
  const filePath = path.join(outputDir, fileName);

  // Only create if doesn't exist (don't overwrite user data)
  if (fs.existsSync(filePath)) {
    console.log(`⏭️  Skipping (already exists): ${fileName}`);
    return null;
  }

  const content = generateCSVStub(lessonTitle, lessonId);
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`✅ Created CSV stub: ${fileName}`);
  return filePath;
}

function generateAllCSVs(lessons, config, outputDir) {
  const projectLessons = lessons.filter((lesson) => config.projectLessonIds.includes(lesson.id));

  console.log(`\n📊 Generating CSV stubs for ${projectLessons.length} project lessons...`);

  const createdFiles = projectLessons.map((lesson) =>
    generateCSVFile(outputDir, lesson.id, lesson.title)
  );

  const successCount = createdFiles.filter((f) => f !== null).length;
  console.log(`✅ Generated ${successCount} CSV files`);

  return createdFiles.filter((f) => f !== null);
}

module.exports = {
  generateCSVStub,
  generateCSVFile,
  generateAllCSVs,
};
