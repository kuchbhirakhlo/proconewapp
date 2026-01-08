"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { generateCertificateId, generateCertificatePDF, type CertificateData } from "@/lib/certificate-generator";
import { Trophy, Clock, Target, BookOpen, Timer, RefreshCw } from "lucide-react";

const typingTexts = {
  english: {
    beginner: [
      "The quick brown fox jumps over the lazy dog.",
      "A journey of a thousand miles begins with a single step.",
      "Practice makes perfect.",
      "Time and tide wait for no one.",
      "Where there is a will there is a way.",
    ],
    intermediate: [
      "The only way to do great work is to love what you do.",
      "Success is not final, failure is not fatal.",
      "The future belongs to those who believe in their dreams.",
      "In the middle of difficulty lies opportunity.",
      "Your time is limited, so don't waste it.",
    ],
    pro: [
      "Technology is best when it brings people together.",
      "Keyboard proficiency is a fundamental literacy skill.",
      "The pursuit of excellence in typing demonstrates dedication.",
      "Consistent practice with proper technique achieves mastery.",
      "Mastery is about precision, efficiency, and ergonomics.",
    ],
  },
  hindi: {
    beginner: ["रात बहुत गहरी थी।", "पक्षी ऊपर उड़ रहे थे।", "बच्चे खेल रहे थे।", "फूल बहुत सुंदर थे।", "पानी बहुत ठंडा था।"],
    intermediate: ["हमें अपने लक्ष्य के प्रति समर्पित रहना चाहिए।", "कठिन परिश्रम सफलता की कुंजी है।", "जहां इच्छा है, वहां रास्ता भी बनता है।", "समय का सदुपयोग करना चाहिए।", "सपने देखने की शक्ति रखनी चाहिए।"],
    pro: ["प्रौद्योगिकी ने हमारे जीवन को बहुत आसान बना दिया है।", "कंप्यूटर पर टाइपिंग एक महत्वपूर्ण कौशल है।", "नियमित अभ्यास से महारत हासिल होती है।", "डिजिटल युग में तकनीकी साक्षरता आवश्यक है।", "धैर्य और लगन से सब कुछ संभव है।"],
  },
};

interface TestResult { wpm: number; accuracy: number; errors: number; timeTaken: number; level: string; language: string; passed: boolean; }

export default function TypingTestOnline() {
  const [language, setLanguage] = useState<"english" | "hindi">("english");
  const [difficulty, setDifficulty] = useState<"beginner" | "intermediate" | "pro">("beginner");
  const [currentText, setCurrentText] = useState("");
  const [userInput, setUserInput] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isTestActive, setIsTestActive] = useState(false);
  const [isTestComplete, setIsTestComplete] = useState(false);
  const [results, setResults] = useState<TestResult | null>(null);
  const [name, setName] = useState("");
  const [showNameDialog, setShowNameDialog] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const getRandomText = useCallback(() => typingTexts[language][difficulty][Math.floor(Math.random() * 5)], [language, difficulty]);

  const initializeTest = useCallback(() => {
    setCurrentText(getRandomText());
    setUserInput("");
    setStartTime(null);
    setElapsedTime(0);
    setIsTestActive(false);
    setIsTestComplete(false);
    setResults(null);
  }, [getRandomText]);

  useEffect(() => { initializeTest(); }, [language, difficulty, initializeTest]);

  useEffect(() => {
    if (isTestActive && startTime) {
      timerRef.current = setInterval(() => setElapsedTime(Math.floor((Date.now() - startTime) / 1000)), 1000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isTestActive, startTime]);

  useEffect(() => { if (isTestActive && inputRef.current) inputRef.current.focus(); }, [isTestActive]);

  const handleStart = () => { setIsTestActive(true); setStartTime(Date.now()); if (inputRef.current) inputRef.current.focus(); };
  const handleReset = () => initializeTest();

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!isTestActive) handleStart();
    const value = e.target.value;
    setUserInput(value);
    if (value.length >= currentText.length) completeTest(value);
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
    const minWpm = difficulty === "beginner" ? 15 : difficulty === "intermediate" ? 25 : 35;
    const minAccuracy = difficulty === "beginner" ? 80 : difficulty === "intermediate" ? 85 : 90;
    const passed = wpm >= minWpm && accuracy >= minAccuracy;
    
    const testResults: TestResult = { wpm, accuracy, errors, timeTaken: Math.round((Date.now() - startTime) / 1000), level: difficulty, language, passed };
    setResults(testResults);
    setIsTestActive(false);
    setIsTestComplete(true);
    toast[passed ? "success" : "error"](passed ? "Congratulations! You passed the test!" : "Test completed but criteria not met", { description: passed ? `WPM: ${wpm}, Accuracy: ${accuracy}%` : `Required: ${minWpm} WPM, ${minAccuracy}% accuracy` });
  };

  const handleDownloadCertificate = async () => {
    if (!name.trim()) { setShowNameDialog(true); return; }
    if (!results) return;
    const certificateData: CertificateData = { studentName: name, courseTitle: `Typing Proficiency - ${language.charAt(0).toUpperCase() + language.slice(1)} ${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Level`, courseDescription: `Completed ${language} typing test with ${results.wpm} WPM and ${results.accuracy}% accuracy.`, completionDate: new Date().toLocaleDateString("en-IN"), certificateId: generateCertificateId(), courseDuration: `${results.timeTaken} seconds` };
    try { await generateCertificatePDF(certificateData); toast.success("Certificate downloaded!"); setShowNameDialog(false); } catch { toast.error("Failed to generate certificate"); }
  };

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;
  const { minWpm, minAccuracy } = { minWpm: difficulty === "beginner" ? 15 : difficulty === "intermediate" ? 25 : 35, minAccuracy: difficulty === "beginner" ? 80 : difficulty === "intermediate" ? 85 : 90 };

  const renderText = () => currentText.split("").map((char, i) => {
    let c = "";
    if (i < userInput.length) c = char === userInput[i] ? "text-green-500" : "text-red-500 bg-red-100";
    else if (i === userInput.length) c = "bg-blue-200 animate-pulse";
    return <span key={i} className={c}>{char}</span>;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3"><BookOpen className="w-10 h-10" />Online Typing Practice</h1>
          <p className="text-xl opacity-90">Master your typing skills with interactive tests!</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
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
            <CardHeader><CardTitle className="flex items-center gap-2"><Trophy className="w-5 h-5 text-yellow-500" />Difficulty Level</CardTitle></CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Button variant={difficulty === "beginner" ? "default" : "outline"} onClick={() => setDifficulty("beginner")} className="flex-1">Beginner</Button>
                <Button variant={difficulty === "intermediate" ? "default" : "outline"} onClick={() => setDifficulty("intermediate")} className="flex-1">Intermediate</Button>
                <Button variant={difficulty === "pro" ? "default" : "outline"} onClick={() => setDifficulty("pro")} className="flex-1">Pro</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8 bg-amber-50 dark:bg-amber-950 border-amber-200">
          <CardContent className="py-4">
            <div className="flex flex-wrap items-center justify-center gap-8">
              <span className="flex items-center gap-2 font-medium"><Clock className="w-5 h-5 text-amber-500" />Pass Criteria:</span>
              <span className="flex items-center gap-2 font-medium">Min WPM: <span className="text-green-600">{minWpm}</span></span>
              <span className="flex items-center gap-2 font-medium">Min Accuracy: <span className="text-blue-600">{minAccuracy}%</span></span>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2"><Timer className="w-5 h-5 text-purple-500" />Typing Test - {language.charAt(0).toUpperCase() + language.slice(1)} ({difficulty})</span>
              <span className="text-lg font-mono text-purple-600">Time: {formatTime(elapsedTime)}</span>
            </CardTitle>
            <CardDescription>{!isTestActive && !isTestComplete ? "Click on the text area to start typing" : isTestActive ? "Type the text above!" : "Test completed!"}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg mb-6 text-xl font-mono min-h-[100px]">{renderText()}</div>
            <textarea ref={inputRef} value={userInput} onChange={handleInputChange} placeholder="Start typing..." disabled={isTestComplete} className="w-full p-4 border-2 rounded-lg text-lg min-h-[120px] resize-none" style={{ fontFamily: language === "hindi" ? "sans-serif" : "monospace" }} />
            <div className="flex justify-center gap-4 mt-6"><Button onClick={handleReset} variant="outline" className="gap-2"><RefreshCw className="w-4 h-4" />New Test</Button></div>
          </CardContent>
        </Card>

        {isTestComplete && results && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {results.passed ? <><Trophy className="w-6 h-6 text-yellow-500" />Test Passed!</> : <><Target className="w-6 h-6 text-red-500" />Keep Practicing!</>}
              </CardTitle>
              <CardDescription>{results.passed ? "You passed! Download your certificate." : "Criteria not met. Try again!"}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg"><div className="text-3xl font-bold text-blue-600">{results.wpm}</div><div className="text-sm">WPM</div></div>
                <div className="text-center p-4 bg-green-50 rounded-lg"><div className="text-3xl font-bold text-green-600">{results.accuracy}%</div><div className="text-sm">Accuracy</div></div>
                <div className="text-center p-4 bg-purple-50 rounded-lg"><div className="text-3xl font-bold text-purple-600">{results.errors}</div><div className="text-sm">Errors</div></div>
                <div className="text-center p-4 bg-amber-50 rounded-lg"><div className="text-3xl font-bold text-amber-600">{results.timeTaken}s</div><div className="text-sm">Time</div></div>
              </div>
              {results.passed && (
                <div className="flex justify-center">
                  <Dialog open={showNameDialog} onOpenChange={setShowNameDialog}>
                    <DialogTrigger asChild><Button className="gap-2"><Trophy className="w-4 h-4" />Download Certificate</Button></DialogTrigger>
                    <DialogContent>
                      <DialogHeader><DialogTitle>Enter Your Name</DialogTitle></DialogHeader>
                      <div className="py-4">
                        <Label>Name</Label><Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" className="mt-2" />
                        <Button onClick={handleDownloadCertificate} className="w-full mt-4 gap-2"><Trophy className="w-4 h-4" />Download Certificate</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
      <Toaster />
    </div>
  );
}
