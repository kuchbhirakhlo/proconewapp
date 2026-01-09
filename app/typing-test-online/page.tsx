"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { generateCertificateId, generateCertificatePDF, type CertificateData } from "@/lib/certificate-generator";
import { Trophy, Clock, Target, BookOpen, RefreshCw, Star, Award, ChevronRight } from "lucide-react";

const typingTexts: { english: { beginner: string[]; intermediate: string[]; pro: string[] }; hindi: { beginner: string[]; intermediate: string[]; pro: string[] } } = {
  english: {
    beginner: ["The quick brown fox jumps over the lazy dog.", "A journey of a thousand miles begins with a single step.", "Practice makes perfect in everything we do.", "Time and tide wait for no one in life.", "Where there is a will there is always a way.", "Success comes to those who work hard daily.", "Every master was once a disaster in beginning.", "Learning typing is fun and useful skill."],
    intermediate: ["The only way to do great work is to love what you do every single day.", "Success is not final, failure is not fatal: it is the courage to continue that counts.", "The future belongs to those who believe in the beauty of their dreams completely.", "In the middle of difficulty lies opportunity for those who seek it with dedication.", "Your time is limited, so don't waste it living someone else's life wisely.", "The pursuit of excellence in any skill demonstrates dedication and commitment.", "With consistent practice and proper technique anyone can achieve great results.", "Remember that mastery requires patience, persistence and continuous improvement."],
    pro: ["Technology is best when it brings people together and bridges the gap between different cultures.", "In the digital age keyboard proficiency is not just a skill but a fundamental literacy that empowers individuals.", "The pursuit of excellence in typing speed and accuracy demonstrates dedication discipline and commitment.", "With consistent practice and proper technique anyone can achieve remarkable proficiency in touch typing.", "Remember that true mastery is not about speed alone but also about precision efficiency and maintaining wellness."],
  },
  hindi: {
    beginner: ["रात बहुत गहरी थी जब चाँद आसमान में चमका।", "पक्षी ऊपर उड़ रहे थे आज़ादी के नारे लगाते हुए।", "बच्चे खेल रहे थे पार्क में खुशियाँ मनाते हुए।", "फूल बहुत सुंदर थे खिलने की उम्मीद लिए।", "पानी बहुत ठंडा था इस गर्मी के मौसम में।", "सूरज की किरणें ज़मीन पर गिर रही थीं।", "हवा तेज़ चल रही थी बदलों के साथ।"],
    intermediate: ["हमें अपने लक्ष्य के प्रति समर्पित रहना चाहिए हर पल।", "कठिन परिश्रम सफलता की असली कुंजी है जीवन में।", "जहां इच्छा है, वहां रास्ता भी बनता है स्वयं।", "समय का सदुपयोग करना चाहिए हर एक पल का।", "सपने देखने की शक्ति रखनी चाहिए सदैव मन में।", "लगन और परिश्रम से कोई भी कार्य संभव है।", "ज्ञान ही शक्ति है जो हमें आगे बढ़ाता है।"],
    pro: ["प्रौद्योगिकी ने हमारे जीवन को बहुत आसान बना दिया है और दूरियों को कम कर दिया है।", "कंप्यूटर पर टाइपिंग की कला में निपुणता प्राप्त करना एक महत्वपूर्ण कौशल है आज के युग में।", "नियमित अभ्यास और सही तकनीक से कोई भी टच टाइपिंग में महारत हासिल कर सकता है।", "डिजिटल युग में तकनीकी साक्षरता सभी के लिए आवश्यक है व्यक्तिगत और व्यावसायिक विकास के लिए।"],
  },
};

interface TestResult { wpm: number; accuracy: number; errors: number; timeTaken: number; level: string; language: string; passed: boolean; }
type Level = "beginner" | "intermediate" | "pro" | "completed";
const levelConfig: Record<string, { minWpm: number; minAccuracy: number; nextLevel: Level }> = {
  beginner: { minWpm: 20, minAccuracy: 90, nextLevel: "intermediate" },
  intermediate: { minWpm: 25, minAccuracy: 95, nextLevel: "pro" },
  pro: { minWpm: 30, minAccuracy: 100, nextLevel: "completed" },
};

export default function TypingTestOnline() {
  const [language, setLanguage] = useState<"english" | "hindi">("english");
  const [currentLevel, setCurrentLevel] = useState<Level>("beginner");
  const [currentText, setCurrentText] = useState("");
  const [userInput, setUserInput] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isTestActive, setIsTestActive] = useState(false);
  const [isTestComplete, setIsTestComplete] = useState(false);
  const [results, setResults] = useState<TestResult | null>(null);
  const [name, setName] = useState("");
  const [showNameDialog, setShowNameDialog] = useState(false);
  const [certificates, setCertificates] = useState<string[]>([]);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const getRandomText = useCallback(() => {
    const texts = typingTexts[language][currentLevel as "beginner" | "intermediate" | "pro"];
    return texts[Math.floor(Math.random() * texts.length)];
  }, [language, currentLevel]);

  const initializeTest = useCallback(() => {
    setCurrentText(getRandomText());
    setUserInput("");
    setStartTime(null);
    setElapsedTime(0);
    setIsTestActive(false);
    setIsTestComplete(false);
    setResults(null);
  }, [getRandomText]);

  const resetToBeginner = useCallback(() => {
    setCurrentLevel("beginner");
    setCertificates([]);
    initializeTest();
  }, [initializeTest]);

  useEffect(() => { initializeTest(); }, [currentLevel, initializeTest]);

  useEffect(() => {
    if (isTestActive && startTime) {
      timerRef.current = setInterval(() => setElapsedTime(Math.floor((Date.now() - startTime) / 1000)), 1000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isTestActive, startTime]);

  useEffect(() => { if (isTestActive && inputRef.current) inputRef.current.focus(); }, [isTestActive]);

  const handleStart = () => { setIsTestActive(true); setStartTime(Date.now()); if (inputRef.current) inputRef.current.focus(); };
  const handleReset = () => { if (currentLevel === "completed") resetToBeginner(); else initializeTest(); };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!isTestActive) handleStart();
    const value = e.target.value;
    // Prevent backspace - only allow forward typing
    if (value.length < userInput.length) {
      return; // Ignore backspace/delete
    }
    setUserInput(value);
    if (value.length >= currentText.length) completeTest(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Prevent arrow keys, home, end from moving cursor during test
    if (isTestActive && !isTestComplete) {
      const preventedKeys = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"];
      if (preventedKeys.includes(e.key)) {
        e.preventDefault();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    // Prevent pasting completely - this is a typing test, not a paste test
    e.preventDefault();
    // Show warning toast
    if (isTestActive || !isTestComplete) {
      toast.warning("Pasting is not allowed!", { description: "Please type the text manually." });
    }
  };

  const completeTest = (input: string) => {
    if (!startTime) return;
    const timeInMinutes = (Date.now() - startTime) / 60000;
    const wordsTyped = input.trim().split(/\s+/).length;
    const wpm = Math.round(wordsTyped / timeInMinutes);
    let errors = 0;
    for (let i = 0; i < Math.min(input.length, currentText.length); i++) {
      if (input[i] !== currentText[i]) errors++;
    }
    const accuracy = Math.max(0, Math.round(((input.length - errors) / input.length) * 100));
    const config = levelConfig[currentLevel];
    const passed = wpm >= config.minWpm && accuracy >= config.minAccuracy;
    
    const testResults: TestResult = { wpm, accuracy, errors, timeTaken: Math.round((Date.now() - startTime) / 1000), level: currentLevel, language, passed };
    setResults(testResults);
    setIsTestActive(false);
    setIsTestComplete(true);

    if (passed) {
      toast.success(`${currentLevel.charAt(0).toUpperCase() + currentLevel.slice(1)} Level Passed!`, { description: `WPM: ${wpm}, Accuracy: ${accuracy}%` });
      setTimeout(() => {
        if (config.nextLevel === "completed") {
          setCertificates(prev => [...prev, "pro"]);
          toast.success("Congratulations! You've completed all levels!", { description: "Download your final certificate." });
        } else {
          setCertificates(prev => [...prev, currentLevel]);
          toast.info(`Moving to ${config.nextLevel.charAt(0).toUpperCase() + config.nextLevel.slice(1)} Level!`);
          setCurrentLevel(config.nextLevel);
        }
      }, 2000);
    } else {
      toast.error("Level Failed", { description: `Required: ${config.minWpm} WPM, ${config.minAccuracy}% accuracy. Restarting...` });
      setTimeout(() => { resetToBeginner(); }, 3000);
    }
  };

  const handleDownloadCertificate = async (level: string) => {
    if (!name.trim()) { setShowNameDialog(true); return; }
    const certLevel = level === "completed" ? "All Levels" : level.charAt(0).toUpperCase() + level.slice(1);
    const certificateData: CertificateData = { 
      studentName: name, 
      courseTitle: `Typing Proficiency - ${language.charAt(0).toUpperCase() + language.slice(1)} ${certLevel}`, 
      courseDescription: `Successfully completed ${language} typing ${level === "completed" ? "proficiency test across all levels" : `practice test at ${level} level`}.`, 
      completionDate: new Date().toLocaleDateString("en-IN"), 
      certificateId: generateCertificateId(), 
      courseDuration: `${results?.timeTaken || 0} seconds` 
    };
    try { await generateCertificatePDF(certificateData); toast.success("Certificate downloaded!"); setShowNameDialog(false); } 
    catch { toast.error("Failed to generate certificate"); }
  };

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;
  const renderText = () => currentText.split("").map((char, i) => {
    let c = "";
    if (i < userInput.length) c = char === userInput[i] ? "text-green-500" : "text-red-500 bg-red-100";
    else if (i === userInput.length) c = "bg-blue-200 animate-pulse";
    return <span key={i} className={c}>{char}</span>;
  });
  const getLevelProgress = () => (certificates.length / 3) * 100;
  const config = levelConfig[currentLevel];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3"><BookOpen className="w-10 h-10" />Online Typing Practice</h1>
          <p className="text-xl opacity-90">Master your typing skills step by step!</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* How it works section */}
        <Card className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
              <BookOpen className="w-5 h-5" />How It Works
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-start gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs">1</span>
                <div>
                  <p className="font-semibold">Start Typing</p>
                  <p className="text-gray-600 dark:text-gray-400">Click "Start Test" and type the shown text in the box below without backspacing or pasting.</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs">2</span>
                <div>
                  <p className="font-semibold">Pass Each Level</p>
                  <p className="text-gray-600 dark:text-gray-400">Meet the minimum WPM and Accuracy requirements to advance to the next level.</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs">3</span>
                <div>
                  <p className="font-semibold">Get Certificate</p>
                  <p className="text-gray-600 dark:text-gray-400">Complete all 3 levels and download your official typing proficiency certificate!</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardContent className="py-4">
            <div className="flex items-center justify-between mb-4">
              <span className="font-semibold flex items-center gap-2"><Target className="w-5 h-5 text-blue-500" />Level Progress</span>
              <span className="text-sm text-gray-500">{certificates.length}/3 Levels Completed</span>
            </div>
            <Progress value={getLevelProgress()} className="h-3" />
            <div className="flex justify-between mt-2 text-sm">
              <span className={`flex items-center gap-1 ${certificates.includes("beginner") ? "text-green-600" : currentLevel === "beginner" ? "text-blue-600" : "text-gray-400"}`}><Star className="w-4 h-4" />Beginner</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className={`flex items-center gap-1 ${certificates.includes("intermediate") ? "text-green-600" : currentLevel === "intermediate" ? "text-blue-600" : "text-gray-400"}`}><Star className="w-4 h-4" />Intermediate</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className={`flex items-center gap-1 ${certificates.includes("pro") ? "text-green-600" : currentLevel === "pro" ? "text-blue-600" : "text-gray-400"}`}><Star className="w-4 h-4" />Pro</span>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><Target className="w-5 h-5 text-blue-500" />Select Language</CardTitle></CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Button variant={language === "english" ? "default" : "outline"} onClick={() => setLanguage("english")} className="flex-1">English</Button>
                <Button variant={language === "hindi" ? "default" : "outline"} onClick={() => setLanguage("hindi")} className="flex-1">Hindi</Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><Trophy className="w-5 h-5 text-yellow-500" />Current Level</CardTitle></CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                {currentLevel === "completed" ? (
                  <span className="flex items-center gap-2 text-green-600 font-bold"><Award className="w-5 h-5" />All Levels Completed!</span>
                ) : (
                  <span className={`px-4 py-2 rounded-lg font-bold ${currentLevel === "beginner" ? "bg-green-100 text-green-700" : currentLevel === "intermediate" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>
                    {currentLevel.charAt(0).toUpperCase() + currentLevel.slice(1)}
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {currentLevel !== "completed" && (
          <Card className="mb-8 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 border-amber-200">
            <CardContent className="py-4">
              <div className="flex flex-wrap items-center justify-center gap-8">
                <span className="flex items-center gap-2 font-medium"><Clock className="w-5 h-5 text-amber-500" />Pass Criteria for {currentLevel}:</span>
                <span className="flex items-center gap-2 font-medium">Min WPM: <span className="text-green-600">{config.minWpm}</span></span>
                <span className="flex items-center gap-2 font-medium">Min Accuracy: <span className="text-blue-600">{config.minAccuracy}%</span></span>
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2"><RefreshCw className="w-5 h-5 text-purple-500" />Typing Test - {language.charAt(0).toUpperCase() + language.slice(1)}</span>
              <Button variant="outline" size="sm" onClick={handleReset}>Reset</Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-4 min-h-[120px]">
              <p className="text-lg leading-relaxed font-mono">{renderText()}</p>
            </div>
            <textarea
              ref={inputRef}
              value={userInput}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onPaste={handlePaste}
              placeholder="Start typing here..."
              disabled={isTestComplete}
              className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px] resize-none font-mono"
            />
            <div className="flex justify-between items-center mt-4">
              <span className="flex items-center gap-2 text-lg"><Clock className="w-5 h-5 text-blue-500" />Time: {formatTime(elapsedTime)}</span>
              {!isTestActive && !isTestComplete && (
                <Button onClick={handleStart} className="bg-green-600 hover:bg-green-700">Start Test</Button>
              )}
              {isTestActive && (
                <Button onClick={handleReset} variant="outline">Reset</Button>
              )}
            </div>
          </CardContent>
        </Card>

        {isTestComplete && results && (
          <Card className="mb-8 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Trophy className="w-6 h-6 text-yellow-500" />Test Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                  <p className="text-sm text-gray-500 mb-1">WPM</p>
                  <p className={`text-3xl font-bold ${results.passed ? "text-green-600" : "text-red-600"}`}>{results.wpm}</p>
                </div>
                <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                  <p className="text-sm text-gray-500 mb-1">Accuracy</p>
                  <p className={`text-3xl font-bold ${results.accuracy >= 90 ? "text-green-600" : results.accuracy >= 70 ? "text-yellow-600" : "text-red-600"}`}>{results.accuracy}%</p>
                </div>
                <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                  <p className="text-sm text-gray-500 mb-1">Errors</p>
                  <p className="text-3xl font-bold text-red-600">{results.errors}</p>
                </div>
                <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                  <p className="text-sm text-gray-500 mb-1">Time</p>
                  <p className="text-3xl font-bold text-blue-600">{formatTime(results.timeTaken)}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button onClick={() => handleDownloadCertificate(currentLevel)} className="flex items-center gap-2">
                  <Award className="w-4 h-4" />Download Certificate
                </Button>
                <Button onClick={initializeTest} variant="outline" className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4" />Try Again
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <Dialog open={showNameDialog} onOpenChange={setShowNameDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Enter Your Name</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="mt-2"
              />
              <Button onClick={() => setShowNameDialog(false)} className="w-full mt-4">Generate Certificate</Button>
            </div>
          </DialogContent>
        </Dialog>

        <Toaster />
      </div>
    </div>
  );
}
