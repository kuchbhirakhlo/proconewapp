// Hindi QWERTY Keyboard Layout Mapping
// Maps QWERTY keys directly to Devanagari characters (InScript layout)
// Each key has normal and shift state

// Interface for keyboard key mapping with normal and shift states
interface KeyMapping {
  normal: string;
  shift: string;
}

// QWERTY to Devanagari Keyboard Layout with Shift support
// Format: key: { normal: "character without shift", shift: "character with shift" }
export const hindiQwertyLayout: { [key: string]: KeyMapping } = {
  // Backtick/Tilde row
  "`": { normal: "्", shift: "़" },

  // Number row
  "1": { normal: "१", shift: "!" },
  "2": { normal: "२", shift: "@" },
  "3": { normal: "३", shift: "#" },
  "4": { normal: "४", shift: "$" },
  "5": { normal: "५", shift: "%" },
  "6": { normal: "६", shift: "^" },
  "7": { normal: "७", shift: "&" },
  "8": { normal: "८", shift: "*" },
  "9": { normal: "९", shift: "(" },
  "0": { normal: "०", shift: ")" },
  "-": { normal: "-", shift: "_" },
  "=": { normal: "=", shift: "+" },

  // Top row (QWERTY)
  "q": { normal: "औ", shift: "ौ" },
  "w": { normal: "ऐ", shift: "ै" },
  "e": { normal: "आ", shift: "ा" },
  "r": { normal: "ई", shift: "ी" },
  "t": { normal: "ऊ", shift: "ू" },
  "y": { normal: "भ", shift: "ः" },
  "u": { normal: "ङ", shift: "ॅ" },
  "i": { normal: "घ", shift: "़" },
  "o": { normal: "ध", shift: "ॉ" },
  "p": { normal: "झ", shift: "्" },
  "[": { normal: "ढ", shift: "ड" },
  "]": { normal: "ञ", shift: "ज" },
  "\\": { normal: "ऑ", shift: "ॉ" },

  // Middle row (ASDFGH...)
  "a": { normal: "ओ", shift: "ो" },
  "s": { normal: "ए", shift: "े" },
  "d": { normal: "अ", shift: "ि" },
  "f": { normal: "इ", shift: "ी" },
  "g": { normal: "उ", shift: "ु" },
  "h": { normal: "फ", shift: "ू" },
  "j": { normal: "र", shift: "ऋ" },
  "k": { normal: "क", shift: "ख" },
  "l": { normal: "त", shift: "थ" },
  ";": { normal: "च", shift: "छ" },
  "'": { normal: "ट", shift: "ठ" },

  // Bottom row (ZXCVBN...)
  "z": { normal: "्", shift: "ँ" },
  "x": { normal: "ं", shift: "ः" },
  "c": { normal: "म", shift: "ण" },
  "v": { normal: "न", shift: "ञ" },
  "b": { normal: "व", shift: "ॅ" },
  "n": { normal: "ल", shift: "ळ" },
  "m": { normal: "स", shift: "श" },
  ",": { normal: ",", shift: "<" },
  ".": { normal: "।", shift: ">" },
  "/": { normal: "?", shift: "/" },

  // Spaces and special keys remain the same
  " ": { normal: " ", shift: " " },
};

/**
 * Map QWERTY keyboard input to Devanagari characters with Shift support
 * Uses key code and shift state to determine correct character
 */
export function mapQwertyToHindiWithShift(text: string, key: string, isShift: boolean): string {
  const keyMap = hindiQwertyLayout[key.toLowerCase()];
  
  if (!keyMap) {
    // Character not in our mapping, return as-is
    return text + key;
  }

  const mapping = isShift ? keyMap.shift : keyMap.normal;
  return text + mapping;
}

/**
 * Map QWERTY keyboard input directly to Devanagari characters (legacy function)
 * This function now converts text that was already entered to Devanagari
 * For proper Shift support, use mapQwertyToHindiWithShift with key events instead
 */
export function mapQwertyToHindi(text: string): string {
  if (!text) return "";

  let result = "";
  for (let char of text) {
    const keyMap = hindiQwertyLayout[char.toLowerCase()];
    if (keyMap) {
      // For legacy compatibility, return normal state
      result += keyMap.normal;
    } else {
      result += char;
    }
  }
  return result;
}

/**
 * Check if text contains Devanagari characters
 */
export function isDevanagari(text: string): boolean {
  const devanagariRegex = /[\u0900-\u097F]/;
  return devanagariRegex.test(text);
}

/**
 * Count words in transliterated Hindi text
 */
export function countHindiWords(text: string): number {
  return text.trim().split(/\s+/).filter(word => word.length > 0).length;
}
