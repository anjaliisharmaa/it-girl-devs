'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { useAuth } from '@clerk/nextjs';
import { createSupabaseClient } from '@/lib/supabase';

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
  const { isLoaded, isSignedIn, userId, getToken } = useAuth();

  // Initialize with first lesson as 'in-progress', rest as 'locked'
  const initializeProgress = useCallback(() => {
    const initial: ProgressState = {};
    LESSON_SEQUENCE.forEach((lessonId, index) => {
      initial[lessonId] = index === 0 ? 'in-progress' : 'locked';
    });
    return initial;
  }, []);

  const withSupabaseClient = useCallback(
    async <T,>(operation: (supabase: ReturnType<typeof createSupabaseClient>) => Promise<T>): Promise<T | null> => {
    if (!isSignedIn) {
      console.error('Cannot create Supabase client: no active signed-in Clerk user is available');
      return null;
    }

    let token: string | null = null;

    try {
      token = await getToken({ template: 'supabase' });
    } catch (error) {
      console.error('Failed to retrieve Clerk Supabase token from useAuth().getToken({ template: "supabase" })', error);
      return null;
    }

    if (!token) {
      console.error('Cannot create Supabase client: Clerk did not return a Supabase template token');
      return null;
    }

      const supabase = createSupabaseClient(token);
      return operation(supabase);
    },
    [getToken, isSignedIn]
  );

  const saveProgressRecord = useCallback(
    async (userId: string, lessonId: string, status: LessonStatus) => {
      const timestamp = new Date().toISOString();

      const result = await withSupabaseClient(async (supabase) => {
        const { data: existingRows, error: fetchError } = await supabase
          .from('user_progress')
          .select('id')
          .eq('user_id', userId)
          .eq('lesson_id', lessonId)
          .limit(1);

        if (fetchError) {
          return { error: fetchError, operation: 'check existing progress' as const };
        }

        if (existingRows && existingRows.length > 0) {
          const { error: updateError } = await supabase
            .from('user_progress')
            .update({
              user_id: userId,
              lesson_id: lessonId,
              status,
              updated_at: timestamp,
            })
            .eq('user_id', userId)
            .eq('lesson_id', lessonId);

          if (updateError) {
            return { error: updateError, operation: 'update progress' as const };
          }

          return { error: null, operation: 'update progress' as const };
        }

        const { error: insertError } = await supabase.from('user_progress').insert({
          user_id: userId,
          lesson_id: lessonId,
          status,
          updated_at: timestamp,
        });

        if (insertError) {
          return { error: insertError, operation: 'insert progress' as const };
        }

        return { error: null, operation: 'insert progress' as const };
      });

      if (!result) {
        console.error(`Progress save aborted for lesson ${lessonId}: authenticated Supabase client could not be created`);
        return;
      }

      if (result.error) {
        console.error(`Failed to ${result.operation} for lesson ${lessonId}`, result.error);
      }
    },
    [withSupabaseClient]
  );

  // Fetch user progress from Supabase or initialize if not logged in
  useEffect(() => {
    const fetchProgress = async () => {
      if (!isLoaded) {
        return;
      }

      setIsLoading(true);

      if (!isSignedIn) {
        // User is logged out: use default progress
        setProgress(initializeProgress());
        setIsLoading(false);
        return;
      }

      if (!userId) {
        console.error('Clerk auth state is signed in but userId is missing');
        setProgress(initializeProgress());
        setIsLoading(false);
        return;
      }

      try {
        const loadResult = await withSupabaseClient(async (supabase) => {
          // Fetch all progress records for this user
          const { data, error } = await supabase
            .from('user_progress')
            .select('*')
            .eq('user_id', userId);

          if (error) {
            return { error, data: null as typeof data | null };
          }

          return { error: null, data };
        });

        if (!loadResult) {
          console.error('Progress load aborted: authenticated Supabase client could not be created');
          setProgress(initializeProgress());
          return;
        }

        if (loadResult.error) {
          console.error('Failed to fetch progress from Supabase:', loadResult.error);
          setProgress(initializeProgress());
        } else if (loadResult.data && loadResult.data.length > 0) {
          // Convert array of records to progress state object
          const progressState: ProgressState = {};
          loadResult.data.forEach((record) => {
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
  }, [initializeProgress, isLoaded, isSignedIn, userId, withSupabaseClient]);

  // Mark a lesson as in-progress and persist to Supabase
  const markInProgress = useCallback(
    async (lessonId: string) => {
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
      if (!isSignedIn) {
        console.error(`Progress save aborted for lesson ${lessonId}: no signed-in Clerk user is available`);
        return;
      }

      if (!userId) {
        console.error(`Progress save aborted for lesson ${lessonId}: Clerk auth state is signed in but userId is missing`);
        return;
      }

      await saveProgressRecord(userId, lessonId, 'in-progress');
    },
    [isSignedIn, saveProgressRecord, userId]
  );

  // Mark a lesson as mastered, unlock next, and persist to Supabase
  const markMastered = useCallback(
    async (lessonId: string) => {
      // const updatePromises: Promise<any>[] = [];

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
      if (!isSignedIn) {
        console.error(`Progress save aborted for lesson ${lessonId}: no signed-in Clerk user is available`);
        return;
      }

      if (!userId) {
        console.error(`Progress save aborted for lesson ${lessonId}: Clerk auth state is signed in but userId is missing`);
        return;
      }

      await saveProgressRecord(userId, lessonId, 'mastered');

      // 2. Also upsert the next lesson if it exists
      const currentIndex = LESSON_SEQUENCE.indexOf(lessonId);
      if (currentIndex !== -1 && currentIndex < LESSON_SEQUENCE.length - 1) {
        const nextLessonId = LESSON_SEQUENCE[currentIndex + 1];
        await saveProgressRecord(userId, nextLessonId, 'in-progress');
      }
    },
    [isSignedIn, saveProgressRecord, userId]
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
