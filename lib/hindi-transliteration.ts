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
 "`": { normal: "़", shift: "ऍ" }
,

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
"=": { normal: "=", shift: "+" }
,

  // Top row (QWERTY)
 "q": { normal: "ौ", shift: "औ" },
"w": { normal: "ै", shift: "ऐ" },
"e": { normal: "ा", shift: "आ" },
"r": { normal: "ी", shift: "ई" },
"t": { normal: "ू", shift: "ऊ" },
"y": { normal: "ब", shift: "भ" },
"u": { normal: "ह", shift: "ङ" },
"i": { normal: "ग", shift: "घ" },
"o": { normal: "द", shift: "ध" },
"p": { normal: "ज", shift: "झ" },
"[": { normal: "ड", shift: "ढ" },
"]": { normal: "़", shift: "ञ" },
"\\": { normal: "ॉ", shift: "ऑ" }
,

  // Middle row (ASDFGH...)
  "a": { normal: "ो", shift: "ओ" },
"s": { normal: "े", shift: "ए" },
"d": { normal: "ि", shift: "अ" },
"f": { normal: "ी", shift: "इ" },
"g": { normal: "ु", shift: "उ" },
"h": { normal: "प", shift: "फ" },
"j": { normal: "र", shift: "ऋ" },
"k": { normal: "क", shift: "ख" },
"l": { normal: "त", shift: "थ" },
";": { normal: "च", shift: "छ" },
"'": { normal: "ट", shift: "ठ" }
,

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
"/": { normal: "य", shift: "?" }
,

  // Spaces and special keys remain the same
 " ": { normal: " ", shift: " " }
,
};

// Map keyboard codes to character keys (handles shift issue with special chars)
// e.code gives us the physical key location, not the character produced
const keyCodeToChar: { [code: string]: string } = {
  "Backquote": "`",
  "Digit1": "1", "Digit2": "2", "Digit3": "3", "Digit4": "4", "Digit5": "5",
  "Digit6": "6", "Digit7": "7", "Digit8": "8", "Digit9": "9", "Digit0": "0",
  "Minus": "-", "Equal": "=",
  "KeyQ": "q", "KeyW": "w", "KeyE": "e", "KeyR": "r", "KeyT": "t",
  "KeyY": "y", "KeyU": "u", "KeyI": "i", "KeyO": "o", "KeyP": "p",
  "BracketLeft": "[", "BracketRight": "]", "Backslash": "\\",
  "KeyA": "a", "KeyS": "s", "KeyD": "d", "KeyF": "f", "KeyG": "g",
  "KeyH": "h", "KeyJ": "j", "KeyK": "k", "KeyL": "l",
  "Semicolon": ";", "Quote": "'",
  "KeyZ": "z", "KeyX": "x", "KeyC": "c", "KeyV": "v", "KeyB": "b",
  "KeyN": "n", "KeyM": "m", "Comma": ",", "Period": ".", "Slash": "/",
  "Space": " "
};

/**
 * Map QWERTY keyboard input to Devanagari characters with Shift support
 * Uses keyboard code (physical key) and shift state to determine correct character
 * This handles special characters like shift+; correctly
 */
export function mapQwertyToHindiWithShift(text: string, key: string, isShift: boolean, code?: string): string {
  let charToMap = key;
  
  // If code is provided, use it to get the physical key (better for shift+special chars)
  if (code && keyCodeToChar[code]) {
    charToMap = keyCodeToChar[code];
  } else {
    // Fallback: try exact match first (for special characters like ';', ',', '.', etc.)
    if (!hindiQwertyLayout[key]) {
      // If not found, try lowercase (for alphabetic keys)
      if (key.length === 1) {
        charToMap = key.toLowerCase();
      }
    } else {
      charToMap = key;
    }
  }
  
  const keyMap = hindiQwertyLayout[charToMap];
  
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
