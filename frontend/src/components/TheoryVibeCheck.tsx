'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useProgress } from '@/context/ProgressContext';

interface TheoryVibeCheckProps {
  lessonId: string;
  nextLessonId?: string;
  moduleId: string;
  sipTime?: string;
}

export default function TheoryVibeCheck({
  lessonId,
  nextLessonId,
  moduleId,
  sipTime,
}: TheoryVibeCheckProps) {
  const router = useRouter();
  const { markMastered } = useProgress();

  // TODO: Swap this to use real sipTime when ready
  // const timerDuration = sipTime ? parseInt(sipTime.split(' ')[0]) * 60 : 360; // default 6 mins
  const TESTING_TIMER_SECONDS = 10; // 10 seconds for testing

  const [timeRemaining, setTimeRemaining] = useState(TESTING_TIMER_SECONDS);
  const [reflection, setReflection] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Countdown timer
  useEffect(() => {
    if (timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining]);

  // Check if button should be enabled
  const isTimerComplete = timeRemaining === 0;
  const hasMinimumText = reflection.trim().length >= 10;
  const isButtonEnabled = isTimerComplete && hasMinimumText;

  // Format time for display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${String(secs).padStart(2, '0')}`;
  };

  // Handle form submission
  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Mark the lesson as mastered
      markMastered(lessonId);

      // Optional: Route to next lesson if it exists
      if (nextLessonId) {
        router.push(`/classroom/${moduleId}/${nextLessonId}`);
      }
    } catch (error) {
      console.error('Failed to mark lesson as mastered:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-pink-50/50 border-2 border-dashed border-pink-300 rounded-3xl p-8 my-10 shadow-sm">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <h3 className="text-2xl font-bold text-[#590D22]">
            Little Brain Dump
          </h3>
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono font-semibold text-lg transition-all ${
              isTimerComplete
                ? 'bg-green-100 text-green-700'
                : 'bg-pink-100 text-pink-700'
            }`}
          >
            <span>{isTimerComplete ? '✅' : '⏱️'}</span>
            <span>{formatTime(timeRemaining)}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-[#590D22] text-base leading-relaxed">
          Pause and process. Read through the material, then share your biggest takeaway. {isTimerComplete ? "You're ready!" : `Come back in ${formatTime(timeRemaining)}.`}
        </p>

        {/* Textarea for Reflection */}
        <div className="space-y-2">
          <label htmlFor="reflection" className="block font-semibold text-[#590D22]">
            What's your biggest takeaway from this lesson?
          </label>
          <textarea
            id="reflection"
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            placeholder="Share your thoughts here... (minimum 10 characters)"
            className="w-full h-32 p-4 border-2 border-pink-200 rounded-2xl bg-white focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-200 text-[#590D22] placeholder:text-pink-300/60 resize-none"
          />
          <div className="text-sm text-pink-600">
            {reflection.trim().length}/10 characters needed
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={!isButtonEnabled || isSubmitting}
          className={`w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-2 ${
            isButtonEnabled
              ? 'bg-[#590D22] text-white hover:bg-[#9B2226] cursor-pointer shadow-md hover:shadow-lg'
              : 'bg-gray-200 text-gray-400 opacity-50 cursor-not-allowed'
          }`}
        >
          {isSubmitting ? (
            <>
              <span className="animate-spin">⌛</span>
              <span>Locking In...</span>
            </>
          ) : (
            <>
              <span>Lock it in</span>
            </>
          )}
        </button>

        {/* Helper Text */}
        {!isTimerComplete && (
          <p className="text-sm text-pink-600 text-center font-medium">
            ⏰ Finish reading the lesson first!
          </p>
        )}
        {isTimerComplete && !hasMinimumText && (
          <p className="text-sm text-pink-600 text-center font-medium">
            💭 Tell us what you learned!
          </p>
        )}
      </div>
    </div>
  );
}
