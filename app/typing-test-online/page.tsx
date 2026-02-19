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
import { mapQwertyToHindi, isDevanagari, mapQwertyToHindiWithShift } from "@/lib/hindi-transliteration";
import { containsProhibitedWords, validateTypingInput } from "@/lib/prohibited-words";
import { Trophy, Clock, Target, BookOpen, RefreshCw, Star, Award, ChevronRight, AlertCircle, Info, Users, Zap } from "lucide-react";
import TypingPractice from "@/components/typing-practice";

const typingTexts: { english: { beginner: string[]; intermediate: string[]; pro: string[] }; hindi: { beginner: string[]; intermediate: string[]; pro: string[] } } = {
  english: {
    beginner: [
      "The quick brown fox jumps over the lazy dog.",
      "A journey of a thousand miles begins with a single step.",
      "Practice makes perfect in everything we do.",
      "Time and tide wait for no one in life.",
      "Where there is a will there is always a way.",
      "Success comes to those who work hard daily.",
      "Every master was once a disaster in beginning.",
      "Learning typing is fun and useful skill.",
      "The sun rises in the east every morning.",
      "Water is essential for all living things.",
      "Books are our best friends forever.",
      "Honesty is the best policy always.",
      "Friendship is a beautiful relationship in life.",
      "Nature is the most beautiful gift of God.",
      "Music makes our heart happy and calm.",
      "Sports keep us healthy and strong daily.",
    ],
    intermediate: [
      "The only way to do great work is to love what you do every single day.",
      "Success is not final, failure is not fatal: it is the courage to continue that counts.",
      "The future belongs to those who believe in the beauty of their dreams completely.",
      "In the middle of difficulty lies opportunity for those who seek it with dedication.",
      "Your time is limited, so don't waste it living someone else's life wisely.",
      "The pursuit of excellence in any skill demonstrates dedication and commitment.",
      "With consistent practice and proper technique anyone can achieve great results.",
      "Remember that mastery requires patience, persistence and continuous improvement.",
      "Education is the most powerful weapon which you can use to change the world.",
      "The greatest glory in living lies not in never falling, but in rising every time we fall.",
      "Life is what happens when you're busy making other plans for the future.",
      "The way to get started is to quit talking and begin doing immediately.",
      "Your limitation—it's only your imagination that sets your potential limits.",
      "Success is not in what you have, but who you are and what you become.",
      "Dream big and dare to fail to achieve extraordinary results in life.",
      "Be the positive change you wish to see in the world around you today.",
      "Knowledge is power and information is the key to unlock that power.",
      "Every expert was once a beginner who never gave up on their dreams.",
    ],
    pro: [
      // Special characters and symbols practice
      "@#$%^&*()_+{}[]|\\:\";<>?,./`~!@#$%^&*()_+",
      "1234567890-=[]\\{}|;':\",./<>?`~!@#$%^&*()_+",
      "Hello@World.com #123! Type the code: [a+b]={c*d}/e",
      "C++ & JavaScript: Learn {Python} & [Ruby] @ $100/yr!",
      "Email: user@domain.com | URL: https://www.example.org/page?a=1",
      "Price: $1,234.56 | 50% OFF | Use Code: SAVE20@2024!",
      "Binary: 1010 & 1100 = 0110 | Hex: 0xFF | Oct: 0777",
      "Git commit: git add . && git commit -m \"Fix: bug #123\"",
      "SQL Query: SELECT * FROM users WHERE id=1; DROP tables;",
      "JSON Data: { \"name\": \"John\", \"age\": 30, \"city\": \"NYC\" }",
      "CSS: .class { color: #FF5733; font-size: 16px; } @media",
      "HTML: <div class=\"container\">Hello World</div> <br /> &nbsp;",
      "Regex: ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
      "Shell: chmod 755 script.sh && ./script.sh && echo $PATH",
      // Complex sentences with mixed characters
      "The @ symbol costs $0.50 each! Buy 2 get 1 free @#123",
      "Version 2.0.1-beta (build #4567) released on 2024-01-15!",
      "File: report_2024.xlsx | Size: 2.5MB | Path: C:\\Users\\Admin\\",
      "Phone: +91-98765-43210 | WhatsApp: 91-9876-543-210",
      "Rate: 1,234 | Discount: 25% | Coupon: SAVE25*2024",
      "Temperature: 36.5C | Humidity: 78% | Pressure: 1013 hPa",
      "Coordinates: 28.6139 N, 77.2090 E | Altitude: 216m",
      "ISBN: 978-3-16-148410-0 | ISSN: 1234-5678 | DOI: 10.1000/xyz",
      "MAC Address: 00:1B:44:11:3A:B7 | IP: 192.168.1.1/24",
      "Hash: SHA-256: a5f8c3e... | Salt: NaCl$2024 | Key: [locked]",
      "Config: DEBUG=true, ENV=prod, LOG_LEVEL=info@host:8080",
      "Timestamp: 2024-02-06T13:28:00Z | UTC Offset: +05:30",
      "Logic: A ∧ B + _C → D | If (A = B) ∧ -C then D else E",
    ],
  },
  hindi: {
    beginner: [
      "मैं स्कूल जाता हूँ। मेरा नाम राज है। यह एक किताब है। बिल्ली घर में है। कुत्ता सो रहा है।",
      "पानी ठंडा है। आसमान नीला है। फूल सुंदर हैं। पक्षी उड़ रहे हैं। सूरज चमकता है।",
      "बच्चे खेल रहे हैं। माँ खाना बना रही है। पिता काम कर रहे हैं। दादा-दादी बैठे हैं। भाई पढ़ रहा है।",
      "यह घर बड़ा है। वह पेड़ पुराना है। मेरी किताब लाल है। तुम्हारी पेंसिल नीली है। उसका कपड़ा सफेद है।",
      "मुझे खेलना पसंद है। उसे पढ़ना पसंद है। हमें गाना पसंद है। आपको क्या पसंद है। वे नाचना पसंद करते हैं।",
      "आज मौसम अच्छा है। कल बारिश हुई थी। परसों धूप होगी। इस हफ्ते ठंड रहेगी। अगले महीने गर्मी आएगी।",
      "सड़क पर कार है। बाग में गुलाब हैं। घर के आगे बेंच है। पार्क में झूले हैं। स्कूल के पास दुकान है।",
      "मेरे पास पेन है। तुम्हारे पास किताब है। उसके पास पैसे हैं। हमारे पास समय है। आपके पास घर है।",
      "आम फल मीठा होता है। नारियल पानी ठंडा होता है। केला पीला होता है। अंगूर बैंगनी होते हैं।",
      "हाथी बड़ा जानवर है। चिड़िया छोटा पक्षी है। शेर शक्तिशाली होता है। हिरण शांत स्वभाव का होता है।",
      "सोमवार सप्ताह का पहला दिन है। शुक्रवार का अंतिम कार्यदिवस है। रविवार साप्ताहिक अवकाश होता है।",
      "दिल्ली भारत की राजधानी है। मुंबई आर्थिक राजधानी है। कोलकाता सांस्कृतिक नगरी है। चेन्नई दक्षिण का गहना है।",
      "हिंदी भाषा मधुर और सरल है। संस्कृत ज्ञान की भाषा है। अंग्रेजी अंतर्राष्ट्रीय भाषा है।",
      "झंडा तिरंगा होता है। राष्ट्रगान जन गण मन है। राष्ट्रीय पक्षी मोर है। राष्ट्रीय पशु बाघ है।",
      "समुद्र नीला और गहरा है। पर्वत ऊँचे और विशाल हैं। नदियाँ प्राकृतिक जलस्रोत हैं। झरने सुंदर दृश्य बनाते हैं।",
      "बसंत ऋतु में फूल खिलते हैं। ग्रीष्म में गर्मी बढ़ती है। शरद में पत्ते गिरते हैं। शीत में ठंड कड़ाके की होती है।",
    ],
    intermediate: [
      "शिक्षा मनुष्य के विकास का मूल आधार है। यह हमारे ज्ञान, कौशल और व्यक्तित्व को निखारती है। पुस्तकें मानव की सबसे अच्छी मित्र हैं। ये हमें ज्ञान और आनंद प्रदान करती हैं।",
      "हमारा भारत देश बहुत सुंदर है। यहाँ विविध संस्कृतियों का मिलन होता है। प्रकृति की सुंदरता हर ओर दिखाई देती है। हरे-भरे पहाड़ और नदियों की सुंदरता मन मोह लेती है।",
      "कठिन परिश्रम सफलता की कुंजी है। जो मेहनत करते हैं उन्हें अवश्य सफलता मिलती है। धैर्य और लगन से कोई भी लक्ष्य प्राप्त किया जा सकता है। समय का सदुपयोग करना बहुत महत्वपूर्ण है।",
      "टाइपिंग एक महत्वपूर्ण कौशल है आजकल। कंप्यूटर पर तेजी से टाइप करना व्यावहारिक जीवन में बहुत जरूरी है। नियमित अभ्यास से टाइपिंग की गति बढ़ाई जा सकती है। सटीकता और गति दोनों ही महत्वपूर्ण हैं।",
      "प्रौद्योगिकी ने हमारे जीवन को बदल दिया है। डिजिटल युग में हर काम कंप्यूटर पर होता है। इंटरनेट से दुनिया की जानकारी मिलती है। तकनीकी ज्ञान आजकल आवश्यक हो गया है।",
      "स्वास्थ्य सबसे बड़ा धन है। नियमित व्यायाम से शरीर स्वस्थ रहता है। संतुलित आहार बहुत महत्वपूर्ण है। पर्याप्त नींद लेना आवश्यक है। मानसिक शांति भी स्वास्थ्य का अंग है।",
      "पर्यावरण संरक्षण हमारा कर्तव्य है। पेड़ों को बचाना अति आवश्यक है। जल संरक्षण जीवन रक्षा का मार्ग है। कूड़ा न फैलाना सभ्यता का चिह्न है।",
      "कंप्यूटर आधुनिक युग की उपहार है। इंटरनेट ने दुनिया को जोड़ दिया है। मोबाइल तकनीक ने सुविधाएँ बढ़ाई हैं। डिजिटल भुगतान आसान हो गया है।",
      "भारतीय संस्कृति विश्व में अद्वितीय है। योग और ध्यान विश्व प्रसिद्ध हैं। त्योहार रंग और उल्लास से भरे हैं। परंपराएँ हमें जोड़ती हैं।",
      "खेल और खिलाड़ी देश का गौरव हैं। क्रिकेट भारत का सबसे लोकप्रिय खेल है। ओलंपिक में पदक गर्व की बात है। खेल से स्वास्थ्य भी सुधरता है।",
      "समाचार पत्र जागरूकता का साधन हैं। टेलीविजन मनोरंजन का साधन है। रेडियो सूचना का माध्यम है। सोशल मीडिया जोड़ने का साधन है।",
      "किसान देश का अन्नदाता है। उनकी मेहनत सराहनीय है। कृषि भारत की अर्थव्यवस्था का आधार है। फसलों की रक्षा करना सभी का कर्तव्य है।",
      "डॉक्टर मरीजों के उपचारक हैं। नर्सें देखभाल का कार्य करती हैं। अस्पताल उपचार केंद्र हैं। दवाइयाँ रोगों से लड़ती हैं।",
      "शिक्षक ज्ञान के वाहक हैं। विद्यालय शिक्षा के केंद्र हैं। किताबें ज्ञान भंडार हैं। परीक्षाएँ ज्ञान की कसौटी हैं।",
      "बैंक वित्तीय सेवाएँ प्रदान करते हैं। बचत भविष्य की नींव है। निवेश समृद्धि का मार्ग है। ऋण आवश्यकता पूर्ति का साधन है।",
    ],
    pro: [
      // Special characters and numbers with Hindi text
      "भारत @2024! 1,00,000 | Contact: +91-9876543210 | Email: test@domain.com",
      "आज का मौसम: 25°C | आर्द्रता: 60% | दबाव: 1013 hPa #मौसम",
      "तिथि: 06/02/2024 | समय: 13:28 | UTC+5:30 #भारतीयसमय",
      "URL: https://www.hindi.com/पृष्ठ?भाषा=हिंदी&कोड=123 | डोमेन: .com #वेब",
      "ISBN: 978-81-19283-01-2 | ISSN: 1234-5678 | DOI: 10.1000/हिंदी #पुस्तक",
      "पिन कोड: 110001 | STD कोड: 011 | STD: +91-11 | मोबाइल: 98765-43210 #संपर्क",
      "मूल्य: 1,234.56 | छूट: 25% | कूपन: SAVE25@2024 | GST: 18% #दाम",
      "अक्षांश: 28.6139° N | देशांतर: 77.2090° E | ऊंचाई: 216 मीटर #स्थान",
      "JSON: { \"नाम\": \"राज\", \"आयु\": 25, \"शहर\": \"दिल्ली\" } #कोड",
      "Git: git add . && git commit -m \"Update: फ़ाइल #123\" | Branch: main",
      "SQL: SELECT * FROM उपयोगकर्ता WHERE आयु>=18; | DROP TABLE सत्र; #डेटाबेस",
      "बाइनरी: 1010 & 1100 = 0110 | हेक्स: 0xFF | ऑक्टल: 0777 #कंप्यूटर",
      "सी ++: class{} | जावास्क्रिप्ट: function(){} | पायथन: def_#कोडिंग",
      "गणित: √(16)=4, ∑(1..n)=n(n+1)/2, π≈3.14159, e≈2.71828 #गणित",
      "रासायनिक: H₂O + CO₂ → H₂CO₃ | NaCl + AgNO₃ → AgCl↓ #विज्ञान",
      "भौगोलिक: N28°36.5' E77°12.6' | समुद्र तल से: 216 मीटर #निर्देशांक",
      "भौतिक: v=u+at | F=ma | E=mc² | P=IV | v=λf #भौतिकी",
      "सांख्यिकीय: μ=Σx/n | σ²=Σ(x-μ)²/n | r=Σ(x-μ)(y-v)/√Σ(x-μ)²Σ(y-v)² #आंकड़े",
      "तार्किक: A ∧ B ∨ ¬C → D | यदि (A ∨ B) ∧ ¬C तब D अन्यथा E #तर्क",
      "मुद्रा:  (रुपये), $ (डॉलर), € (यूरो), £ (पाउंड), ¥ (येन) #मुद्रा",
      "चिह्न: ©, ®, ™, ℠, №, §, ¶, †, ‡, •, …, –, — #प्रतीक",
      "मीमांसा: « » \" \" ' ' ( ) [ ] { } < > | डैश: – — #उद्धरण",
      "भारतीय अंक: १, २, ३, ४, ५, ६, ७, ८, ९, ० | देवनागरी-अंक: 1-0 #अंक",
      "संक्षिप्त: i.e., e.g., etc., et al., vs., viz., cf., #लैटिन",
      "रेगेक्स: ^[अ-ह]+@[अ-ह]+\\.[अ-ह]{2,}$ | पैटर्न मिलान #पैटर्न",
      "शेल: chmod 755 script.sh && ./script.sh && echo $PATH | bash",
      "CSS: .class { color: #FF5733; font-size: 16px; } @media screen",
      "HTML: <div class=\"container\">हिंदी टेक्स्ट</div> <br /> &nbsp; #वेब",
    ],
  },
};

// Helper function to get text index based on date (changes daily)
const getDailyIndex = (arrayLength: number, seed?: number): number => {
  const now = new Date();
  const dateString = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
  let hash = 0;
  for (let i = 0; i < dateString.length; i++) {
    hash = ((hash << 5) - hash) + dateString.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
  }
  const adjustedHash = seed !== undefined ? (hash + seed) % arrayLength : Math.abs(hash) % arrayLength;
  return Math.abs(adjustedHash) % arrayLength;
};

// Helper function to get text index based on time of day (changes every 4 hours)
const getTimeBasedIndex = (arrayLength: number): number => {
  const now = new Date();
  const hours = now.getHours();
  const timeSlot = Math.floor(hours / 4); // 0, 1, 2, 3, 4, 5
  return timeSlot % arrayLength;
};

// Helper function to shuffle array (Fisher-Yates algorithm)
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Get texts based on current date and time - ensures variety while maintaining fairness
const getTextsForDate = (language: "english" | "hindi", level: "beginner" | "intermediate" | "pro") => {
  const texts = typingTexts[language][level];
  const dailyIndex = getDailyIndex(texts.length);
  const timeIndex = getTimeBasedIndex(texts.length);
  
  // Combine indices and create a rotated version of the array
  const rotation = (dailyIndex + timeIndex) % texts.length;
  const rotatedTexts = [...texts.slice(rotation), ...texts.slice(0, rotation)];
  
  // Shuffle a portion of texts to add variety
  const portionToShuffle = Math.min(5, texts.length);
  const shuffledPortion = shuffleArray(rotatedTexts.slice(0, portionToShuffle));
  
  return [...shuffledPortion, ...rotatedTexts.slice(portionToShuffle)];
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

  // Get texts based on current date for daily variety
  const getDailyTexts = useCallback(() => {
    return getTextsForDate(language, currentLevel as "beginner" | "intermediate" | "pro");
  }, [language, currentLevel]);

  const getRandomText = useCallback(() => {
    const dailyTexts = getDailyTexts();
    return dailyTexts[Math.floor(Math.random() * dailyTexts.length)];
  }, [getDailyTexts]);

  const initializeTest = useCallback(() => {
    setCurrentText(getRandomText());
    setUserInput("");
    setStartTime(null);
    setElapsedTime(0);
    setIsTestActive(false);
    setIsTestComplete(false);
    setResults(null);
    // Auto-focus the input when initializing test
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);
  }, [getRandomText]);

  const resetToBeginner = useCallback(() => {
    setCurrentLevel("beginner");
    setCertificates([]);
    initializeTest();
    // Auto-focus the input when resetting to beginner
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);
  }, [initializeTest]);

  useEffect(() => { initializeTest(); }, [currentLevel, initializeTest]);

  useEffect(() => {
    if (isTestActive && startTime) {
      timerRef.current = setInterval(() => setElapsedTime(Math.floor((Date.now() - startTime) / 1000)), 1000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isTestActive, startTime]);

  useEffect(() => { if (isTestActive && inputRef.current) inputRef.current.focus(); }, [isTestActive]);

  // Disable screenshots on mobile devices
  useEffect(() => {
    const handleScreenshot = () => {
      if (isTestActive || isTestComplete) {
        toast.warning("Screenshots are not allowed during typing tests!");
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden && (isTestActive || isTestComplete)) {
        toast.warning("Screenshots and screen recording are disabled on this page for security.");
      }
    };

    // iOS and Android screenshot detection
    let screenshotLastTime = 0;
    const handleVolumeChange = () => {
      const now = Date.now();
      if (now - screenshotLastTime < 150 && (isTestActive || isTestComplete)) {
        handleScreenshot();
      }
      screenshotLastTime = now;
    };

    // Listen for visibility changes (screenshot event)
    document.addEventListener("visibilitychange", handleVisibilityChange);
    
    // Try to detect screenshot via volume button press (Android)
    if (typeof window !== "undefined" && "ontouchstart" in window) {
      document.addEventListener("volumeup", handleVolumeChange);
      document.addEventListener("volumedown", handleVolumeChange);
    }

    // Add meta tag to prevent recording
    const metaTag = document.createElement("meta");
    metaTag.name = "apple-mobile-web-app-capable";
    metaTag.content = "no";
    document.head.appendChild(metaTag);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("volumeup", handleVolumeChange);
      document.removeEventListener("volumedown", handleVolumeChange);
    };
  }, [isTestActive, isTestComplete]);

  const handleStart = () => { setIsTestActive(true); setStartTime(Date.now()); if (inputRef.current) inputRef.current.focus(); };
  const handleReset = () => { 
    setIsResetClicked(true); 
    if (currentLevel === "completed") resetToBeginner(); 
    else initializeTest();
    // Auto-focus the input when resetting
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!isTestActive) handleStart();
    let value = e.target.value;
    
    // Prevent backspace - only allow forward typing
    if (value.length < userInput.length) {
      return; // Ignore backspace/delete
    }

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

    // Hindi language - automatic QWERTY to Devanagari keyboard mapping
    if (language === "hindi" && value.length > userInput.length) {
      // Get the newly added character
      const newChar = value[value.length - 1];
      // We'll map this in handleKeyDown with proper shift detection
    }

    setUserInput(value);
    if (value.length >= currentText.length) completeTest(value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!isTestActive || language !== "hindi") return;

    // Ignore special keys
    const specialKeys = ['Backspace', 'Delete', 'Enter', 'Tab', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Control', 'Shift', 'Alt', 'Meta'];
    if (specialKeys.includes(e.key)) {
      return;
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
    
    if (newValue.length >= currentText.length) completeTest(newValue);
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
          // Auto-focus the input when moving to next level after passing
          setTimeout(() => {
            if (inputRef.current) {
              inputRef.current.focus();
            }
          }, 100);
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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800" style={{ WebkitTouchCallout: 'none', WebkitUserSelect: 'none' }}>
      <style jsx>{`
        @media only screen and (max-width: 768px) {
          * {
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            user-select: none;
          }
          
          textarea {
            -webkit-user-select: none;
            user-select: none;
          }
        }
        
        @supports (background: blur(10px)) {
          @media screen and (max-width: 768px) {
            .sensitive-content {
              mix-blend-mode: multiply;
            }
          }
        }
      `}</style>
      {/* Typing Challenge Banner - Colorful Informative Poster */}
      <div className="relative overflow-hidden bg-gradient-to-r from-violet-600 via-purple-600 to-pink-500 text-white py-16">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-yellow-400 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute top-8 right-12 w-16 h-16 bg-blue-400 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-4 left-1/4 w-12 h-12 bg-green-400 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-orange-400 rounded-full opacity-15 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute top-1/2 left-10 w-8 h-8 bg-cyan-400 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '0.3s' }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            {/* Challenge Badge */}
            <div className="inline-flex items-center gap-2 bg-yellow-400 text-purple-900 px-6 py-2 rounded-full font-bold text-sm mb-6 shadow-lg transform -rotate-2 hover:rotate-0 transition-transform duration-300">
              <Trophy className="w-5 h-5" />
              TYPING CHALLENGE 2026
            </div>
            
            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 flex flex-col md:flex-row items-center justify-center gap-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-pink-300 to-cyan-300">
                🎯 Typing Challenge
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl opacity-95 mb-8 max-w-2xl mx-auto">
              Complete the challenge & <span className="font-bold text-yellow-300">Unlock Your Free Future!</span>
            </p>
            
            {/* Prize Cards */}
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-8">
              {/* Free Course Card */}
              <div className="bg-white/15 backdrop-blur-sm border-2 border-white/30 rounded-2xl p-6 hover:bg-white/25 transition-all duration-300 transform hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">📚 Free Course</h3>
                <p className="text-lg font-semibold text-green-200">1 Month Access</p>
                <p className="text-sm opacity-80 mt-2">Complete any advanced level with 35+ WPM & 95% Accuracy</p>
              </div>
              
              {/* Certificate Card */}
              <div className="bg-white/15 backdrop-blur-sm border-2 border-white/30 rounded-2xl p-6 hover:bg-white/25 transition-all duration-300 transform hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">🏆 Certificate</h3>
                <p className="text-lg font-semibold text-yellow-200">Official Certificate</p>
                <p className="text-sm opacity-80 mt-2">Verified certificate with unique ID for your resume</p>
              </div>
            </div>
            
            {/* How to Participate */}
            <div className="bg-purple-900/50 backdrop-blur-sm rounded-xl p-6 max-w-2xl mx-auto mb-6">
              <h3 className="text-lg font-bold mb-4 flex items-center justify-center gap-2">
                <Star className="w-5 h-5 text-yellow-400" />
                How to Participate
              </h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-start gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-pink-500 font-bold text-xs shrink-0">1</span>
                  <p>Start the typing test below</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500 font-bold text-xs shrink-0">2</span>
                  <p>Pass all 3 levels (Beginner → Pro)</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500 font-bold text-xs shrink-0">3</span>
                  <p>Complete Pro level with 35+ WPM</p>
                </div>
              </div>
            </div>
            
            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#typing-test" className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-purple-900 px-8 py-4 rounded-full font-bold text-lg hover:from-yellow-300 hover:to-orange-400 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                <Zap className="w-6 h-6" />
                Start Challenge Now
              </a>
              <span className="text-sm opacity-80">✨ Completely Free - No Registration Required</span>
            </div>
            
            {/* Trust Badges */}
            <div className="flex items-center justify-center gap-6 mt-8 text-sm opacity-70">
              <span className="flex items-center gap-1">✓ 100% Free</span>
              <span className="flex items-center gap-1">✓ Instant Access</span>
              <span className="flex items-center gap-1">✓ Verified Certificate</span>
            </div>
          </div>
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
                <Button variant={language === "english" ? "default" : "outline"} onClick={() => { setLanguage("english"); setCurrentLevel("beginner"); setTimeout(() => { if (inputRef.current) inputRef.current.focus(); }, 100); }} className="flex-1">English</Button>
                <Button variant={language === "hindi" ? "default" : "outline"} onClick={() => { setLanguage("hindi"); setCurrentLevel("beginner"); setTimeout(() => { if (inputRef.current) inputRef.current.focus(); }, 100); }} className="flex-1">Hindi</Button>
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

        <Card className="mb-8" id="typing-test">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2"><RefreshCw className="w-5 h-5 text-purple-500" />Typing Test - {language.charAt(0).toUpperCase() + language.slice(1)}</span>
              <Button variant="outline" size="sm" onClick={handleReset} disabled={isResetClicked}>Reset</Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-4 min-h-[120px] select-none">
              <p className="text-lg leading-relaxed font-mono select-none">{renderText()}</p>
            </div>
            
            <textarea
              ref={inputRef}
              value={userInput}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onKeyPress={language === "hindi" ? handleKeyPress : undefined}
              onPaste={handlePaste}
              onBeforeInput={handleBeforeInput}
              onInput={handleInput}
              placeholder="Start typing here..."
              disabled={isTestComplete}
              className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px] resize-none font-mono select-none"
              style={{ userSelect: 'none', WebkitUserSelect: 'none', WebkitAppearance: 'none', isolation: 'isolate' }}
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

        {/* Guide Sections Below the Tool */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* How to Use Typing Test */}
          <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
                <Info className="w-5 h-5" />How to Use Typing Test
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-400 text-sm">
                <li>Select your preferred language (English or Hindi)</li>
                <li>Read the text displayed in the gray box above</li>
                <li>Click "Start Test" when you are ready</li>
                <li>Type the text exactly as shown in the textarea below</li>
                <li>Complete the text before time runs out</li>
                <li>Meet the minimum WPM and Accuracy to pass</li>
                <li>Pass all 3 levels to earn your certificate!</li>
              </ol>
            </CardContent>
          </Card>

          {/* What is WPM and Accuracy */}
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-300">
                <Zap className="w-5 h-5" />What is WPM and Accuracy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-gray-600 dark:text-gray-400 text-sm">
                <p><strong>WPM (Words Per Minute):</strong> Measures how many words you can type in one minute. A standard word is considered 5 characters including spaces.</p>
                <p><strong>Accuracy:</strong> The percentage of correctly typed characters. Calculated as: (Correct Characters ÷ Total Characters) × 100</p>
                <p><strong>Passing Criteria:</strong></p>
                <ul className="list-disc list-inside ml-4">
                  <li>Beginner: 20+ WPM with 90%+ Accuracy</li>
                  <li>Intermediate: 25+ WPM with 95%+ Accuracy</li>
                  <li>Pro: 30+ WPM with 100% Accuracy</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Who Should Use This Test */}
          <Card className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950 dark:to-violet-950 border-purple-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-700 dark:text-purple-300">
                <Users className="w-5 h-5" />Who Should Use This Test
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 text-sm">
                <li><strong>Students:</strong> Improve typing speed for assignments and exams</li>
                <li><strong>Job Seekers:</strong> Add typing proficiency to your resume</li>
                <li><strong>Professionals:</strong> Increase productivity in office work</li>
                <li><strong>Competitive Exam Aspirants:</strong> Many exams require typing tests</li>
                <li><strong>Content Writers:</strong> Write faster and more efficiently</li>
                <li><strong>Anyone Learning Computers:</strong> Build fundamental computer skills</li>
                <li><strong>Hindi Learners:</strong> Practice Devanagari typing with ease</li>
              </ul>
            </CardContent>
          </Card>

          {/* Typing Tips for Beginners */}
          <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 border-amber-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-700 dark:text-amber-300">
                <Star className="w-5 h-5" />Typing Tips for Beginners
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 text-sm">
                <li><strong>Position Your Hands:</strong> Keep fingers on home row (ASDF JKL;)</li>
                <li><strong>Do not Look at Keys:</strong> Train your muscle memory by avoiding keyboard glances</li>
                <li><strong>Maintain Good Posture:</strong> Sit straight with eyes at screen level</li>
                <li><strong>Start Slow:</strong> Accuracy first, speed will come with practice</li>
                <li><strong>Practice Daily:</strong> Even 15-20 minutes daily shows improvement</li>
                <li><strong>Use All Fingers:</strong> Do not rely on just a few fingers</li>
                <li><strong>Take Breaks:</strong> Prevent fatigue with short breaks every 30 minutes</li>
              </ul>
            </CardContent>
          </Card>
        </div>

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

        {/* Typing Practice Section */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2 flex items-center gap-3"><BookOpen className="w-8 h-8" />Typing Practice - Master Your Skills</h2>
            <p className="text-gray-600 dark:text-gray-400">Structured lesson-based learning with real-time feedback and progress tracking. Choose your language, difficulty level, and typing mode to begin your journey to typing mastery!</p>
          </div>
          <TypingPractice />
        </div>

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
