'use client';

import Link from 'next/link';
import { courseData } from '@/data/course-content';
import { Clock } from 'lucide-react';

interface PageProps {
  params: {
    moduleId: string;
    lessonId: string;
  };
}

export default function ClassroomPage({ params }: PageProps) {
  const { moduleId, lessonId } = params;

  // Fetch the module and lesson data
  const module = courseData[moduleId];
  const lesson = module?.[lessonId];

  // 404 state
  if (!module || !lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-red-50 pt-32">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-[#590D22] mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-8">Lesson Not Found</p>
          <Link 
            href="/"
            className="px-6 py-3 bg-[#590D22] text-white rounded-full hover:bg-[#9B2226] transition-all inline-block"
          >
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  // Get all lessons in the module for sidebar
  const lessons = Object.entries(module);

  // Format module name for display
  const moduleDisplayName = moduleId
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50/50 via-pink-100/30 to-red-50/40 pt-32 pb-20 px-4 md:px-8">
      <div className="flex flex-col md:flex-row gap-6 max-w-7xl mx-auto">
        
        {/* The Planner Tabs (Sticky Notes Sidebar) */}
        <aside className="w-full md:w-64 flex flex-col gap-3 sticky top-32 h-fit">
          {/* Module Header */}
          <div className="mb-2">
            <p className="text-xs font-semibold text-[#590D22]/70 uppercase tracking-widest px-2">
              ✦ {moduleDisplayName} Module
            </p>
          </div>

          {/* Lesson Index Cards */}
          <nav>
            <ul className="flex flex-col gap-3">
              {lessons.map(([id, lessonData], index) => {
                const isActive = id === lessonId;
                return (
                  <li key={id}>
                    <Link
                      href={`/classroom/${moduleId}/${id}`}
                      className={`
                        block transition-all duration-300 text-sm
                        ${isActive 
                          ? 'bg-[#FFD1DC] text-[#590D22] p-4 rounded-xl rotate-2 shadow-md border border-pink-300 font-bold hover:rotate-1' 
                          : 'bg-white/60 backdrop-blur border border-white/40 text-[#590D22]/60 p-4 rounded-xl -rotate-1 hover:rotate-0 hover:bg-white/80'
                        }
                      `}
                    >
                      <div className="flex items-start gap-2">
                        {isActive && <span className="text-base">📌</span>}
                        <div className="flex-1">
                          <div className="text-xs font-mono opacity-60 mb-1">
                            Lesson {String(index + 1).padStart(2, '0')}
                          </div>
                          <div className="leading-tight">
                            {lessonData.title}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        {/* The Loose-Leaf Paper (Main Content) */}
        <main 
          className="flex-1 bg-white rounded-sm shadow-xl relative overflow-hidden"
          style={{
            backgroundImage: 'linear-gradient(transparent 95%, #fce7f3 5%)',
            backgroundSize: '100% 2.5rem'
          }}
        >
          {/* Washi Tape - Top Left */}
          <div className="absolute -top-2 -left-4 w-24 h-8 bg-pink-400/40 -rotate-12 backdrop-blur-sm" />
          
          {/* Washi Tape - Top Right */}
          <div className="absolute -top-2 -right-4 w-24 h-8 bg-pink-400/40 rotate-12 backdrop-blur-sm" />

          {/* The Vertical Margin Line */}
          <div className="border-l-4 border-pink-200 ml-12 lg:ml-16 min-h-full">
            
            {/* Content with Perfect Line Alignment */}
            <div className="pl-8 pr-12 py-12 leading-10">
              
              {/* Reading Time Badge with Highlighter Effect */}
              <div className="inline-flex items-center gap-2 bg-[#FFD1DC] px-2 py-1 rounded-sm mix-blend-multiply text-xs font-mono text-[#590D22] mb-10">
                <Clock size={12} />
                <span>Reading Time: 10 mins</span>
              </div>

              {/* Lesson Title */}
              <h1 className="font-serif text-5xl md:text-6xl text-[#590D22] mb-10 leading-tight bg-white px-2 inline-block">
                {lesson.title}
              </h1>

              {/* Content Area */}
              <article 
                className="prose prose-pink prose-lg max-w-none leading-10"
                dangerouslySetInnerHTML={{ __html: lesson.content }}
              />

              {/* Pagination - Hand-drawn Style */}
              <div className="flex items-center justify-between gap-4 mt-20 pt-10 border-t-2 border-dashed border-pink-200">
                {/* Previous Button */}
                {lesson.prevLesson ? (
                  <Link
                    href={`/classroom/${moduleId}/${lesson.prevLesson}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-[#590D22] text-[#590D22] rounded-full hover:bg-pink-50 transition-all text-sm font-bold hover:-rotate-1 shadow-sm"
                  >
                    <span>← Prev</span>
                  </Link>
                ) : (
                  <div></div>
                )}

                {/* Next Button */}
                {lesson.nextLesson ? (
                  <Link
                    href={`/classroom/${moduleId}/${lesson.nextLesson}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#590D22] text-white rounded-full hover:bg-[#9B2226] transition-all text-sm font-bold hover:rotate-1 shadow-md ml-auto"
                  >
                    <span>Next →</span>
                  </Link>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
