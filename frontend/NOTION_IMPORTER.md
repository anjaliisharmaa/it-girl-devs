# Notion Importer Guide

Automated pipeline to convert Notion course content into Next.js curriculum with **zero manual coding**.

---

## Overview

This tool automates the entire workflow:
1. **Export** course content from Notion as Markdown
2. **Parse** lesson metadata and content
3. **Generate** TypeScript module + CSV files
4. **Integrate** directly into your courseData.ts

**Result**: Professional, auto-linked lessons with AI evaluator rubrics and datasets ready to go.

---

## What Gets Generated

**`generated-regression-module.ts`** — Complete TypeScript module with all 9 lessons
**CSV files** — Placeholder datasets in `public/datasets/` (6 files for project lessons)
**Project Rubrics** — AI evaluator instructions auto-injected for coding lessons
**Navigation Links** — Prev/Next lesson connections auto-calculated

---

## Step-by-Step Setup

### Step 1: Export from Notion (5 minutes)

#### 1.1 Open Notion and prepare your content
- Navigate to your Regression module workspace
- Ensure each lesson has the following structure:

```markdown
---
title: Simple Linear Regression
sipTime: 8 mins
difficulty: First Date Energy (Beginner-Friendly)
prerequisites: Basic Python, knowing what a graph is
---

Main lesson content goes here...

## Section Heading
Content for section...

### Subsection
More content...
```

> **YAML Frontmatter Required:**
> - `title`: Exact lesson name
> - `sipTime`: Estimated reading/coding time
> - `difficulty`: Your custom difficulty level
> - `prerequisites`: What students need to know first

#### 1.2 Export each lesson as Markdown

**For each of your 9 lessons, do this:**

1. Open the lesson page in Notion
2. Click **`...`** (three dots) in the top-right
3. Select **`Export`**
4. Choose **`Markdown`** format
5. Click **`Export`**
6. Your browser downloads a `.zip` file

#### 1.3 Extract and rename files

1. Unzip the downloaded file
2. Find the main `.md` file (usually named something like `[Lesson_Name].md`)
3. Rename it to match the lesson ID format (kebab-case):
   - `Intro to Regression.md` → `intro-to-regression.md`
   - `Simple Linear Regression.md` → `simple-linear-regression.md`
   - `Multiple Linear Regression.md` → `multiple-linear-regression.md`
   - `Polynomial Regression.md` → `polynomial-regression.md`
   - `Support Vector Regression.md` → `support-vector-regression.md`
   - `Decision Tree Regression.md` → `decision-tree-regression.md`
   - `Random Forest Regression.md` → `random-forest-regression.md`
   - `Evaluating Regression Models Performance.md` → `evaluating-regression-models.md`
   - `Regression Model Selection.md` → `regression-model-selection.md`

> **List of exact file names to use:**
> ```
> intro-to-regression.md
> simple-linear-regression.md
> multiple-linear-regression.md
> polynomial-regression.md
> support-vector-regression.md
> decision-tree-regression.md
> random-forest-regression.md
> evaluating-regression-models.md
> regression-model-selection.md
> ```

---

### Step 2: Place Files in Input Directory

Navigate to your project folder:
```
frontend/scripts/notion-importer/input/
```

Copy **all 9 renamed `.md` files** into this folder.

**Expected structure:**
```
frontend/
  scripts/
    notion-importer/
      input/                              ← Files go here
        intro-to-regression.md
        simple-linear-regression.md
        multiple-linear-regression.md
        polynomial-regression.md
        support-vector-regression.md
        decision-tree-regression.md
        random-forest-regression.md
        evaluating-regression-models.md
        regression-model-selection.md
      config.json                         ← Already configured
      notion-importer.js                  ← Main script
      parser.js                           ← Parser logic
      generator.js                        ← TypeScript generator
      csv-generator.js                    ← CSV generator
```

---

### Step 3: Run the Import Script

Open your terminal in the `frontend/` directory:

```bash
npm run import-notion
```

**You should see output like:**
```
Starting Notion Importer...

Loaded config for "Regression" module

Reading from: .../scripts/notion-importer/input
Found 9 Markdown files to parse...
Successfully parsed 9 lessons

✓ Validating inputs...

Generating TypeScript module...
Generated module file: .../scripts/notion-importer/output/generated-regression-module.ts

Generating CSV stubs for 6 project lessons...
Created CSV stub: simple-linear-regression.csv
Created CSV stub: multiple-linear-regression.csv
Created CSV stub: polynomial-regression.csv
Created CSV stub: support-vector-regression.csv
Created CSV stub: decision-tree-regression.csv
Created CSV stub: random-forest-regression.csv

======================================================================
IMPORT COMPLETE!
======================================================================

Summary:
  • Lessons imported: 9
  • Project lessons: 6
  • CSV files created: 6

Generated files:
  • TypeScript module: output/generated-regression-module.ts
  • CSV datasets: public/datasets/
    - simple-linear-regression.csv
    - multiple-linear-regression.csv
    - polynomial-regression.csv
    - support-vector-regression.csv
    - decision-tree-regression.csv
    - random-forest-regression.csv

...
```

---

### Step 4: Review Generated Files

#### 4.1 Check the TypeScript module
```
frontend/scripts/notion-importer/output/generated-regression-module.ts
```

This file contains all 9 lessons as TypeScript objects. Verify:
- All lesson titles are correct
- Metadata (sipTime, difficulty, prerequisites) looks right
- 6 lessons have `projectRubric` fields (the project lessons)
- Navigation links (prevLesson/nextLesson) are correct

#### 4.2 Customize project rubrics (optional)
Each project lesson has a placeholder:
```typescript
projectRubric: 'AI Evaluator Rubric: [TODO - Add detailed instructions for evaluating Simple Linear Regression. Include acceptance criteria, code quality expectations, and test coverage requirements.]'
```

Edit these to your specific requirements, e.g.:
```typescript
projectRubric: 'AI Evaluator Rubric: Students must create a simple linear regression model with R² > 0.85. Code must include data preprocessing, visualization, and 5+ test cases. Rubric: 40% accuracy, 30% code quality, 20% visualization, 10% documentation.'
```

#### 4.3 Check CSV files
```
frontend/public/datasets/
  - simple-linear-regression.csv
  - multiple-linear-regression.csv
  - polynomial-regression.csv
  - support-vector-regression.csv
  - decision-tree-regression.csv
  - random-forest-regression.csv
```

Each has placeholder data. Open and replace with your real datasets while keeping the header row intact.

---

### Step 5: Integrate into courseData.ts

#### 5.1 Update the import in `src/data/courseData.ts`

**Before:**
```typescript
import { regressionModule } from './modules/regression';
```

**After:**
```typescript
import { regressionModule } from './modules/regression/generated-regression-module';
```

#### 5.2 Rebuild and test
```bash
npm run build
npm run dev
```

Navigate to `http://localhost:3000/classroom/regression` and verify your lessons appear with correct content!

---

### Step 6: Optional - Add More Modules

To use this pipeline for future modules (e.g., Classification, Time Series):

1. **Copy** the entire `scripts/notion-importer/` folder
2. **Rename** the copy (e.g., `notion-importer-classification/`)
3. **Update** `config.json` with your new module's lessons
4. **Run** with: `node scripts/notion-importer-classification/notion-importer.js`

Or modify `config.json` to support multiple modules at once!

---

## Troubleshooting

### "No Markdown files found"
- Verify all 9 `.md` files are in `frontend/scripts/notion-importer/input/`
- Check file names match exactly (kebab-case with `.md` extension)
- Files are case-sensitive on Linux/Mac

### "Missing lesson: [lesson-id]"
- A file is missing or misnamed
- Check the exact file name in `config.json` → `fileName` field
- Rename your exported file to match

### "YAML frontmatter not found"
- Your Notion export didn't include the metadata section
- Re-export from Notion and ensure the top section has the `---` delimiters
- Manually add if missing:
  ```
  ---
  title: Your Lesson Title
  sipTime: 5 mins
  difficulty: Your Level
  prerequisites: Prerequisites
  ---
  ```

### TypeScript compilation error after import
- Generated file might have syntax issues
- Open `scripts/notion-importer/output/generated-regression-module.ts`
- Look for unclosed quotes or braces
- Run `npm run build` for detailed error messages

---

## Advanced: Customizing the Pipeline

### Change lesson order
Edit `scripts/notion-importer/config.json` and reorder the `lessons` array. Navigation links auto-update!

### Change which lessons have projects
In `config.json`, modify the `projectLessonIds` array:
```json
"projectLessonIds": [
  "simple-linear-regression",
  "multiple-linear-regression"
]
```

### Generate custom CSV headers
Edit `scripts/notion-importer/csv-generator.js`, line ~14:
```javascript
const headers = ['ID', 'Feature_1', 'Feature_2', 'Feature_3', 'Target'];
```

---

## Support

**Issues?** Check:
1. All 9 Markdown files are in `input/` folder with exact kebab-case names
2. Each `.md` file has YAML frontmatter with `---` delimiters
3. Running from the `frontend/` directory: `npm run import-notion`
4. Node.js version 14+: `node --version`

---

## Summary

```
Notion → Markdown Export
    ↓
scripts/notion-importer/input/ (place files here)
    ↓
npm run import-notion
    ↓
TypeScript module + CSV files generated
    ↓
Update import in courseData.ts
    ↓
npm run dev
    ↓
Lessons live in your app!
```

---

Happy importing!
