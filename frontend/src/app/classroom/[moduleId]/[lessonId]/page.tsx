'use client';

import Link from 'next/link';
import { courseData } from '@/data/course-content';
import { Clock, ArrowLeft, ArrowRight } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-pink-50/30 via-white to-red-50/20 pt-32 pb-12 px-4 md:px-8">
      <div className="flex flex-col md:flex-row gap-8 max-w-7xl mx-auto">
        
        {/* The Index (Glassy Sidebar) */}
        <aside className="w-full md:w-72 shrink-0">
          <div className="bg-white/40 backdrop-blur-md border border-white/60 rounded-3xl p-6 h-fit sticky top-32 shadow-lg shadow-pink-100/50">
            {/* Module Header */}
            <div className="mb-6">
              <p className="text-xs font-semibold text-[#590D22]/60 uppercase tracking-widest mb-2">
                Module
              </p>
              <h2 className="text-lg font-bold text-[#590D22]">
                {moduleDisplayName}
              </h2>
            </div>

            {/* Lesson Navigation */}
            <nav>
              <ul className="space-y-2">
                {lessons.map(([id, lessonData], index) => {
                  const isActive = id === lessonId;
                  return (
                    <li key={id}>
                      <Link
                        href={`/classroom/${moduleId}/${id}`}
                        className={`
                          block transition-all duration-200 text-sm
                          ${isActive 
                            ? 'bg-pink-100 text-[#590D22] font-bold rounded-xl px-4 py-3' 
                            : 'text-[#590D22]/70 hover:text-pink-500 px-4 py-2 hover:translate-x-1'
                          }
                        `}
                      >
                        <div className="flex items-start gap-3">
                          <span className={`text-xs font-mono mt-0.5 ${isActive ? 'opacity-100' : 'opacity-50'}`}>
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <span className="flex-1">
                            {lessonData.title}
                          </span>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </aside>

        {/* The Notepad (Main Content) */}
        <main className="flex-1 bg-white rounded-[2.5rem] shadow-xl shadow-[#590D22]/5 border border-[#590D22]/10 overflow-hidden">
          
          {/* Header Area */}
          <div className="p-10 md:p-14 pb-0">
            {/* Reading Time Badge */}
            <div className="bg-pink-50 text-pink-500 text-xs font-mono px-3 py-1 rounded-full w-fit mb-4 flex items-center gap-2">
              <Clock size={12} />
              <span>Reading Time: 10 mins</span>
            </div>

            {/* Lesson Title */}
            <h1 className="font-serif text-4xl md:text-5xl text-[#590D22] mb-8 leading-tight">
              {lesson.title}
            </h1>
          </div>

          {/* Content Area */}
          <article className="px-10 md:px-14 pb-10">
            <div 
              className="prose prose-pink prose-lg max-w-none leading-relaxed"
              dangerouslySetInnerHTML={{ __html: lesson.content }}
            />
          </article>

          {/* Pagination */}
          <div className="border-t border-gray-100 p-10 mt-10">
            <div className="flex items-center justify-between gap-4">
              {/* Previous Button */}
              {lesson.prevLesson ? (
                <Link
                  href={`/classroom/${moduleId}/${lesson.prevLesson}`}
                  className="flex items-center gap-2 px-6 py-3 bg-gray-50 text-gray-700 rounded-full hover:bg-gray-100 transition-all text-sm font-medium"
                >
                  <ArrowLeft size={16} />
                  <span>Previous</span>
                </Link>
              ) : (
                <div></div>
              )}

              {/* Next Button */}
              {lesson.nextLesson ? (
                <Link
                  href={`/classroom/${moduleId}/${lesson.nextLesson}`}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#590D22] to-[#9B2226] text-white rounded-full hover:shadow-lg hover:shadow-pink-200 transition-all text-sm font-medium ml-auto"
                >
                  <span>Next Lesson</span>
                  <ArrowRight size={16} />
                </Link>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
