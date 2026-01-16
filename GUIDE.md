# 🎀 it-girl devs - Complete Development Guide

> **Your step-by-step roadmap to building the most aesthetic ML learning platform**

---

## 📋 Table of Contents

1. [Development Phases](#-development-phases)
2. [Frontend Folder Structure](#-frontend-folder-structure-detailed)
3. [Backend Folder Structure](#-backend-folder-structure-detailed)
4. [Where Images Go](#-where-images-go)
5. [Your Coding Order](#-your-coding-order-the-actual-steps)
6. [Branch Strategy](#-branch-strategy)
7. [Environment Setup](#-environment-setup)
8. [Tech Stack Deep Dive](#-tech-stack-deep-dive)
9. [Pro Tips](#-pro-tips)

---

## 🎯 Development Phases

### **Phase 1: Frontend Foundation** (Start Here!)
Build your UI structure first while content is being prepared in Notion.

**Goal:** Create a beautiful, responsive homepage and module template.

### **Phase 2: Backend API**
Once UI is ready, build the backend to power your features.

**Goal:** Create the "Grade My Vibe" auto-grader with Gemini API.

### **Phase 3: Integration**
Connect frontend to backend and add Supabase.

**Goal:** Make everything work together seamlessly.

### **Phase 4: Content & Polish**
Import Notion content and add final touches.

**Goal:** Launch-ready aesthetic experience.

---

## 📁 Frontend Folder Structure (Detailed)

```
frontend/
├── src/                           # Source code
│   ├── app/                       # Next.js 14 App Router (Pages)
│   │   ├── layout.tsx             # Root layout - Global HTML structure
│   │   ├── page.tsx               # Homepage (/)
│   │   ├── globals.css            # Global styles + Tailwind imports
│   │   │
│   │   ├── modules/               # Module pages
│   │   │   ├── layout.tsx         # Shared layout for all modules
│   │   │   ├── page.tsx           # Modules listing page
│   │   │   ├── linear-regression/ 
│   │   │   │   └── page.tsx       # "The First Date" module
│   │   │   ├── cnns/
│   │   │   │   └── page.tsx       # "Chihuahua or Muffin" module
│   │   │   └── [slug]/            # Dynamic module pages
│   │   │       └── page.tsx
│   │   │
│   │   └── grader/                # Auto-grader standalone page
│   │       └── page.tsx           # "Grade My Vibe" interface
│   │
│   ├── components/                # Reusable components
│   │   ├── ui/                    # Basic UI elements
│   │   │   ├── Button.tsx         # Custom button (pink aesthetic)
│   │   │   ├── Card.tsx           # Glassmorphism cards
│   │   │   ├── Input.tsx          # Custom input fields
│   │   │   ├── Modal.tsx          # Popup modals
│   │   │   └── Badge.tsx          # Tags/labels
│   │   │
│   │   ├── layout/                # Layout components
│   │   │   ├── Navbar.tsx         # Top navigation bar
│   │   │   ├── Footer.tsx         # Footer section
│   │   │   └── Sidebar.tsx        # Side navigation (optional)
│   │   │
│   │   ├── modules/               # Module-specific components
│   │   │   ├── CodeEditor.tsx     # Code input area
│   │   │   ├── ModuleCard.tsx     # Module preview cards
│   │   │   ├── LessonContent.tsx  # Lesson text display
│   │   │   └── ProgressBar.tsx    # Progress indicator
│   │   │
│   │   └── grader/                # Grader-specific components
│   │       ├── GraderForm.tsx     # Code submission form
│   │       ├── FeedbackCard.tsx   # Gemini response display
│   │       └── ScoreDisplay.tsx   # Score visualization
│   │
│   ├── lib/                       # Utilities & helpers
│   │   ├── supabase.ts            # Supabase client initialization
│   │   ├── api.ts                 # Backend API calls
│   │   ├── utils.ts               # Helper functions
│   │   └── constants.ts           # App constants
│   │
│   └── types/                     # TypeScript types
│       ├── module.ts              # Module data types
│       ├── user.ts                # User types
│       └── grader.ts              # Grader response types
│
├── public/                        # Static assets (NO PROCESSING)
│   ├── images/
│   │   ├── hero/                  # Homepage images
│   │   │   ├── banner.png         # Main hero banner
│   │   │   └── background.svg     # Hero background pattern
│   │   │
│   │   ├── modules/               # Module illustrations
│   │   │   ├── linear-regression.svg
│   │   │   ├── cnns.svg
│   │   │   └── neural-networks.svg
│   │   │
│   │   ├── icons/                 # Custom icons
│   │   │   ├── sparkle.svg
│   │   │   ├── heart.svg
│   │   │   └── code.svg
│   │   │
│   │   └── backgrounds/           # Decorative backgrounds
│   │       ├── pink-gradient.png
│   │       └── glassmorphism-texture.png
│   │
│   ├── fonts/                     # Custom web fonts (optional)
│   │   └── CustomFont.woff2
│   │
│   └── favicon.ico                # Browser tab icon
│
├── tailwind.config.ts             # Tailwind CSS configuration
├── next.config.js                 # Next.js configuration
├── tsconfig.json                  # TypeScript configuration
├── package.json                   # Dependencies
└── .env.local                     # Environment variables (CREATE THIS!)
```

### **What Goes Where (Frontend)**

| File Type | Location | Example |
|-----------|----------|---------|
| **Pages** | `src/app/` | Homepage, Module pages |
| **Reusable Components** | `src/components/` | Buttons, Cards, Navbar |
| **API Calls** | `src/lib/api.ts` | `fetch()` to backend |
| **Static Images** | `public/images/` | Logos, illustrations |
| **Styles** | `src/app/globals.css` | Tailwind + custom CSS |
| **Types** | `src/types/` | TypeScript interfaces |

---

## 🗂️ Backend Folder Structure (Detailed)

```
backend/
├── app/                           # Main application code
│   ├── main.py                    # FastAPI entry point (run this!)
│   │
│   ├── api/                       # API endpoints (routes)
│   │   ├── __init__.py
│   │   ├── grader.py              # POST /api/grade (main feature!)
│   │   ├── modules.py             # GET /api/modules (module data)
│   │   ├── health.py              # GET /health (server check)
│   │   └── auth.py                # Authentication (optional for now)
│   │
│   ├── models/                    # Database schemas (Pydantic)
│   │   ├── __init__.py
│   │   ├── user.py                # User model
│   │   ├── submission.py          # Code submission model
│   │   └── module.py              # Module metadata model
│   │
│   ├── services/                  # Business logic
│   │   ├── __init__.py
│   │   ├── gemini_service.py      # Gemini API calls
│   │   ├── supabase_service.py    # Database operations
│   │   └── code_validator.py      # Code safety checks
│   │
│   ├── core/                      # Configuration
│   │   ├── __init__.py
│   │   ├── config.py              # Settings (env variables)
│   │   ├── prompts.py             # Gemini prompts (bestie tone!)
│   │   └── security.py            # API keys, CORS
│   │
│   └── utils/                     # Helper functions
│       ├── __init__.py
│       └── helpers.py             # Utility functions
│
├── tests/                         # Unit tests (later)
│   ├── test_grader.py
│   └── test_api.py
│
├── venv/                          # Python virtual environment
├── requirements.txt               # Python dependencies
├── .env                           # Environment variables (CREATE THIS!)
└── .env.example                   # Template for .env
```

### **What Goes Where (Backend)**

| File Type | Location | Purpose |
|-----------|----------|---------|
| **API Endpoints** | `app/api/` | Handle HTTP requests |
| **Gemini Integration** | `app/services/gemini_service.py` | Call AI API |
| **Database Logic** | `app/services/supabase_service.py` | CRUD operations |
| **Data Models** | `app/models/` | Define data structure |
| **Prompts** | `app/core/prompts.py` | Store AI prompts |
| **Config** | `app/core/config.py` | Load env variables |

---

## 📸 Where Images Go

### **Static Images (Illustrations, Logos, Icons)**

**Location:** `frontend/public/images/`

**Examples:**
```
public/images/hero/main-banner.png          → Homepage hero image
public/images/modules/linear-regression.svg → Module illustration
public/images/icons/sparkle.svg             → Decorative icon
public/images/backgrounds/pink-gradient.png → Background texture
```

**How to Use in Code:**
```tsx
// In your React component
<Image src="/images/hero/main-banner.png" alt="it-girl devs" width={800} height={200} />

// Or with plain img tag
<img src="/images/icons/sparkle.svg" alt="sparkle" />
```

**Best Practices:**
- ✅ Use **SVG** for icons and illustrations (scalable, small file size)
- ✅ Use **PNG** for photos with transparency
- ✅ Use **WebP** for optimized photos (smaller than JPEG)
- ✅ Compress images before adding (use TinyPNG.com)
- ✅ Name files descriptively: `linear-regression-hero.png` not `image1.png`

### **Dynamic Images (User Uploads, Profile Pictures)**

**Location:** **Supabase Storage** (NOT in your repo!)

**Why?** User-generated content should be stored in a database/cloud, not Git.

**How to Upload:**
```typescript
// In your frontend code
const { data, error } = await supabase.storage
  .from('avatars')
  .upload('user-123.png', file);
```

---

## 🎯 Your Coding Order (The Actual Steps)

### **Week 1: Frontend Foundation** ✨

**Branch:** `feature/frontend-setup`

#### Day 1-2: Setup & Configuration
1. Create folder structure (`src/`, `components/`, `public/`)
2. Setup `tailwind.config.ts` with pink/purple colors
3. Create `src/app/globals.css` with custom styles
4. Test with `npm run dev` → Should see blank Next.js page

#### Day 3-4: Homepage
1. Create `src/app/page.tsx` (Homepage)
   - Hero section with banner image
   - "The Vibe" intro section
   - Features grid (3 cards)
2. Create `src/components/layout/Navbar.tsx`
3. Create `src/components/ui/Button.tsx` (pink button!)
4. Add images to `public/images/hero/`

#### Day 5-7: Styling & Polish
1. Add Framer Motion animations
2. Create glassmorphism card component
3. Make it responsive (mobile-friendly)
4. Add loading states

---

### **Week 2: Module Pages** 💻

**Branch:** `feature/modules`

#### Day 1-3: Module Template
1. Create `src/app/modules/page.tsx` (modules listing)
2. Create `src/components/modules/ModuleCard.tsx`
3. Create one sample module page:
   - `src/app/modules/linear-regression/page.tsx`
   - Include: Title, description, image, "Start" button

#### Day 4-5: Code Editor Component
1. Install `@uiw/react-codemirror`
   ```bash
   npm install @uiw/react-codemirror @codemirror/lang-python
   ```
2. Create `src/components/modules/CodeEditor.tsx`
3. Add syntax highlighting for Python
4. Add "Grade My Vibe" button

#### Day 6-7: Module Content Layout
1. Create content sections (lesson text, examples)
2. Add progress indicators
3. Test navigation between modules

---

### **Week 3: Backend Setup** 🔌

**Branch:** `feature/backend-api`

#### Day 1-2: FastAPI Basics
1. Create `backend/app/main.py`:
   ```python
   from fastapi import FastAPI
   app = FastAPI(title="it-girl devs API")
   
   @app.get("/health")
   def health_check():
       return {"status": "aesthetic ✨"}
   ```
2. Test: `uvicorn app.main:app --reload`
3. Visit `http://localhost:8000/docs` (auto-generated docs!)

#### Day 3-4: Gemini Service
1. Create `backend/app/services/gemini_service.py`
2. Write function to call Gemini API:
   ```python
   async def grade_code(code: str, module: str):
       # Call Gemini API
       # Return feedback
   ```
3. Test with sample code

#### Day 5-6: Grader Endpoint
1. Create `backend/app/api/grader.py`:
   ```python
   @router.post("/grade")
   async def grade_submission(code: str, module: str):
       feedback = await gemini_service.grade_code(code, module)
       return {"feedback": feedback}
   ```
2. Test with Postman/Thunder Client

#### Day 7: Prompts & Tone
1. Create `backend/app/core/prompts.py`
2. Write the "bestie tone" prompt:
   ```python
   GRADER_PROMPT = """
   You are a supportive coding bestie reviewing this Python code.
   Be encouraging, use emojis, and explain errors like you're 
   texting a friend. No condescending "bro-talk" allowed!
   """
   ```

---

### **Week 4: Integration** 🔗

**Branch:** `feature/integration`

#### Day 1-2: API Utilities
1. Create `frontend/src/lib/api.ts`:
   ```typescript
   export async function gradeCode(code: string, module: string) {
     const response = await fetch('http://localhost:8000/api/grade', {
       method: 'POST',
       body: JSON.stringify({ code, module })
     });
     return response.json();
   }
   ```

#### Day 3-4: Connect Grader
1. Update "Grade My Vibe" button to call API
2. Create `src/components/grader/FeedbackCard.tsx`
3. Display Gemini response in a modal

#### Day 5-6: Supabase Integration
1. Setup Supabase project
2. Create tables: `users`, `submissions`
3. Add authentication (optional)

#### Day 7: Testing & Bug Fixes
1. Test all features end-to-end
2. Fix CORS issues (if any)
3. Add error handling

---

### **Week 5: Content & Launch** 🚀

**Branch:** `feature/content`

#### Day 1-3: Import Content
1. Export content from Notion as Markdown
2. Convert to TypeScript objects or MDX files
3. Import into module pages

#### Day 4-5: Final Polish
1. Add all images/illustrations
2. Animations and transitions
3. Loading states and error messages

#### Day 6-7: Deployment Prep
1. Build production version: `npm run build`
2. Test production build locally
3. Prepare for Vercel deployment

---

## 🌿 Branch Strategy

```bash
main                    # ✅ Foundation only (clean structure)
  ├── feature/frontend-setup   # Homepage, Navbar, basic UI
  ├── feature/modules          # Module pages, code editor
  ├── feature/backend-api      # FastAPI, Gemini integration
  ├── feature/integration      # Connect frontend to backend
  └── feature/content          # Add Notion content
```

### **How to Use Branches:**

```bash
# Create a new branch
git checkout -b feature/frontend-setup

# Work on your feature...

# Commit your changes
git add .
git commit -m "✨ Added homepage with hero section"

# Push to GitHub
git push origin feature/frontend-setup

# Merge back to main when ready
git checkout main
git merge feature/frontend-setup
```

---

## 🔐 Environment Setup

### **Frontend Environment Variables**

**File:** `frontend/.env.local` (CREATE THIS - it's in .gitignore)

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Backend API
NEXT_PUBLIC_API_URL=http://localhost:8000

# App Settings
NEXT_PUBLIC_APP_NAME=it-girl devs
```

### **Backend Environment Variables**

**File:** `backend/.env` (CREATE THIS - it's in .gitignore)

```bash
# Gemini AI
GEMINI_API_KEY=your-gemini-api-key-here

# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-service-role-key

# App Config
ENVIRONMENT=development
DEBUG=True
SECRET_KEY=your-super-secret-key-change-this

# CORS (allow frontend)
ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```

### **Where to Get API Keys:**

| Service | URL | Notes |
|---------|-----|-------|
| **Gemini API** | https://makersuite.google.com/app/apikey | Free tier: 60 requests/min |
| **Supabase** | https://supabase.com/dashboard | Free tier: Unlimited projects |

---

## 🛠️ Tech Stack Deep Dive

### **Frontend (Next.js)**

**Why Next.js?**
- ✅ React-based (easy to learn)
- ✅ Built-in routing (no React Router needed)
- ✅ Server-side rendering (SEO-friendly)
- ✅ Image optimization (auto-compress images!)

**Key Files:**
- `src/app/layout.tsx` → Wraps all pages (add Navbar here)
- `src/app/page.tsx` → Homepage
- `src/app/modules/page.tsx` → Modules listing page

**Useful Commands:**
```bash
npm run dev       # Start development server (http://localhost:3000)
npm run build     # Create production build
npm run start     # Run production build locally
npm run lint      # Check for code issues
```

---

### **Styling (Tailwind CSS)**

**Why Tailwind?**
- ✅ Utility-first (no need to write CSS files!)
- ✅ Responsive by default
- ✅ Highly customizable

**Example Component:**
```tsx
export function Button({ children }) {
  return (
    <button className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full transition-all">
      {children}
    </button>
  );
}
```

**Custom Pink Theme:**
Edit `tailwind.config.ts`:
```typescript
theme: {
  extend: {
    colors: {
      'it-girl': {
        pink: '#FF69B4',
        purple: '#DDA0DD',
        cream: '#FFF5EE',
      },
    },
  },
}
```

Use in components: `className="bg-it-girl-pink"`

---

### **Animations (Framer Motion)**

**Why Framer Motion?**
- ✅ Smooth animations with simple API
- ✅ Gesture support (drag, hover)
- ✅ Works great with React

**Example:**
```tsx
import { motion } from 'framer-motion';

export function Card() {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring" }}
      className="bg-white p-6 rounded-lg"
    >
      Content here
    </motion.div>
  );
}
```

---

### **Backend (FastAPI)**

**Why FastAPI?**
- ✅ Fast (as fast as Node.js!)
- ✅ Auto-generated API docs
- ✅ Built-in validation
- ✅ Async support (perfect for AI APIs)

**Starting the Server:**
```bash
cd backend
.\venv\Scripts\activate  # Activate virtual environment
uvicorn app.main:app --reload  # Start server with hot reload
```

Visit `http://localhost:8000/docs` to see interactive API documentation!

---

### **AI (Google Gemini)**

**Why Gemini?**
- ✅ Free tier (60 requests/minute)
- ✅ Multimodal (text + images)
- ✅ Fast response times
- ✅ Good at coding tasks

**Basic Usage:**
```python
import google.generativeai as genai

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel('gemini-1.5-pro')

response = model.generate_content(f"Review this code: {code}")
print(response.text)
```

---

### **Database (Supabase)**

**Why Supabase?**
- ✅ PostgreSQL (powerful SQL database)
- ✅ Real-time subscriptions
- ✅ Built-in authentication
- ✅ File storage
- ✅ Free tier (500MB database)

**Setup:**
1. Create project at supabase.com
2. Create tables (users, submissions)
3. Get API keys from Settings → API

**Basic Usage:**
```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Insert data
const { data, error } = await supabase
  .from('submissions')
  .insert({ code: "print('hello')", score: 95 });
```

---

## 💡 Pro Tips

### **Development Workflow**

1. **Always work in branches** (not main!)
2. **Commit often** with descriptive messages
3. **Test before merging** to main
4. **Use VS Code extensions:**
   - Tailwind CSS IntelliSense
   - ES7+ React snippets
   - Python extension
   - Prettier (code formatter)

### **Code Organization**

- ✅ **One component per file**
- ✅ **Name files same as component:** `Button.tsx` exports `Button`
- ✅ **Group related files:** All buttons in `components/ui/`
- ✅ **Use TypeScript types:** Create interfaces in `types/`

### **Performance**

- ✅ **Optimize images** before adding (TinyPNG.com)
- ✅ **Use Next.js `<Image>`** component (auto-optimization!)
- ✅ **Lazy load components** with `React.lazy()`
- ✅ **Minimize API calls** (cache when possible)

### **Debugging**

**Frontend:**
- Use browser DevTools (F12)
- Check Console tab for errors
- Use React DevTools extension

**Backend:**
- Check terminal where server is running
- Visit `/docs` endpoint for API testing
- Use `print()` statements (remove later!)

### **Content from Notion**

**Option 1: Export as Markdown**
1. Export each lesson from Notion as Markdown
2. Save in `docs/modules/linear-regression.md`
3. Import in your page component

**Option 2: Use Notion API** (Advanced)
1. Connect to Notion API
2. Fetch content dynamically
3. Render with a Markdown parser

**Recommendation:** Start with Option 1 (simpler!)

---

## 🎀 Quick Reference Commands

### **Frontend:**
```bash
cd frontend
npm install              # Install dependencies
npm run dev              # Start dev server (localhost:3000)
npm run build            # Build for production
npm run start            # Run production build
```

### **Backend:**
```bash
cd backend
.\venv\Scripts\activate  # Activate virtual environment (Windows)
pip install -r requirements.txt  # Install dependencies
uvicorn app.main:app --reload    # Start server (localhost:8000)
```

### **Git:**
```bash
git status                          # Check changes
git add .                           # Stage all changes
git commit -m "✨ Message"          # Commit with message
git push origin branch-name         # Push to GitHub
git checkout -b feature/name        # Create new branch
git checkout main                   # Switch to main
git merge feature/name              # Merge branch into current
```

---

## 📚 Resources

### **Documentation:**
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [FastAPI Docs](https://fastapi.tiangolo.com/)
- [Gemini API Docs](https://ai.google.dev/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)

### **Learning:**
- [Next.js Tutorial](https://nextjs.org/learn)
- [Tailwind Components](https://tailwindui.com/components)
- [FastAPI Tutorial](https://fastapi.tiangolo.com/tutorial/)

### **Design Inspiration:**
- [Dribbble](https://dribbble.com) - UI inspiration
- [Awwwards](https://www.awwwards.com) - Web design
- [CodePen](https://codepen.io) - Frontend examples

---

## ✅ Your Next Steps

1. ✅ **Read this guide thoroughly**
2. ✅ **Create a new branch:** `git checkout -b feature/frontend-setup`
3. ✅ **Start with folder structure** (ask me to create it!)
4. ✅ **Build the homepage** (most important first impression)
5. ✅ **Get feedback** from friends/community
6. ✅ **Keep building step by step**

---

## 🎯 Remember

> "Perfect is the enemy of done." 
> Build something that works first, make it pretty later.

**Your MVPs (Minimum Viable Features):**
1. ✨ Beautiful homepage (this is your portfolio!)
2. 📖 One complete module (linear regression)
3. 🤖 Working "Grade My Vibe" feature
4. 💾 Save submissions (basic Supabase integration)

Everything else is a bonus! 🎀

---

Made with ☕ and 💖 for **it-girl devs**

*Last Updated: January 17, 2026*
