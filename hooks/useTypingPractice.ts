import { useState, useCallback, useEffect } from "react";

export interface TypingMetrics {
  wpm: number;
  accuracy: number;
  errors: number;
  totalChars: number;
  correctChars: number;
  elapsedTime: number; // in seconds
  charactersPerSecond: number;
}

export interface LessonProgress {
  lessonId: string;
  attempts: number;
  bestWpm: number;
  bestAccuracy: number;
  completed: boolean;
  completedDate?: Date;
}

export interface TypingSession {
  sessionId: string;
  lessonId: string;
  startTime: number;
  endTime?: number;
  metrics?: TypingMetrics;
  passed: boolean;
}

export function useTypingMetrics(text: string, userInput: string, startTime: number | null) {
  const [metrics, setMetrics] = useState<TypingMetrics>({
    wpm: 0,
    accuracy: 0,
    errors: 0,
    totalChars: userInput.length,
    correctChars: 0,
    elapsedTime: 0,
    charactersPerSecond: 0,
  });

  useEffect(() => {
    if (!startTime) return;

    const elapsedSeconds = Math.max(1, (Date.now() - startTime) / 1000);
    let correctChars = 0;
    let errors = 0;

    for (let i = 0; i < userInput.length; i++) {
      if (i < text.length) {
        if (userInput[i] === text[i]) {
          correctChars++;
        } else {
          errors++;
        }
      } else {
        errors++;
      }
    }

    const totalWords = Math.max(1, userInput.trim().split(/\s+/).length);
    const wpm = Math.round((totalWords / elapsedSeconds) * 60);
    const accuracy =
      userInput.length > 0
        ? Math.max(0, Math.round((correctChars / userInput.length) * 100))
        : 0;
    const cps = (correctChars / elapsedSeconds).toFixed(2);

    setMetrics({
      wpm,
      accuracy,
      errors,
      totalChars: userInput.length,
      correctChars,
      elapsedTime: Math.floor(elapsedSeconds),
      charactersPerSecond: parseFloat(cps),
    });
  }, [text, userInput, startTime]);

  return metrics;
}

// Hook for managing typing practice session
export function useTypingSession(lessonId: string) {
  const [sessionId] = useState(() => `session-${Date.now()}-${Math.random()}`);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [metrics, setMetrics] = useState<TypingMetrics | null>(null);

  const startSession = useCallback(() => {
    setStartTime(Date.now());
    setEndTime(null);
    setMetrics(null);
  }, []);

  const endSession = useCallback((calculatedMetrics: TypingMetrics) => {
    setEndTime(Date.now());
    setMetrics(calculatedMetrics);
  }, []);

  const resetSession = useCallback(() => {
    setStartTime(null);
    setEndTime(null);
    setMetrics(null);
  }, []);

  return {
    sessionId,
    startTime,
    endTime,
    metrics,
    startSession,
    endSession,
    resetSession,
  };
}

// Hook for progress tracking
export function useProgressTracking(language: string) {
  const [progress, setProgress] = useState<Map<string, LessonProgress>>(
    new Map()
  );

  const updateProgress = useCallback(
    (lessonId: string, wpm: number, accuracy: number, passed: boolean) => {
      setProgress((prev) => {
        const newProgress = new Map(prev);
        const existing = newProgress.get(lessonId);

        const updated: LessonProgress = {
          lessonId,
          attempts: (existing?.attempts || 0) + 1,
          bestWpm: Math.max(existing?.bestWpm || 0, wpm),
          bestAccuracy: Math.max(existing?.bestAccuracy || 0, accuracy),
          completed: passed || (existing?.completed ?? false),
          completedDate: passed ? new Date() : existing?.completedDate,
        };

        newProgress.set(lessonId, updated);
        return newProgress;
      });
    },
    []
  );

  const getProgressPercentage = useCallback(
    (totalLessons: number) => {
      const completed = Array.from(progress.values()).filter(
        (p) => p.completed
      ).length;
      return totalLessons > 0
        ? Math.round((completed / totalLessons) * 100)
        : 0;
    },
    [progress]
  );

  const getLessonProgress = useCallback(
    (lessonId: string) => {
      return progress.get(lessonId) || null;
    },
    [progress]
  );

  return {
    progress,
    updateProgress,
    getProgressPercentage,
    getLessonProgress,
  };
}

// Hook for time-based typing test
export function useTimerMode(initialDuration: number) {
  const [timeRemaining, setTimeRemaining] = useState(initialDuration);
  const [isActive, setIsActive] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!isActive || isComplete) return;

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          setIsActive(false);
          setIsComplete(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, isComplete]);

  const start = useCallback(() => {
    setIsActive(true);
    setTimeRemaining(initialDuration);
    setIsComplete(false);
  }, [initialDuration]);

  const stop = useCallback(() => {
    setIsActive(false);
  }, []);

  const reset = useCallback(() => {
    setIsActive(false);
    setTimeRemaining(initialDuration);
    setIsComplete(false);
  }, [initialDuration]);

  return {
    timeRemaining,
    isActive,
    isComplete,
    start,
    stop,
    reset,
  };
}

// Calculate smart suggestions based on performance
export function calculateSmartSuggestions(
  wpm: number,
  accuracy: number
): string[] {
  const suggestions: string[] = [];

  if (wpm < 20) {
    suggestions.push("👐 Focus on accuracy first, speed will follow");
    suggestions.push("📖 Try practicing with simpler lessons");
    suggestions.push("⏱️ Take more time between typing sessions");
  } else if (wpm < 40) {
    suggestions.push("📈 Great progress! Keep practicing regularly");
    suggestions.push("⌨️ Work on finger positioning for better flow");
    suggestions.push("🎯 Challenge yourself with harder lessons");
  } else {
    suggestions.push("🌟 Excellent speed! Maintain consistency");
    suggestions.push("🔍 Focus on minimizing errors for perfection");
    suggestions.push("💯 Try advanced lessons to push your limits");
  }

  if (accuracy < 90) {
    suggestions.push("❌ Reduce typing errors by slowing down slightly");
    suggestions.push("👁️ Focus on reading before typing each word");
  } else if (accuracy < 98) {
    suggestions.push("✅ Accuracy is good, strive for 98%+ for excellence");
  } else {
    suggestions.push("🏆 Outstanding accuracy! You're mastering touch typing");
  }

  return suggestions.slice(0, 3);
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}
