'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

// Type for lesson status
export type LessonStatus = 'locked' | 'in-progress' | 'mastered';

// Progress state: maps lesson ID to status
export type ProgressState = Record<string, LessonStatus>;

// Ordered list of all lessons for sequential unlocking
const LESSON_SEQUENCE = [
  'intro-to-regression',
  'simple-linear-regression',
  'multiple-linear-regression',
];

// Context type definition
interface ProgressContextType {
  progress: ProgressState;
  markInProgress: (lessonId: string) => void;
  markMastered: (lessonId: string) => void;
  getStatus: (lessonId: string) => LessonStatus;
}

// Create the context
const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

// Provider component
export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<ProgressState>({});
  const [isHydrated, setIsHydrated] = useState(false);

  // Initialize progress from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('itGirlProgress');

    if (stored) {
      try {
        setProgress(JSON.parse(stored));
      } catch (error) {
        console.error('Failed to parse stored progress:', error);
        initializeProgress();
      }
    } else {
      initializeProgress();
    }

    setIsHydrated(true);
  }, []);

  // Initialize with first lesson as 'in-progress', rest as 'locked'
  const initializeProgress = () => {
    const initial: ProgressState = {};
    LESSON_SEQUENCE.forEach((lessonId, index) => {
      initial[lessonId] = index === 0 ? 'in-progress' : 'locked';
    });
    setProgress(initial);
    localStorage.setItem('itGirlProgress', JSON.stringify(initial));
  };

  // Persist progress to localStorage whenever it changes
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('itGirlProgress', JSON.stringify(progress));
    }
  }, [progress, isHydrated]);

  // Mark a lesson as in-progress (only if not already mastered)
  const markInProgress = (lessonId: string) => {
    setProgress((prev) => {
      const current = prev[lessonId];
      if (current === 'mastered') {
        return prev; // Don't downgrade mastered lessons
      }
      return {
        ...prev,
        [lessonId]: 'in-progress',
      };
    });
  };

  // Mark a lesson as mastered and unlock the next lesson
  const markMastered = (lessonId: string) => {
    setProgress((prev) => {
      const updated = {
        ...prev,
        [lessonId]: 'mastered' as LessonStatus,
      };

      // Find the current lesson index and unlock the next one
      const currentIndex = LESSON_SEQUENCE.indexOf(lessonId);
      if (currentIndex !== -1 && currentIndex < LESSON_SEQUENCE.length - 1) {
        const nextLessonId = LESSON_SEQUENCE[currentIndex + 1];
        // Only unlock if it's currently locked
        if (updated[nextLessonId] === 'locked') {
          updated[nextLessonId] = 'in-progress';
        }
      }

      return updated;
    });
  };

  // Get status of a lesson
  const getStatus = (lessonId: string): LessonStatus => {
    return progress[lessonId] || 'locked';
  };

  return (
    <ProgressContext.Provider value={{ progress, markInProgress, markMastered, getStatus }}>
      {children}
    </ProgressContext.Provider>
  );
}

// Custom hook to use progress context
export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}
