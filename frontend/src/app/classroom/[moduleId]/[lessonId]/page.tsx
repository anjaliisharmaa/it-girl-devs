'use client';

import { useState } from 'react';
import Link from 'next/link';
import { courseData } from '@/data/course-content';
import { Menu, X, Clock } from 'lucide-react';

interface PageProps {
  params: {
    moduleId: string;
    lessonId: string;
  };
}

export default function ClassroomPage({ params }: PageProps) {
  const { moduleId, lessonId } = params;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Fetch the module and lesson data
  const module = courseData[moduleId];
  const lesson = module?.[lessonId];

  // 404 state
  if (!module || !lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-red-50">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-[#590D22] mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-8">Lesson Not Found</p>
          <Link 
            href="/"
            className="px-6 py-3 bg-[#590D22] text-white rounded-lg hover:bg-[#9B2226] transition-colors"
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
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg text-[#590D22]"
        aria-label="Toggle menu"
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div className="flex">
        {/* Sidebar Navigation */}
        <aside
          className={`
            fixed lg:sticky top-0 h-screen w-64 lg:w-1/4 bg-white border-r border-gray-200 
            transform transition-transform duration-300 ease-in-out z-40
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            overflow-y-auto
          `}
        >
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-[#590D22] to-[#9B2226]">
            <h2 className="text-sm font-semibold text-pink-200 uppercase tracking-wide mb-1">
              Module
            </h2>
            <h1 className="text-xl font-bold text-white">
              {moduleDisplayName}
            </h1>
          </div>

          <nav className="p-4">
            <ul className="space-y-2">
              {lessons.map(([id, lessonData], index) => {
                const isActive = id === lessonId;
                return (
                  <li key={id}>
                    <Link
                      href={`/classroom/${moduleId}/${id}`}
                      onClick={() => setIsSidebarOpen(false)}
                      className={`
                        block p-3 rounded-lg transition-all duration-200
                        ${isActive 
                          ? 'bg-pink-100 text-[#590D22] border-r-4 border-[#590D22] font-semibold' 
                          : 'text-gray-600 hover:bg-pink-50 hover:text-[#590D22]'
                        }
                      `}
                    >
                      <div className="flex items-start">
                        <span className="text-xs font-bold mr-2 mt-0.5">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="flex-1 text-sm">
                          {lessonData.title}
                        </span>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 lg:w-3/4 min-h-screen">
          <div className="max-w-4xl mx-auto p-4 md:p-8 lg:p-12">
            {/* Header Card */}
            <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
              <div className="bg-gradient-to-r from-[#590D22] to-[#9B2226] p-8 md:p-12">
                <div className="flex items-center gap-2 mb-3">
                  <Clock size={16} className="text-pink-200" />
                  <span className="text-sm text-pink-200 font-medium">
                    Reading Time: 10 mins
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                  {lesson.title}
                </h1>
              </div>
            </div>

            {/* Content Area */}
            <article className="bg-white rounded-xl shadow-sm p-8 md:p-12 mb-8">
              <div 
                className="prose prose-pink prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: lesson.content }}
              />
            </article>

            {/* Footer Navigation */}
            <div className="flex items-center justify-between gap-4 py-8">
              {/* Previous Button */}
              {lesson.prevLesson ? (
                <Link
                  href={`/classroom/${moduleId}/${lesson.prevLesson}`}
                  className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-[#590D22] hover:text-[#590D22] transition-colors"
                >
                  <span className="text-xl">←</span>
                  <span className="font-semibold">Previous Lesson</span>
                </Link>
              ) : (
                <div></div>
              )}

              {/* Next Button */}
              {lesson.nextLesson ? (
                <Link
                  href={`/classroom/${moduleId}/${lesson.nextLesson}`}
                  className="flex items-center gap-2 px-6 py-3 bg-[#590D22] text-white rounded-lg hover:bg-[#9B2226] transition-colors font-semibold ml-auto"
                >
                  <span>Next Lesson</span>
                  <span className="text-xl">→</span>
                </Link>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
