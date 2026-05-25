'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { regressionModule } from '@/data/modules/regression/generated-regression-module';
import { Module } from '@/types/course';
import { useProgress } from '@/context/ProgressContext';
import { ChevronRight, ArrowLeft } from 'lucide-react';

interface PageProps {
  params: {
    moduleId: string;
  };
}

// Map module IDs to their display data
const moduleConfig: Record<string, { title: string; vibeTitle: string; emoji: string }> = {
  regression: {
    title: 'Regression',
    vibeTitle: 'The Oracle Era',
    emoji: '🔮',
  },
};

export default function ModuleOverviewPage({ params }: PageProps) {
  const { moduleId } = params;
  const router = useRouter();
  const { progress, getStatus } = useProgress();

  // Get the module data based on the route
  let moduleData: Module = {};
  if (moduleId === 'regression') {
    moduleData = regressionModule;
  }

  // Calculate progress
  const lessonIds = Object.keys(moduleData);
  const masteredCount = lessonIds.filter((id) => getStatus(id) === 'mastered').length;
  const progressPercentage = (masteredCount / lessonIds.length) * 100;

  const config = moduleConfig[moduleId];

  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-red-50 pt-32">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-[#590D22] mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-8">Module Not Found</p>
          <Link
            href="/episodes"
            className="px-6 py-3 bg-[#590D22] text-white rounded-full hover:bg-[#9B2226] transition-all inline-block"
          >
            Back to Episodes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50/50 via-pink-100/30 to-red-50/40 pt-32 pb-20 px-4 md:px-8">
      <style>{`
        html::-webkit-scrollbar { width: 8px; }
        html::-webkit-scrollbar-track { background: transparent; }
        html::-webkit-scrollbar-thumb { background: #FFD1DC; border-radius: 4px; }
        html::-webkit-scrollbar-thumb:hover { background: #FF69B4; }
      `}</style>

      <div className="max-w-5xl mx-auto">
        {/* Header with Back Button */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/episodes"
            className="inline-flex items-center gap-2 text-[#590D22] hover:text-[#9B2226] transition-colors font-medium mb-4"
          >
            <ArrowLeft size={20} />
            <span>Back to Blueprint</span>
          </Link>
        </div>

        {/* Module Title Section */}
        <div className="mb-12">
          <div className="flex items-baseline gap-3 mb-2">
            <h1 className="text-6xl font-serif text-[#590D22]">{config.title}</h1>
            <span className="text-4xl">{config.emoji}</span>
          </div>
          <p className="text-2xl text-[#590D22]/70 font-light">{config.vibeTitle}</p>
        </div>

        {/* Progress Tracker */}
        <div className="bg-white rounded-2xl shadow-md p-8 mb-12 border border-pink-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-[#590D22]">Your Progress</h2>
            <span className="text-2xl font-bold text-pink-600">
              {masteredCount}/{lessonIds.length} Lessons Mastered
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-pink-500 transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          <p className="text-sm text-[#590D22]/60 mt-3">
            {progressPercentage === 0 && "Let's get started! Click a lesson to begin."}
            {progressPercentage > 0 && progressPercentage < 100 && `Keep going! You're ${Math.round(progressPercentage)}% through this module.`}
            {progressPercentage === 100 && "You've mastered this module! Incredible work!"}
          </p>
        </div>

        {/* Lessons Grid */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-[#590D22] mb-6">Lesson Roadmap</h2>

          {lessonIds.map((lessonId, index) => {
            const lesson = moduleData[lessonId];
            const status = getStatus(lessonId);
            const lessonNumber = String(index + 1).padStart(2, '0');

            // Determine styling based on status
            let borderColor = 'border-gray-200';
            let bgColor = 'bg-white';
            let cardBorder = 'border';
            let statusIcon = '○';
            let statusText = 'Not Started';
            let textColor = 'text-gray-500';
            let statusBgColor = 'bg-gray-50 border-gray-200';

            if (status === 'mastered') {
              borderColor = 'border-transparent';
              bgColor = 'bg-pink-50/50';
              cardBorder = 'border';
              statusText = 'Mastered';
              textColor = 'text-gray-600';
              statusBgColor = 'bg-pink-100/50 border-pink-200';
            } else if (status === 'in-progress') {
              borderColor = 'border-pink-400';
              bgColor = 'bg-white';
              cardBorder = 'border-2';
              statusText = 'Continue';
              textColor = 'text-[#590D22]';
              statusBgColor = 'bg-pink-100 border-pink-300';
            }

            return (
              <Link
                key={lessonId}
                href={`/classroom/${moduleId}/${lessonId}`}
                className={`
                  group block py-4 px-6 rounded-2xl ${cardBorder} transition-all duration-300
                  ${status === 'in-progress' ? 'shadow-lg shadow-pink-100/50 hover:shadow-xl' : 'hover:shadow-md'}
                  ${borderColor} ${bgColor}
                  cursor-pointer
                `}
              >
                <div className="flex items-center justify-between gap-4">
                  {/* Left Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="text-xs font-mono font-bold text-[#590D22]/60 tracking-widest">
                        LESSON {lessonNumber}
                      </span>
                      <span className={`text-sm ${textColor}`}>{lesson.metadata?.sipTime}</span>
                    </div>
                    <h3 className={`text-lg font-semibold transition-colors ${status === 'mastered' ? 'text-gray-600' : 'text-[#590D22] group-hover:text-pink-600'}`}>
                      {lesson.title}
                    </h3>

                    {/* Metadata Pills */}
                    <div className="flex flex-wrap gap-2 mt-2">
                      {lesson.metadata?.difficulty && (
                        <span className="text-xs px-3 py-1 bg-pink-100 text-pink-700 rounded-full font-medium">
                          {lesson.metadata.difficulty}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Right Status */}
                  <div className="flex flex-col items-end gap-2 flex-shrink-0">
                    {/* Status Badge */}
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${statusBgColor}`}>
                      <span className="text-base">{statusIcon}</span>
                      <span className={`text-xs font-semibold ${status === 'mastered' ? 'text-gray-600' : 'text-[#590D22]'}`}>{statusText}</span>
                    </div>

                    {/* Arrow Icon */}
                    {(status === 'in-progress' || status === 'mastered') && (
                      <ChevronRight
                        size={20}
                        className={`${status === 'in-progress' ? 'text-pink-500' : 'text-gray-400'} group-hover:text-pink-600 transition-colors`}
                      />
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Footer CTA */}
        {masteredCount === lessonIds.length && (
          <div className="mt-16 bg-gradient-to-r from-pink-100 to-pink-50 border-2 border-dashed border-pink-300 rounded-3xl p-8 text-center">
            <h3 className="text-2xl font-bold text-[#590D22] mb-3">
              🎉 Module Complete!
            </h3>
            <p className="text-[#590D22]/70 mb-6">
              You've mastered all {lessonIds.length} lessons in {config.title}. Time for the next challenge?
            </p>
            <Link
              href="/episodes"
              className="inline-flex items-center gap-2 bg-[#590D22] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#9B2226] transition-all"
            >
              <span>Back to Blueprint</span>
              <ChevronRight size={20} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
