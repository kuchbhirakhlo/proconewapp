// Prohibited words list for typing test - AdSense compliance
// Students cannot type these words in the typing box

export const prohibitedWords: string[] = [
  // English adult/prohibited words (case insensitive matching)
  "adult",
  "ass",
  "bastard",
  "bitch",
  "blowjob",
  "bollocks",
  "boner",
  "boob",
  "bullshit",
  "cock",
  "cunt",
  "dick",
  "dildo",
  "dyke",
  "fag",
  "faggot",
  "fuck",
  "fucker",
  "fucking",
  "fucks",
  "fucked",
  "gay",
  "jizz",
  "nigger",
  "nigga",
  "penis",
  "porn",
  "pornography",
  "prick",
  "pussy",
  "sex",
  "shit",
  "shitty",
  "shitting",
  "slut",
  "sluts",
  "slutty",
  "tits",
  "titties",
  "titty",
  "twat",
  "vagina",
  "wank",
  "wanker",
  "whore",
  "whores",
  "Anal",
  "Arse",
  "Bitch",
  "Bollocks",
  "Cunt",
  "Fuck",
  "Piss",
  "Shit",
  "Twat",
  "Wank",
  
  // Hindi adult/prohibited words (Devanagari script)
  "गांड",
  "लंड",
  "चूत",
  "भोसड़",
  "भोंसड़",
  "भोसड",
  "भोंसड",
  "बेठ",
  "रांड",
  "रेंड",
  "सुड़ाना",
  "चोद",
  "चोदना",
  "चोदाई",
  "गांडू",
  "गान्डू",
  "मादरचोद",
  "माँचोद",
  "माँचोद",
  "बहनचोद",
  "बहन का",
  "गिलार",
  "गिल्लू",
  "पिछवाड़ा",
  "गुदारा",
  "गुदे",
  "लोल",
  "पॉर्न",
  "सेक्स",
  "काम",
  "कामुक",
  "वासना",
  "हवस",
  "अश्लील",
];

// Check if a word contains any prohibited words
export function containsProhibitedWords(text: string): { isBlocked: boolean; matchedWords: string[] } {
  const lowerText = text.toLowerCase();
  const matchedWords: string[] = [];

  for (const word of prohibitedWords) {
    const lowerWord = word.toLowerCase();
    // Check for exact word match or as part of larger word
    if (lowerText.includes(lowerWord) || 
        new RegExp(`\\b${lowerWord}\\b`, 'i').test(lowerText)) {
      matchedWords.push(word);
    }
  }

  return {
    isBlocked: matchedWords.length > 0,
    matchedWords
  };
}

// Validate input and return warning if prohibited words are found
export function validateTypingInput(text: string): { isValid: boolean; warning: string } {
  const result = containsProhibitedWords(text);
  
  if (result.isBlocked) {
    return {
      isValid: false,
      warning: `Please avoid typing inappropriate words. Found: ${result.matchedWords.join(', ')}`
    };
  }

  return {
    isValid: true,
    warning: ''
  };
}
