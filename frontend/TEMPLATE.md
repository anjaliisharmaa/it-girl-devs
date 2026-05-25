# It-Girl Devs: Dynamic Lesson UI Design System

## The Architecture: Single Dynamic Wrapper
All lesson content is stored as Markdown strings in `courseData.ts`. The UI layer (`src/app/classroom/[moduleId]/[lessonId]/page.tsx`) acts as a "dumb pipe" that catches this Markdown, parses it using `react-markdown`, and applies our strict visual aesthetic using Tailwind CSS. 

## Visual Specifications (The PDF Aesthetic)

### 1. The Container (Already Built)
* Must retain the existing notebook paper CSS (horizontal ruled lines, vertical pink margin line on the left).
* Content must sit perfectly on the ruled lines (typically requires matching the `leading` CSS to the background line-height, e.g., `leading-[32px]`).

### 2. Typography Rules (`prose` overrides)
* **H1 / H2 (Section Headers):** Must be a deep, aesthetic maroon/burgundy (`text-[#590D22]`), bold, with ample margin-top so it breathes. No emojis unless explicitly in the text.
* **Paragraphs:** Dark gray (`text-gray-800`), clean, legible, and properly spaced.
* **Emphasis:** Bold text (`**`) should be slightly pink or a heavier font weight.

### 3. Code Blocks
* Must NOT look like default Markdown. 
* Must be intercepted by a custom renderer and styled as a dark-mode window (`bg-[#1a1a2e]`), rounded corners (`rounded-xl`), with white monospace text and generous padding (`p-4`).

### 4. The Pyxie Evaluator
* If `lesson.projectRubric` exists, the Pyxie UI must render cleanly at the absolute bottom of the notebook paper, distinctly separated from the reading content.