#!/usr/bin/env node

/**
 * Notion Importer: Main Orchestrator
 * 
 * Usage: node scripts/notion-importer/notion-importer.js
 * or:    npm run import-notion
 * 
 * This script:
 * 1. Reads Notion Markdown exports from scripts/notion-importer/input/
 * 2. Parses lesson metadata and content
 * 3. Generates TypeScript module file
 * 4. Creates CSV stub files for project lessons
 * 5. Outputs integration instructions
 */

const fs = require('fs');
const path = require('path');
const parser = require('./parser');
const generator = require('./generator');
const csvGenerator = require('./csv-generator');

const SCRIPT_DIR = path.dirname(__filename);
const INPUT_DIR = path.join(SCRIPT_DIR, 'input');
const OUTPUT_DIR = path.join(SCRIPT_DIR, 'output');
const CONFIG_FILE = path.join(SCRIPT_DIR, 'config.json');
const DATASETS_DIR = path.join(SCRIPT_DIR, '..', '..', 'public', 'datasets');

function loadConfig() {
  if (!fs.existsSync(CONFIG_FILE)) {
    console.error('❌ config.json not found. Please ensure it exists in scripts/notion-importer/');
    process.exit(1);
  }

  const config = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf-8'));
  console.log(`📋 Loaded config for "${config.moduleTitle}" module`);
  return config;
}

function validateInputs(lessons, config) {
  const errors = [];

  if (lessons.length === 0) {
    errors.push('No lesson files found in input directory');
  }

  // Check that all required lessons from config were found
  const foundIds = new Set(lessons.map((l) => l.id));
  config.lessons.forEach((configLesson) => {
    if (!foundIds.has(configLesson.id)) {
      errors.push(`Missing lesson: ${configLesson.id} (${configLesson.fileName})`);
    }
  });

  if (errors.length > 0) {
    console.error('\n⚠️  Validation warnings:');
    errors.forEach((err) => console.error(`  - ${err}`));
    console.error(
      '\nℹ️  Ensure all .md files are in scripts/notion-importer/input/ with correct names from config.json'
    );
  }

  return errors.length === 0;
}

function printSummary(lessons, config, generatedModuleFile, generatedCSVs) {
  console.log('\n' + '='.repeat(70));
  console.log('✨ IMPORT COMPLETE! ✨');
  console.log('='.repeat(70));

  console.log('\n📊 Summary:');
  console.log(`  • Lessons imported: ${lessons.length}`);
  console.log(`  • Project lessons: ${lessons.filter((l) => config.projectLessonIds.includes(l.id)).length}`);
  console.log(`  • CSV files created: ${generatedCSVs.length}`);

  console.log('\n📁 Generated files:');
  console.log(`  • TypeScript module: ${path.relative(SCRIPT_DIR, generatedModuleFile)}`);

  if (generatedCSVs.length > 0) {
    console.log(`  • CSV datasets: public/datasets/`);
    generatedCSVs.forEach((csv) => {
      const fileName = path.basename(csv);
      console.log(`    - ${fileName}`);
    });
  }

  console.log('\n' + '-'.repeat(70));
  console.log('📋 NEXT STEPS:');
  console.log('-'.repeat(70));

  console.log('\n1️⃣  Review the generated TypeScript module:');
  console.log(`    ${path.relative(process.cwd(), generatedModuleFile)}`);

  console.log('\n2️⃣  Update your courseData.ts import:');
  console.log(`    Replace:   import { regressionModule } from './modules/regression';`);
  console.log(`    With:      import { regressionModule } from './modules/regression/generated-regression-module';`);

  console.log('\n3️⃣  Populate your CSV datasets:');
  console.log(`    Add real data to: public/datasets/*.csv`);
  console.log(`    Current stubs have placeholder values as examples.`);

  console.log('\n4️⃣  (Optional) Refine projectRubric fields:');
  console.log(`    Edit the generated module to customize AI evaluator instructions.`);

  console.log('\n5️⃣  Test in your app:');
  console.log(`    npm run dev`);
  console.log(`    Navigate to /classroom/regression to see your lessons.`);

  console.log('\n6️⃣  When satisfied, commit and merge:');
  console.log(`    git add scripts/notion-importer/output/`);
  console.log(`    git add public/datasets/`);
  console.log(`    git commit -m "chore: auto-import Regression module from Notion"`);

  console.log('\n' + '='.repeat(70) + '\n');
}

function main() {
  console.log('\n🚀 Starting Notion Importer...\n');

  try {
    // 1. Load configuration
    const config = loadConfig();

    // 2. Parse all Markdown files
    console.log(`\n📂 Reading from: ${INPUT_DIR}`);
    const lessons = parser.parseAllLessons(INPUT_DIR, config);

    if (lessons.length === 0) {
      console.error('❌ No lessons were parsed. Check your Markdown files and try again.');
      process.exit(1);
    }

    console.log(`\n📖 Parsed lessons (in parse order):`);
    lessons.forEach((l, i) => console.log(`   ${i+1}. ${l.id}`));

    // 3. Validate inputs
    console.log('\n✓ Validating inputs...');
    validateInputs(lessons, config);

    // 4. Generate TypeScript module
    console.log('\n📝 Generating TypeScript module...');
    const moduleContent = generator.generateModuleFile(lessons, config);
    const moduleOutputPath = path.join(OUTPUT_DIR, `generated-${config.moduleName}-module.ts`);
    generator.writeModuleFile(moduleOutputPath, moduleContent);

    // 5. Generate CSV files
    console.log('\n');
    csvGenerator.generateAllCSVs(lessons, config, DATASETS_DIR);

    // 6. Print summary and next steps
    const generatedCSVs = lessons
      .filter((l) => config.projectLessonIds.includes(l.id))
      .map((l) => path.join(DATASETS_DIR, `${l.id}.csv`))
      .filter((f) => fs.existsSync(f));

    printSummary(lessons, config, moduleOutputPath, generatedCSVs);
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    if (process.env.DEBUG) {
      console.error(error);
    }
    process.exit(1);
  }
}

main();
