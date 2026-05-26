'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { useAuth } from '@clerk/nextjs';
import { supabase } from '@/lib/supabase';

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
  isLoading: boolean;
}

// Create the context
const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

// Provider component
export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<ProgressState>({});
  const [isLoading, setIsLoading] = useState(true);
  const { userId } = useAuth();

  // Initialize with first lesson as 'in-progress', rest as 'locked'
  const initializeProgress = useCallback(() => {
    const initial: ProgressState = {};
    LESSON_SEQUENCE.forEach((lessonId, index) => {
      initial[lessonId] = index === 0 ? 'in-progress' : 'locked';
    });
    return initial;
  }, []);

  // Fetch user progress from Supabase or initialize if not logged in
  useEffect(() => {
    const fetchProgress = async () => {
      setIsLoading(true);

      if (!userId) {
        // User is logged out: use default progress
        setProgress(initializeProgress());
        setIsLoading(false);
        return;
      }

      try {
        // Fetch all progress records for this user
        const { data, error } = await supabase
          .from('user_progress')
          .select('*')
          .eq('user_id', userId);

        if (error) {
          console.error('Failed to fetch progress from Supabase:', error);
          setProgress(initializeProgress());
        } else if (data && data.length > 0) {
          // Convert array of records to progress state object
          const progressState: ProgressState = {};
          data.forEach((record) => {
            progressState[record.lesson_id] = record.status;
          });

          // Ensure all lessons exist in state
          const finalState = initializeProgress();
          Object.assign(finalState, progressState);
          setProgress(finalState);
        } else {
          // First time user: initialize with defaults
          setProgress(initializeProgress());
        }
      } catch (error) {
        console.error('Error fetching progress:', error);
        setProgress(initializeProgress());
      } finally {
        setIsLoading(false);
      }
    };

    fetchProgress();
  }, [userId, initializeProgress]);

  // Mark a lesson as in-progress and persist to Supabase
  const markInProgress = useCallback(
    (lessonId: string) => {
      // Optimistic UI update
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

      // Persist to Supabase
      if (userId) {
        supabase
          .from('user_progress')
          .upsert(
            {
              user_id: userId,
              lesson_id: lessonId,
              status: 'in-progress',
              updated_at: new Date().toISOString(),
            },
            { onConflict: 'user_id,lesson_id' }
          )
          .then(({ error }) => {
            if (error) console.error('Failed to update progress:', error);
          });
      }
    },
    [userId]
  );

  // Mark a lesson as mastered, unlock next, and persist to Supabase
  const markMastered = useCallback(
    (lessonId: string) => {
      const updatePromises: Promise<any>[] = [];

      // Optimistic UI update
      setProgress((prev) => {
        const updated: ProgressState = {
          ...prev,
          [lessonId]: 'mastered',
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

      // Persist to Supabase
      if (userId) {
        // Upsert the mastered lesson
        updatePromises.push(
          supabase
            .from('user_progress')
            .upsert(
              {
                user_id: userId,
                lesson_id: lessonId,
                status: 'mastered',
                updated_at: new Date().toISOString(),
              },
              { onConflict: 'user_id,lesson_id' }
            )
        );

        // Also upsert the next lesson if it exists
        const currentIndex = LESSON_SEQUENCE.indexOf(lessonId);
        if (currentIndex !== -1 && currentIndex < LESSON_SEQUENCE.length - 1) {
          const nextLessonId = LESSON_SEQUENCE[currentIndex + 1];
          updatePromises.push(
            supabase
              .from('user_progress')
              .upsert(
                {
                  user_id: userId,
                  lesson_id: nextLessonId,
                  status: 'in-progress',
                  updated_at: new Date().toISOString(),
                },
                { onConflict: 'user_id,lesson_id' }
              )
          );
        }

        Promise.all(updatePromises).catch((error) =>
          console.error('Failed to update progress:', error)
        );
      }
    },
    [userId]
  );

  // Get status of a lesson
  const getStatus = (lessonId: string): LessonStatus => {
    return progress[lessonId] || 'locked';
  };

  return (
    <ProgressContext.Provider
      value={{ progress, markInProgress, markMastered, getStatus, isLoading }}
    >
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
