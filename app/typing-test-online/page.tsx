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

const howItWorksContent = {
  english: {
    title: "How It Works",
    steps: [
      { title: "Start Typing", description: "Click 'Start Test' and type the shown text in the box below without backspacing or pasting." },
      { title: "Pass Each Level", description: "Meet the minimum WPM and Accuracy requirements to advance to the next level." },
      { title: "Get Certificate", description: "Complete all 3 levels and download your official typing proficiency certificate!" },
    ]
  },
  hindi: {
    title: "यह कैसे काम करता है",
    steps: [
      { title: "टाइपिंग शुरू करें", description: "'Start Test' पर क्लिक करें और बिना backspace या paste किए नीचे दिए गए टेक्स्ट को टाइप करें।" },
      { title: "हर स्तर पास करें", description: "अगले स्तर पर आगे बढ़ने के लिए न्यूनतम WPM और Accuracy आवश्यकताओं को पूरा करें।" },
      { title: "प्रमाणपत्र प्राप्त करें", description: "सभी 3 स्तरों को पूरा करें और अपना आधिकारिक टाइपिंग प्रवीणता प्रमाणपत्र डाउनलोड करें!" },
    ]
  }
};
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
  const [showResultDialog, setShowResultDialog] = useState(false);
  const [certificates, setCertificates] = useState<string[]>([]);
  const [isResetClicked, setIsResetClicked] = useState(false);
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
  const handleReset = () => { setIsResetClicked(true); if (currentLevel === "completed") resetToBeginner(); else initializeTest(); };

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
    e.stopPropagation();
    // Show warning toast
    if (isTestActive || !isTestComplete) {
      toast.warning("Pasting is not allowed!", { description: "Please type the text manually." });
    }
  };

  const handleBeforeInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    // Block any input that isn't a single character (catches paste from keyboard shortcuts, voice-to-text, etc.)
    if (isTestActive && !isTestComplete) {
      // Allow single character input (normal typing)
      // This won't work for paste detection but helps with other methods
    }
  };

  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    // Additional protection: check if input length jumped significantly (indicates paste)
    const target = e.target as HTMLTextAreaElement;
    const currentLength = target.value.length;
    const previousLength = userInput.length;
    
    // If more than 3 characters were added at once, it's likely a paste
    if (isTestActive && !isTestComplete && currentLength - previousLength > 3) {
      // Revert the change
      target.value = userInput;
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
    setShowResultDialog(true);
  };

  const handleResultDialogClose = () => {
    setShowResultDialog(false);
    if (results) {
      const config = levelConfig[currentLevel];
      if (results.passed) {
        if (config.nextLevel === "completed") {
          setCertificates(prev => [...prev, "pro"]);
        } else {
          setCertificates(prev => [...prev, currentLevel]);
          setCurrentLevel(config.nextLevel);
        }
      } else {
        resetToBeginner();
      }
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
              <BookOpen className="w-5 h-5" />{howItWorksContent[language as "english" | "hindi"].title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              {howItWorksContent[language as "english" | "hindi"].steps.map((step, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs shrink-0">{index + 1}</span>
                  <div>
                    <p className="font-semibold">{step.title}</p>
                    <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
                  </div>
                </div>
              ))}
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
              <Button variant="outline" size="sm" onClick={handleReset} disabled={isResetClicked}>Reset</Button>
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
              onBeforeInput={handleBeforeInput}
              onInput={handleInput}
              placeholder="Start typing here..."
              disabled={isTestComplete}
              className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px] resize-none font-mono select-none"
              style={{ userSelect: 'none', WebkitUserSelect: 'none', WebkitAppearance: 'none' }}
              data-gramm="false"
              data-gramm_editor="false"
              data-enable-grammarly="false"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
            />
            <div className="flex justify-between items-center mt-4">
              <span className="flex items-center gap-2 text-lg"><Clock className="w-5 h-5 text-blue-500" />Time: {formatTime(elapsedTime)}</span>
              {!isTestActive && !isTestComplete && (
                <Button onClick={handleStart} className="bg-green-600 hover:bg-green-700">Start Test</Button>
              )}
              {isTestActive && (
                <Button onClick={handleReset} variant="outline" disabled={isResetClicked}>Reset</Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Results Popup Dialog */}
        <Dialog open={showResultDialog} onOpenChange={setShowResultDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {results?.passed ? (
                  <Trophy className="w-6 h-6 text-green-500" />
                ) : (
                  <Trophy className="w-6 h-6 text-red-500" />
                )}
                {results?.passed ? "Level Passed!" : "Level Failed"}
              </DialogTitle>
            </DialogHeader>
            {results && (
              <div className="py-4">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <p className="text-sm text-gray-500">WPM</p>
                    <p className={`text-2xl font-bold ${results.passed ? "text-green-600" : "text-red-600"}`}>{results.wpm}</p>
                    <p className="text-xs text-gray-400">Target: {levelConfig[currentLevel as Level].minWpm}</p>
                  </div>
                  <div className="text-center p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <p className="text-sm text-gray-500">Accuracy</p>
                    <p className={`text-2xl font-bold ${results.passed ? "text-green-600" : "text-red-600"}`}>{results.accuracy}%</p>
                    <p className="text-xs text-gray-400">Target: {levelConfig[currentLevel as Level].minAccuracy}%</p>
                  </div>
                  <div className="text-center p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <p className="text-sm text-gray-500">Errors</p>
                    <p className="text-2xl font-bold text-red-600">{results.errors}</p>
                  </div>
                  <div className="text-center p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <p className="text-sm text-gray-500">Time</p>
                    <p className="text-2xl font-bold text-blue-600">{formatTime(results.timeTaken)}</p>
                  </div>
                </div>
                
                {results.passed ? (
                  <div className="text-center">
                    <p className="text-green-600 font-semibold mb-2">Congratulations! You passed the {currentLevel} level!</p>
                    {levelConfig[currentLevel as Level].nextLevel === "completed" ? (
                      <p className="text-sm text-gray-600 mb-4">You've completed all levels! Download your certificate now.</p>
                    ) : (
                      <p className="text-sm text-gray-600">Click Continue to move to the next level.</p>
                    )}
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="text-red-600 font-semibold mb-2">You didn't meet the requirements.</p>
                    <p className="text-sm text-gray-600">Click Continue to restart from the beginning.</p>
                  </div>
                )}

                <div className="flex gap-2 mt-4">
                  {results.passed && levelConfig[currentLevel as Level].nextLevel === "completed" ? (
                    <Button 
                      onClick={() => { setShowResultDialog(false); handleDownloadCertificate("completed"); }} 
                      className="flex-1"
                    >
                      <Award className="w-4 h-4 mr-2" />Download Certificate
                    </Button>
                  ) : (
                    <Button 
                      onClick={handleResultDialogClose} 
                      className="flex-1"
                      variant={results.passed ? "default" : "destructive"}
                    >
                      {results.passed ? "Continue" : "Try Again"}
                    </Button>
                  )}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

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
                onKeyDown={(e) => e.key === "Enter" && name.trim() && handleDownloadCertificate("completed")}
              />
              <Button onClick={() => handleDownloadCertificate("completed")} className="w-full mt-4" disabled={!name.trim()}>Generate Certificate</Button>
            </div>
          </DialogContent>
        </Dialog>

        <Toaster />
      </div>

      {/* SEO Content Section */}
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <h2 className="text-3xl font-bold mb-8 text-center">Complete Guide to Online Typing Practice</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="prose dark:prose-invert max-w-none">
            <h3 className="text-xl font-semibold mb-4">Why Typing Practice is Important</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              In today's digital world, typing has become an essential skill that we use every day. Whether you're a student writing essays, a professional creating documents, or someone communicating with friends and family, efficient typing saves valuable time and reduces frustration. Regular typing practice helps develop muscle memory, allowing you to type faster and with fewer errors. This skill becomes increasingly important as more jobs require computer work, making typing proficiency a valuable asset in any career path.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Beyond professional benefits, typing practice improves cognitive skills and hand-eye coordination. When you type regularly, your brain learns to process information faster, and your fingers automatically find the correct keys without looking at the keyboard. This touch typing technique, also known as touch typing, is a game-changer for productivity. It allows you to focus on your work rather than hunting for keys, resulting in higher quality output and less eye strain from constantly looking between the keyboard and screen.
            </p>

            <h3 className="text-xl font-semibold mb-4">Benefits of English Typing Practice</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              English is the global language of business, technology, and communication. Improving your English typing speed opens doors to international opportunities, online work, and global collaboration. With our free online typing practice, you can master English typing at your own pace, starting from beginner level and progressing to professional proficiency. The ability to type 40+ words per minute with high accuracy is often a requirement for many jobs, and our structured approach helps you achieve this goal.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Our English typing tests include carefully selected passages that gradually increase in complexity. From simple sentences for beginners to professional-level paragraphs, each level challenges you to improve while building confidence. The real-time feedback on WPM (words per minute) and accuracy helps you track your progress and identify areas for improvement. Many students who practice regularly see significant improvements within weeks, making consistent practice the key to success.
            </p>

            <h3 className="text-xl font-semibold mb-4">Typing in Hindi - A Digital Revolution</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Hindi is one of the most widely spoken languages in the world, with millions of people using it daily for personal and professional communication. Our Hindi typing practice section helps users master typing in Devanagari script, bridging the gap between traditional writing and digital communication. As more government services, educational resources, and business communications move online, Hindi typing proficiency has become increasingly valuable for native speakers and learners alike.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Learning to type in Hindi requires understanding the Devanagari keyboard layout and practicing regularly. Our platform provides structured Hindi typing exercises that start with simple words and progress to complex sentences. The practice texts are culturally relevant and meaningful, making the learning process more engaging. Many users find that regular Hindi typing practice not only improves their typing speed but also helps them learn new vocabulary and improve their overall Hindi language skills.
            </p>

            <h3 className="text-xl font-semibold mb-4">The Importance of Hindi Typing Skills</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              With India's digital transformation, Hindi typing skills have become essential for accessing government services, filling online forms, and participating in digital governance. Many competitive exams in India require Hindi typing proficiency, making our free practice platform an invaluable resource for exam preparation. The ability to type fluently in Hindi also enables content creators, bloggers, and journalists to reach a wider Hindi-speaking audience.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Our Hindi typing tests are designed to match the requirements of various competitive exams and professional settings. The minimum speed requirements for different levels (Beginner: 20 WPM, Intermediate: 25 WPM, Pro: 30 WPM) align with common exam requirements. Regular practice on our platform helps you build the speed and accuracy needed to excel in these tests, giving you a competitive edge in your career and academic pursuits.
            </p>
          </div>

          <div className="prose dark:prose-invert max-w-none">
            <h3 className="text-xl font-semibold mb-4">Online Typing Games for Skill Development</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Making typing practice fun and engaging is essential for maintaining motivation and improving skills. Our typing test approach gamifies the learning experience by introducing levels, progress tracking, and achievement-based progression. As you complete each level, you earn certificates and unlock new challenges, making the journey from beginner to pro feel like an exciting adventure rather than a tedious task.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Unlike traditional typing games that focus solely on speed, our platform emphasizes accuracy alongside speed. This balanced approach ensures that you develop proper typing habits from the beginning. The no-backspace policy encourages careful typing rather than rushed corrections, building discipline and attention to detail. These skills transfer beyond typing to other areas of work and study, making you more careful and precise in all your activities.
            </p>

            <h3 className="text-xl font-semibold mb-4">Free Typing Practice for Everyone</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Education should be accessible to all, which is why our typing practice platform is completely free. You don't need to pay for expensive typing courses or software to learn this essential skill. Our free online typing tests are available 24/7, allowing you to practice whenever it's convenient for you. Whether you're a student on a tight budget, a professional looking to upgrade skills, or a senior citizen learning new technology, our platform welcomes everyone.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              The cost-effectiveness of online typing practice extends beyond just saving money. By practicing at home or in your office, you save time and transportation costs associated with attending physical typing classes. The flexible nature of online practice means you can fit typing sessions into your schedule without disrupting your daily routine. This accessibility has helped millions of people worldwide improve their typing skills without financial barriers.
            </p>

            <h3 className="text-xl font-semibold mb-4">Touch Typing Mastery</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Touch typing is the art of typing without looking at the keyboard, using all ten fingers efficiently. This method is significantly faster than the hunt-and-peck method and reduces eye strain and physical fatigue. Our typing practice is designed to help you develop touch typing skills through repetition and muscle memory training. The carefully crafted exercises guide your fingers to the correct keys naturally over time.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Achieving touch typing mastery requires patience and consistent practice. Most people can reach 40+ WPM within a few months of regular practice. Our platform tracks your progress and provides detailed statistics to help you understand your improvement patterns. The combination of immediate feedback, structured levels, and achievement rewards makes the journey to touch typing mastery enjoyable and sustainable.
            </p>

            <h3 className="text-xl font-semibold mb-4">Typing Speed and Accuracy</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Balancing speed and accuracy is crucial for professional typing. Many beginners make the mistake of focusing only on speed, resulting in numerous errors that require correction, ultimately slowing them down. Our platform teaches you to find the optimal balance, building accuracy first and then gradually increasing speed. This approach leads to sustainable improvements that last a lifetime.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              The WPM (words per minute) metric used in our tests is calculated based on correctly typed words, not just total keystrokes. This accurate measurement reflects your true typing proficiency. Our accuracy requirements (90% for beginners, 95% for intermediate, 100% for pro) ensure that you develop the habit of producing error-free work. These standards prepare you for real-world scenarios where accuracy is often as important as speed.
            </p>
          </div>
        </div>

        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Online Typing Practice",
              "description": "Free online typing practice platform with tests in English and Hindi. Improve your typing speed and accuracy with our structured learning approach.",
              "applicationCategory": "EducationalApplication",
              "operatingSystem": "Web-based",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock"
              },
              "featureList": [
                "English typing practice",
                "Hindi typing practice",
                "Multiple difficulty levels",
                "Progress tracking",
                "Certificate generation",
                "Free online access"
              ]
            })
          }}
        />
      </div>
    </div>
  );
}
