'use client';

import { useEffect, useState, useRef } from 'react';

interface UseActiveTimerReturn {
  timeLeft: number;
  isIdle: boolean;
}

export function useActiveTimer(
  lessonId: string,
  initialSeconds: number
): UseActiveTimerReturn {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [isIdle, setIsIdle] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(true);

  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const countdownTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastInteractionRef = useRef<number>(Date.now());

  // Initialize from sessionStorage or use initialSeconds
  useEffect(() => {
    const storageKey = `timer_${lessonId}`;
    const storedTime = sessionStorage.getItem(storageKey);

    if (storedTime) {
      const savedTime = parseInt(storedTime, 10);
      setTimeLeft(savedTime);
    } else {
      setTimeLeft(initialSeconds);
      sessionStorage.setItem(storageKey, initialSeconds.toString());
    }
  }, [lessonId, initialSeconds]);

  // Handle page visibility changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      const isHidden = document.hidden;
      setIsPageVisible(!isHidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Handle idle detection - reset idle state on interaction
  useEffect(() => {
    const handleInteraction = () => {
      lastInteractionRef.current = Date.now();
      setIsIdle(false);
    };

    const events = ['mousedown', 'keydown', 'touchstart', 'scroll', 'click'];

    events.forEach((event) => {
      document.addEventListener(event, handleInteraction);
    });

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, handleInteraction);
      });
    };
  }, []);

  // Idle detection timer - pause after 60 seconds of inactivity
  useEffect(() => {
    const checkIdle = setInterval(() => {
      const timeSinceLastInteraction = Date.now() - lastInteractionRef.current;
      const IDLE_THRESHOLD = 60 * 1000; // 60 seconds in milliseconds

      if (timeSinceLastInteraction > IDLE_THRESHOLD && !isIdle) {
        setIsIdle(true);
      }
    }, 1000);

    return () => clearInterval(checkIdle);
  }, [isIdle]);

  // Countdown timer - only runs if page is visible and not idle
  useEffect(() => {
    const storageKey = `timer_${lessonId}`;

    if (timeLeft <= 0) {
      sessionStorage.removeItem(storageKey);
      return;
    }

    // Only countdown if page is visible and not idle
    if (!isPageVisible || isIdle) {
      if (countdownTimerRef.current) {
        clearInterval(countdownTimerRef.current);
      }
      return;
    }

    countdownTimerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = Math.max(0, prev - 1);
        sessionStorage.setItem(storageKey, newTime.toString());
        return newTime;
      });
    }, 1000);

    return () => {
      if (countdownTimerRef.current) {
        clearInterval(countdownTimerRef.current);
      }
    };
  }, [timeLeft, isPageVisible, isIdle, lessonId]);

  return { timeLeft, isIdle };
}
