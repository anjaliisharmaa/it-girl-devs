# 🎀 it-girl devs - Project Structure

## 📁 Folder Structure

```
it-girl-devs/
├── backend/                 # FastAPI Python Backend
│   ├── app/
│   │   ├── api/            # API routes
│   │   ├── models/         # Database models
│   │   └── services/       # Business logic (Gemini API integration)
│   ├── venv/               # Python virtual environment
│   ├── requirements.txt    # Python dependencies
│   └── .env.example        # Environment variables template
│
├── frontend/               # Next.js Frontend
│   ├── node_modules/       # Node dependencies (installed)
│   ├── package.json        # Node dependencies & scripts
│   └── .env.local.example  # Frontend environment template
│
├── docs/                   # Documentation & guides
├── .vscode/                # VS Code settings
├── .gitignore              # Git ignore rules
└── README.md               # Project README
```

## ✅ Environment Setup Complete

### Backend (Python/FastAPI)
- ✅ Virtual environment created at `backend/venv/`
- ✅ Dependencies installed (FastAPI, Gemini AI, Supabase, etc.)
- ⚠️ **Next Step:** Copy `.env.example` to `.env` and add your API keys

### Frontend (Next.js)
- ✅ Node modules installed
- ✅ Dependencies ready (Next.js, Tailwind, Framer Motion)
- ⚠️ **Next Step:** Copy `.env.local.example` to `.env.local` and configure

## 🚀 Quick Start Commands

### Backend
```bash
cd backend
.\venv\Scripts\activate    # Activate virtual environment
uvicorn main:app --reload  # Start the server (once main.py is created)
```

### Frontend
```bash
cd frontend
npm run dev               # Start Next.js dev server
```

## 📝 Before You Code

1. **Get Your API Keys:**
   - Gemini API: https://makersuite.google.com/app/apikey
   - Supabase: https://supabase.com/dashboard

2. **Create Environment Files:**
   - Backend: Copy `backend/.env.example` → `backend/.env`
   - Frontend: Copy `frontend/.env.local.example` → `frontend/.env.local`

3. **Add Your Keys:**
   - Update both `.env` files with your actual credentials

## 💅 Ready to Code!

Your foundation is set. Now you can:
- Create your first API route in `backend/app/api/`
- Build your first page in `frontend/`
- Connect to Gemini for the "Grade My Vibe" feature
- Set up Supabase tables for user data

---

**Status:** Foundation Complete 🎀  
**Branch:** main  
**Next:** Create a new branch and start coding step by step!
