"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toaster } from "@/components/ui/sonner";
import { AlertCircle, ChevronRight, Clock, Zap, Award, BookOpen, CheckCircle, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import {
  getLessonsByLanguageAndLevel,
  getLessonsByLanguage,
  type Lesson,
} from "@/lib/typing-lessons";
import { validateTypingInput } from "@/lib/prohibited-words";
import {
  useTypingMetrics,
  useProgressTracking,
  useTimerMode,
  calculateSmartSuggestions,
  formatTime,
  type TypingMetrics,
} from "@/hooks/useTypingPractice";
import { mapQwertyToHindi, isDevanagari, mapQwertyToHindiWithShift } from "@/lib/hindi-transliteration";

type Level = "beginner" | "intermediate" | "advanced";
type TestMode = "lesson" | "1min" | "3min" | "5min";

interface LessonResult {
  lessonId: string;
  metrics: TypingMetrics;
  passed: boolean;
  timestamp: Date;
}

export default function TypingPractice() {
  // State management
  const [language, setLanguage] = useState<"english" | "hindi">("english");
  const [level, setLevel] = useState<Level>("beginner");
  const [testMode, setTestMode] = useState<TestMode>("lesson");
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [userInput, setUserInput] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [currentResult, setCurrentResult] = useState<LessonResult | null>(null);
  const [showLessonDetails, setShowLessonDetails] = useState(false);

  // Hooks
  const { progress, updateProgress, getProgressPercentage, getLessonProgress } =
    useProgressTracking(language);
  const timerMode = useTimerMode(testMode === "lesson" ? 300 : testMode === "1min" ? 60 : testMode === "3min" ? 180 : 300);
  const metrics = useTypingMetrics(currentText, userInput, startTime);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Get current lessons
  const lessons = testMode === "lesson" 
    ? getLessonsByLanguageAndLevel(language, level)
    : getLessonsByLanguage(language);
  
  const currentLesson = lessons[currentLessonIndex];

  // Initialize lesson
  useEffect(() => {
    if (currentLesson && currentLesson.texts && currentLesson.texts.length > 0) {
      const randomText = currentLesson.texts[
        Math.floor(Math.random() * currentLesson.texts.length)
      ];
      setCurrentText(randomText);
    }
  }, [currentLesson]);

  // Handle timer mode
  useEffect(() => {
    if (testMode !== "lesson" && timerMode.isActive) {
      if (timerMode.isComplete) {
        completeTest();
      }
    }
  }, [timerMode.isComplete]);

  // Focus input when active
  useEffect(() => {
    if (isActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isActive]);

  const startTest = useCallback(() => {
    setStartTime(Date.now());
    setIsActive(true);
    if (testMode !== "lesson") {
      timerMode.start();
    }
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [testMode, timerMode]);

  const completeTest = useCallback(() => {
    setIsActive(false);
    if (testMode !== "lesson") {
      timerMode.stop();
    }

    if (!currentLesson) return;

    // Determine if passed based on metrics
    const passed =
      metrics.wpm >= currentLesson.minWpm &&
      metrics.accuracy >= currentLesson.minAccuracy;

    const result: LessonResult = {
      lessonId: currentLesson.id,
      metrics,
      passed,
      timestamp: new Date(),
    };

    setCurrentResult(result);
    updateProgress(currentLesson.id, metrics.wpm, metrics.accuracy, passed);
    setShowResults(true);
  }, [currentLesson, metrics, updateProgress, testMode, timerMode]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let value = e.target.value;

    // Allow backspace for practice (disabled backspace removed)
    
    // Check for prohibited words before processing input
    const validation = validateTypingInput(value);
    if (!validation.isValid) {
      toast.error("Inappropriate content not allowed", {
        description: validation.warning,
      });
      // Prevent the input by keeping the old value
      e.target.value = userInput;
      setUserInput(userInput);
      return;
    }

    setUserInput(value);

    // Auto-start test on first input
    if (!isActive && !startTime && value.length > 0) {
      startTest();
    }

    // Auto-complete when text is fully typed
    if (value.length >= currentText.length && currentText.length > 0) {
      completeTest();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (language !== "hindi") return;

    // Ignore special keys (Enter, Tab, Arrow keys, etc.) but allow Backspace/Delete for practice
    const specialKeys = ['Enter', 'Tab', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Control', 'Shift', 'Alt', 'Meta'];
    if (specialKeys.includes(e.key)) {
      return;
    }

    // Allow Backspace and Delete natively
    if (e.key === 'Backspace' || e.key === 'Delete') {
      return; // Let browser handle deletion
    }

    // For Hindi, map the key to Devanagari character with shift support
    const key = e.key;
    const code = e.code;
    const isShift = e.shiftKey;
    
    // Prevent default character input, we'll add our mapped character instead
    e.preventDefault();
    
    const textarea = e.currentTarget;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const before = userInput.substring(0, start);
    const after = userInput.substring(end);
    
    // Map the key to Hindi character (using code for accurate key mapping with shift)
    const mappedChar = mapQwertyToHindiWithShift("", key, isShift, code);
    const newValue = before + mappedChar + after;
    
    // Check for prohibited words before processing input
    const validation = validateTypingInput(newValue);
    if (!validation.isValid) {
      toast.error("Inappropriate content not allowed", {
        description: validation.warning,
      });
      return;
    }
    
    setUserInput(newValue);
    
    // Update textarea and set cursor position
    textarea.value = newValue;
    setTimeout(() => {
      textarea.selectionStart = textarea.selectionEnd = start + mappedChar.length;
    }, 0);
    
    // Auto-start test on first input (ALWAYS in Hindi mode when user types first character)
    if (!isActive && !startTime) {
      startTest();
    }
    
    // Auto-complete when text is fully typed
    if (newValue.length >= currentText.length && currentText.length > 0) {
      completeTest();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
  };

  const resetLesson = () => {
    setUserInput("");
    setStartTime(null);
    setIsActive(false);
    setShowResults(false);
    setCurrentResult(null);
    timerMode.reset();
  };

  const nextLesson = () => {
    if (currentLessonIndex < lessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
      resetLesson();
    }
  };

  const prevLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1);
      resetLesson();
    }
  };

  const changeLevel = (newLevel: Level) => {
    setLevel(newLevel);
    setCurrentLessonIndex(0);
    resetLesson();
  };

  const changeLanguage = (newLang: "english" | "hindi") => {
    setLanguage(newLang);
    setLevel("beginner");
    setCurrentLessonIndex(0);
    resetLesson();
  };

  const renderTypingDisplay = () => {
    return currentText.split("").map((char, i) => {
      let className = "text-gray-700 dark:text-gray-300";

      if (i < userInput.length) {
        if (char === userInput[i]) {
          className = "text-green-600 font-semibold";
        } else {
          className = "text-red-600 font-semibold bg-red-100 dark:bg-red-900";
        }
      } else if (i === userInput.length) {
        className = "bg-blue-300 dark:bg-blue-600 animate-pulse";
      }

      return (
        <span key={i} className={className}>
          {char}
        </span>
      );
    });
  };

  const suggestions = calculateSmartSuggestions(metrics.wpm, metrics.accuracy);
  const currentProgress = getLessonProgress(currentLesson?.id || "");
  const levelProgress = getProgressPercentage(lessons.length);

  // Language labels
  const langLabel = language === "english" ? "English" : "हिंदी (Hindi)";

  return (
    <div className="w-full space-y-6">
      {/* Header Section */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-500" />
              Language & Level
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-2">
              <Button
                variant={language === "english" ? "default" : "outline"}
                size="sm"
                onClick={() => changeLanguage("english")}
              >
                English
              </Button>
              <Button
                variant={language === "hindi" ? "default" : "outline"}
                size="sm"
                onClick={() => changeLanguage("hindi")}
              >
                हिंदी
              </Button>
            </div>
            <div className="flex gap-2">
              <Button
                variant={level === "beginner" ? "default" : "outline"}
                size="sm"
                onClick={() => changeLevel("beginner")}
              >
                Beginner
              </Button>
              <Button
                variant={level === "intermediate" ? "default" : "outline"}
                size="sm"
                onClick={() => changeLevel("intermediate")}
              >
                Int.
              </Button>
              <Button
                variant={level === "advanced" ? "default" : "outline"}
                size="sm"
                onClick={() => changeLevel("advanced")}
              >
                Advanced
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-500" />
              Real-time Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-gray-500">WPM</p>
                <p className="text-2xl font-bold text-blue-600">{metrics.wpm}</p>
              </div>
              <div>
                <p className="text-gray-500">Accuracy</p>
                <p className={`text-2xl font-bold ${metrics.accuracy >= 95 ? "text-green-600" : metrics.accuracy >= 90 ? "text-yellow-600" : "text-red-600"}`}>
                  {metrics.accuracy}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Award className="w-4 h-4 text-purple-500" />
              Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <p className="text-sm text-gray-500 mb-1">
                {levelProgress}% Complete
              </p>
              <Progress value={levelProgress} className="h-2" />
              <p className="text-xs text-gray-400 mt-2">
                Lessons: {lessons.length}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Test Mode Selection */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Typing Mode</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={testMode === "lesson" ? "default" : "outline"}
              size="sm"
              onClick={() => { setTestMode("lesson"); resetLesson(); }}
            >
              📚 Lesson
            </Button>
            <Button
              variant={testMode === "1min" ? "default" : "outline"}
              size="sm"
              onClick={() => { setTestMode("1min"); resetLesson(); }}
            >
              ⏱️ 1 Min
            </Button>
            <Button
              variant={testMode === "3min" ? "default" : "outline"}
              size="sm"
              onClick={() => { setTestMode("3min"); resetLesson(); }}
            >
              ⏱️ 3 Min
            </Button>
            <Button
              variant={testMode === "5min" ? "default" : "outline"}
              size="sm"
              onClick={() => { setTestMode("5min"); resetLesson(); }}
            >
              ⏱️ 5 Min
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Main Typing Area */}
      {currentLesson && (
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  {testMode === "lesson" ? (
                    <>
                      <BookOpen className="w-5 h-5" />
                      {currentLesson.title}
                    </>
                  ) : (
                    <>
                      <Clock className="w-5 h-5" />
                      {testMode.toUpperCase()} Minute Test
                    </>
                  )}
                </CardTitle>
                <CardDescription>{currentLesson.description}</CardDescription>
              </div>
              <div className="text-right">
                <Badge variant="outline">{currentLesson.topic}</Badge>
                <p className="text-sm text-gray-500 mt-1">
                  Difficulty: {currentLesson.difficulty}/10
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Typing Display */}
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg min-h-[120px] select-none border-2 border-gray-200 dark:border-gray-700">
              <p className="text-lg leading-relaxed font-serif select-none whitespace-pre-wrap break-words">
                {renderTypingDisplay()}
              </p>
            </div>



            {/* Input Area */}
            <textarea
              ref={inputRef}
              value={userInput}
              onChange={handleInputChange}
              onKeyDown={language === "hindi" ? handleKeyDown : undefined}
              onPaste={handlePaste}
              placeholder="Start typing here... (Click Start button to begin)"
              disabled={showResults}
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[100px] resize-none font-mono text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              style={{ userSelect: "none" }}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
            />

            {/* Stats Row */}
            <div className="grid grid-cols-5 gap-2 text-center">
              <div className="bg-blue-50 dark:bg-blue-900 p-3 rounded-lg">
                <p className="text-xs text-gray-500">WPM</p>
                <p className="text-xl font-bold text-blue-600">{metrics.wpm}</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900 p-3 rounded-lg">
                <p className="text-xs text-gray-500">Accuracy</p>
                <p className="text-xl font-bold text-green-600">{metrics.accuracy}%</p>
              </div>
              <div className="bg-red-50 dark:bg-red-900 p-3 rounded-lg">
                <p className="text-xs text-gray-500">Errors</p>
                <p className="text-xl font-bold text-red-600">{metrics.errors}</p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900 p-3 rounded-lg">
                <p className="text-xs text-gray-500">Time</p>
                <p className="text-xl font-bold text-purple-600">
                  {testMode === "lesson"
                    ? formatTime(metrics.elapsedTime)
                    : formatTime(timerMode.timeRemaining)}
                </p>
              </div>
              <div className="bg-yellow-50 dark:bg-yellow-900 p-3 rounded-lg">
                <p className="text-xs text-gray-500">Chars/s</p>
                <p className="text-xl font-bold text-yellow-600">{metrics.charactersPerSecond}</p>
              </div>
            </div>

            {/* Requirements Info */}
            {testMode === "lesson" && (
              <div className="bg-amber-50 dark:bg-amber-900 border border-amber-200 dark:border-amber-700 p-3 rounded-lg flex gap-2">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-amber-800 dark:text-amber-200">
                  <p>
                    <strong>Pass Requirements:</strong> Min {currentLesson.minWpm} WPM • Min{" "}
                    {currentLesson.minAccuracy}% Accuracy
                  </p>
                </div>
              </div>
            )}

            {/* Control Buttons */}
            <div className="flex gap-2 flex-wrap">
              {!isActive && !showResults && (
                <Button
                  onClick={startTest}
                  className="bg-green-600 hover:bg-green-700"
                  size="lg"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Start Test
                </Button>
              )}
              {isActive && (
                <Button onClick={completeTest} variant="outline">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Stop
                </Button>
              )}
              <Button onClick={resetLesson} variant="outline">
                Reset
              </Button>
              {testMode === "lesson" && (
                <>
                  <Button
                    onClick={prevLesson}
                    disabled={currentLessonIndex === 0}
                    variant="ghost"
                    size="sm"
                  >
                    ← Previous
                  </Button>
                  <span className="text-sm text-gray-500 flex items-center">
                    {currentLessonIndex + 1} / {lessons.length}
                  </span>
                  <Button
                    onClick={nextLesson}
                    disabled={currentLessonIndex === lessons.length - 1}
                    variant="ghost"
                    size="sm"
                  >
                    Next →
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Smart Suggestions */}
      {(isActive || showResults) && suggestions.length > 0 && (
        <Card className="bg-blue-50 dark:bg-blue-900 border-blue-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">💡 Smart Suggestions</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {suggestions.map((suggestion, idx) => (
                <li key={idx} className="text-sm text-gray-700 dark:text-gray-200">
                  {suggestion}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Results Dialog */}
      <Dialog open={showResults} onOpenChange={setShowResults}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {currentResult?.passed ? (
                <>
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  Excellent Work!
                </>
              ) : (
                <>
                  <AlertTriangle className="w-6 h-6 text-red-500" />
                  Keep Practicing
                </>
              )}
            </DialogTitle>
          </DialogHeader>

          {currentResult && (
            <div className="space-y-4">
              {/* Results Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                  <p className="text-xs text-gray-500">WPM</p>
                  <p className="text-2xl font-bold">
                    {currentResult.metrics.wpm}
                  </p>
                  <p className="text-xs text-gray-400">
                    Target: {currentLesson?.minWpm}
                  </p>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                  <p className="text-xs text-gray-500">Accuracy</p>
                  <p className="text-2xl font-bold">
                    {currentResult.metrics.accuracy}%
                  </p>
                  <p className="text-xs text-gray-400">
                    Target: {currentLesson?.minAccuracy}%
                  </p>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                  <p className="text-xs text-gray-500">Errors</p>
                  <p className="text-2xl font-bold text-red-600">
                    {currentResult.metrics.errors}
                  </p>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                  <p className="text-xs text-gray-500">Time</p>
                  <p className="text-2xl font-bold">
                    {formatTime(currentResult.metrics.elapsedTime)}
                  </p>
                </div>
              </div>

              {/* Message */}
              <div className="text-center">
                {currentResult.passed ? (
                  <>
                    <p className="text-green-700 dark:text-green-300 font-semibold">
                      You passed this lesson! 🎉
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Move on to the next lesson or practice again.
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-red-700 dark:text-red-300 font-semibold">
                      Keep practicing! You'll get there.
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Focus on accuracy and try again.
                    </p>
                  </>
                )}
              </div>

              {/* Buttons */}
              <div className="flex gap-2">
                <Button onClick={resetLesson} className="flex-1">
                  Try Again
                </Button>
                {currentResult.passed && testMode === "lesson" && (
                  <Button onClick={nextLesson} variant="outline" className="flex-1">
                    Next Lesson
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Lesson Details */}
      {currentLesson && (
        <div className="text-center">
          <Button
            variant="link"
            size="sm"
            onClick={() => setShowLessonDetails(!showLessonDetails)}
          >
            {showLessonDetails ? "Hide" : "Show"} Lesson Details
          </Button>
        </div>
      )}

      {showLessonDetails && currentProgress && (
        <Card className="bg-gray-50 dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-sm">Your Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-gray-500">Attempts</p>
                <p className="text-lg font-bold">{currentProgress.attempts}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Best WPM</p>
                <p className="text-lg font-bold">{currentProgress.bestWpm}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Best Accuracy</p>
                <p className="text-lg font-bold">
                  {currentProgress.bestAccuracy}%
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Status</p>
                <p className="text-lg font-bold text-green-600">
                  {currentProgress.completed ? "✓ Completed" : "In Progress"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      <Toaster />
    </div>
  );
}
