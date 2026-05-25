'use client';

import Link from 'next/link';
import { courseData } from '@/data/courseData';
import { Clock } from 'lucide-react';
import EvaluatorTest from '@/components/EvaluatorTest';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import 'katex/dist/katex.min.css';

interface PageProps {
  params: {
    moduleId: string;
    lessonId: string;
  };
}

// Custom Markdown Components for Brand Styling
const markdownComponents = {
  h1: ({ children }: any) => (
    <h1 className="text-[#590D22] font-bold text-6xl mt-[5rem] mb-0 leading-[2.5rem]">
      {children}
    </h1>
  ),
  h2: ({ children }: any) => (
    <h2 className="text-[#590D22] font-bold text-4xl mt-[2.5rem] mb-0 leading-[2.5rem]">
      {children}
    </h2>
  ),
  h3: ({ children }: any) => (
    <h3 className="text-[#590D22] font-bold text-3xl mt-[2.5rem] mb-0 leading-[2.5rem]">
      {children}
    </h3>
  ),
  h4: ({ children }: any) => (
    <h4 className="text-[#590D22] font-bold text-2xl mt-[2.5rem] mb-0 leading-[2.5rem]">
      {children}
    </h4>
  ),
  p: ({ children }: any) => (
    <p className="text-[#590D22] text-lg my-0 leading-[2.5rem]">
      {children}
    </p>
  ),
  ul: ({ children }: any) => (
    <ul className="list-disc ml-8 my-6 text-[#590D22] marker:text-pink-500">
      {children}
    </ul>
  ),
  ol: ({ children }: any) => (
    <ol className="list-decimal ml-8 my-6 text-[#590D22] marker:text-pink-500 font-medium">
      {children}
    </ol>
  ),
  li: ({ children }: any) => (
    <li className="pl-2 mb-3 leading-[32px]">
      {children}
    </li>
  ),
  code: ({ inline, children, className }: any) => {
    if (inline) {
      return (
        <code className="bg-pink-50 text-pink-600 px-1.5 py-0.5 rounded text-base font-mono">
          {children}
        </code>
      );
    }
    // Extract language from className (e.g., "language-python" -> "python")
    const language = className?.replace('language-', '') || 'text';
    return (
      <div className="my-8 shadow-lg rounded-xl overflow-hidden">
        <SyntaxHighlighter 
          language={language} 
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            borderRadius: '0.75rem',
          }}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      </div>
    );
  },
  a: ({ href, children }: any) => (
    <a
      href={href}
      className="text-pink-600 underline hover:text-pink-700 transition-colors"
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
    >
      {children}
    </a>
  ),
  img: ({ src, alt }: any) => (
    <img
      src={src}
      alt={alt}
      className="rounded-2xl shadow-sm border-2 border-pink-100 w-full my-[2.5rem]"
    />
  ),
  blockquote: ({ children }: any) => (
    <blockquote className="border-l-4 border-pink-200 pl-4 italic text-[#590D22] my-[2.5rem]">
      {children}
    </blockquote>
  ),
  table: ({ children }: any) => (
    <div className="overflow-x-auto my-[2.5rem]">
      <table className="w-full border-collapse border border-pink-200">
        {children}
      </table>
    </div>
  ),
  th: ({ children }: any) => (
    <th className="border border-pink-200 bg-pink-50 px-4 py-2 text-[#590D22] font-bold text-left">
      {children}
    </th>
  ),
  td: ({ children }: any) => (
    <td className="border border-pink-200 px-4 py-2 text-[#590D22]">
      {children}
    </td>
  ),
};

export interface PageProps {
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
  const ContentComponent = lesson?.content;

  // Split lesson content into main and mini-project sections
  let mainContent = lesson?.markdownContent || '';
  let projectContent = '';
  
  if (lesson?.markdownContent?.includes('## Mini-Project')) {
    const [main, ...projectParts] = lesson.markdownContent.split('## Mini-Project');
    mainContent = main.trim();
    projectContent = '## Mini-Project' + projectParts.join('## Mini-Project');
  }

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
    <div className="min-h-screen bg-gradient-to-br from-pink-50/50 via-pink-100/30 to-red-50/40 pt-32 pb-20 px-4 md:px-8 overflow-x-hidden" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      <style>{`
        html::-webkit-scrollbar { width: 8px; }
        html::-webkit-scrollbar-track { background: transparent; }
        html::-webkit-scrollbar-thumb { background: #FFD1DC; border-radius: 4px; }
        html::-webkit-scrollbar-thumb:hover { background: #FF69B4; }
      `}</style>
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
          className="flex-1 bg-white rounded-sm shadow-xl relative"
          style={{
            backgroundImage: 'linear-gradient(transparent 95%, #fce7f3 5%)',
            backgroundSize: '100% 2.5rem'
          }}
        >
          {/* Washi Tape - Top Left */}
          <div className="absolute -top-4 -left-8 w-28 h-9 bg-pink-400/50 -rotate-12 backdrop-blur-sm shadow-sm z-20" />
          
          {/* Washi Tape - Top Right */}
          <div className="absolute -top-4 -right-8 w-28 h-9 bg-pink-400/50 rotate-12 backdrop-blur-sm shadow-sm z-20" />

          {/* The Vertical Margin Line */}
          <div className="border-l-4 border-pink-200 ml-12 lg:ml-16 min-h-full">
            
            {/* Content with Perfect Line Alignment */}
            <div className="pl-8 pr-12 pt-10 pb-12" style={{ lineHeight: '2.5rem' }}>
              
              {/* Badge and Title - Strict Column Layout */}
              <div className="flex flex-col items-start gap-4 mb-8">
                {/* Lesson Title */}
                <h1 className="font-serif text-5xl md:text-6xl text-[#590D22] leading-tight bg-white px-2 inline-block">
                  {lesson.title}
                </h1>
              </div>

              {/* Metadata Capsules - Cute Pill-Shaped Badges */}
              {(lesson.metadata?.sipTime || lesson.metadata?.difficulty || lesson.metadata?.prerequisites) && (
                <div className="flex flex-wrap gap-4 mb-8">
                  {lesson.metadata?.sipTime && (
                    <div className="flex items-center gap-2 bg-pink-50 text-pink-800 text-sm font-medium px-4 py-2 rounded-full border border-pink-100 shadow-sm">
                      <span>☕</span>
                      <span>Sip Time: {lesson.metadata.sipTime}</span>
                    </div>
                  )}
                  {lesson.metadata?.difficulty && (
                    <div className="flex items-center gap-2 bg-pink-50 text-pink-800 text-sm font-medium px-4 py-2 rounded-full border border-pink-100 shadow-sm">
                      <span>🎀</span>
                      <span>Difficulty: {lesson.metadata.difficulty}</span>
                    </div>
                  )}
                  {lesson.metadata?.prerequisites && (
                    <div className="flex items-center gap-2 bg-pink-50 text-pink-800 text-sm font-medium px-4 py-2 rounded-full border border-pink-100 shadow-sm">
                      <span>🧠</span>
                      <span>Prerequisites: {lesson.metadata.prerequisites}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Content Area - Markdown Renderer with Custom Styling */}
              <article 
                className="prose prose-pink prose-xl max-w-none text-[#590D22]"
                style={{ lineHeight: '2.5rem' }}
              >
                {mainContent ? (
                  // Render main markdown content with custom components
                  <ReactMarkdown 
                    components={markdownComponents}
                    remarkPlugins={[remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                  >
                    {mainContent}
                  </ReactMarkdown>
                ) : lesson?.markdownContent ? (
                  // Fallback if no split occurred
                  <ReactMarkdown 
                    components={markdownComponents}
                    remarkPlugins={[remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                  >
                    {lesson.markdownContent}
                  </ReactMarkdown>
                ) : (
                  // Fallback to old ContentComponent for backward compatibility
                  ContentComponent && <ContentComponent />
                )}
              </article>

              {/* Mini-Project Callout Box - Cute Highlighted Section */}
              {projectContent && (
                <div className="bg-pink-50/50 border-2 border-dashed border-pink-300 rounded-3xl p-8 my-10 shadow-sm">
                  <article 
                    className="prose prose-pink prose-xl max-w-none text-[#590D22]"
                    style={{ lineHeight: '2.5rem' }}
                  >
                    <ReactMarkdown 
                      components={markdownComponents}
                      remarkPlugins={[remarkMath]}
                      rehypePlugins={[rehypeKatex]}
                    >
                      {projectContent}
                    </ReactMarkdown>
                  </article>
                </div>
              )}

              {/* 🧪 PYXIE LAB TEST (Only shows if lesson has a project rubric) */}
              {lesson.projectRubric && (
                <div className="mt-12 mb-12">
                  <EvaluatorTest datasetFile={lesson.datasetFile} />
                </div>
              )}

              {/* Pagination - Cute Tags */}
              <div className="flex items-center justify-between gap-4 border-t-2 border-dashed border-pink-200 pt-8">
                {/* Previous Button */}
                {lesson.prevLesson ? (
                  <Link
                    href={`/classroom/${moduleId}/${lesson.prevLesson}`}
                    className="inline-flex items-center gap-2 text-[#590D22] font-medium px-6 py-2 rounded-full border border-pink-200 hover:bg-pink-50 transition-colors"
                  >
                    <span>← Previous Page</span>
                  </Link>
                ) : (
                  <div></div>
                )}

                {/* Next Button */}
                {lesson.nextLesson ? (
                  <Link
                    href={`/classroom/${moduleId}/${lesson.nextLesson}`}
                    className="inline-flex items-center gap-2 text-[#590D22] font-medium px-6 py-2 rounded-full border border-pink-200 hover:bg-pink-50 transition-colors ml-auto"
                  >
                    <span>Next Page →</span>
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