# Typing Practice - Typing Master Software Feature

A comprehensive, lesson-based typing practice system with real-time feedback, progress tracking, and language support for both English and Hindi.

## Features

### 🌍 Multi-Language Support
- **English**: 15 lessons across 3 difficulty levels (Beginner → Intermediate → Advanced)
- **Hindi (हिंदी)**: 12 lessons with Devanagari script support for InScript keyboards
- Unicode compatible - uses system fonts (no external font dependencies)

### 📚 Structured Learning
- **Beginner Level**: Home row keys, top row, bottom row, common words, simple sentences
- **Intermediate Level**: Speed building, professional content, technical writing, long-form accuracy
- **Advanced Level**: Expert velocity, literary excellence, complex vocabulary

### ⏱️ Multiple Typing Modes
1. **Lesson Mode** - Progressive lessons with pass/fail requirements
2. **1-Minute Test** - Quick speed test
3. **3-Minute Test** - Standard typing test
4. **5-Minute Test** - Extended endurance test

### 📊 Real-Time Metrics
- **WPM (Words Per Minute)** - Accurate typing speed calculation
- **Accuracy** - Percentage of correctly typed characters
- **Errors** - Total character mistakes
- **Characters Per Second** - CPS metric
- **Elapsed Time** - Total time taken

### 🎯 Visual Feedback
- **Green Highlighting** - Correctly typed characters
- **Red Highlighting** - Incorrect characters with red background
- **Blue Pulse** - Current cursor position
- Color-coded accuracy indicators (green ≥95%, yellow ≥90%, red <90%)

### 🤖 Smart Suggestions
- Performance-based recommendations
- Tips for speed improvement
- Accuracy enhancement suggestions
- Encouragement messages based on metrics

### 📈 Progress Tracking
- Track attempts per lesson
- Best WPM and accuracy records
- Completion status for each lesson
- Overall progress percentage by difficulty level

### 🎓 Lesson Requirements
Each lesson has minimum requirements:
- **Beginner**: 20 WPM, 90% accuracy
- **Intermediate**: 25 WPM, 95% accuracy
- **Advanced**: 35+ WPM, 98% accuracy

### 🎨 Student-Friendly UI
- Responsive design (mobile, tablet, desktop)
- Dark mode support
- Intuitive controls
- Real-time metrics display
- Progress visualization

### 🛡️ Anti-Cheating Measures
- No backspace allowed - enforces careful typing
- Paste detection and prevention
- Input validation for legitimate keystrokes
- Real character-by-character validation

## File Structure

```
lib/
├── typing-lessons.ts          # Lesson data and utilities
hooks/
├── useTypingPractice.ts       # Custom hooks for typing state & metrics
components/
├── typing-practice.tsx         # Main typing practice component
app/
└── typing-test-online/
    └── page.tsx               # Main page with integration
```

## Component API

### TypingPractice Component

Main component that provides the full typing practice interface.

```tsx
import TypingPractice from "@/components/typing-practice";

export default function Page() {
  return <TypingPractice />;
}
```

### Hooks

#### useTypingMetrics
Calculates real-time typing metrics.

```tsx
const metrics = useTypingMetrics(text, userInput, startTime);
// Returns: { wpm, accuracy, errors, totalChars, correctChars, elapsedTime, charactersPerSecond }
```

#### useProgressTracking
Manages lesson progress and statistics.

```tsx
const { progress, updateProgress, getProgressPercentage, getLessonProgress } = 
  useProgressTracking(language);
```

#### useTimerMode
Manages timed typing tests.

```tsx
const timerMode = useTimerMode(initialDuration);
// Methods: start(), stop(), reset()
```

### Utilities

#### calculateSmartSuggestions
Generates performance-based suggestions.

```tsx
const suggestions = calculateSmartSuggestions(wpm, accuracy);
// Returns: string[]
```

#### formatTime
Formats seconds to MM:SS format.

```tsx
const formatted = formatTime(125); // "2:05"
```

## Lesson Data Structure

```typescript
interface Lesson {
  id: string;
  level: "beginner" | "intermediate" | "advanced";
  language: "english" | "hindi";
  title: string;
  description: string;
  topic: string;
  texts: string[];          // Array of practice texts
  minWpm: number;           // Minimum WPM to pass
  minAccuracy: number;      // Minimum accuracy to pass
  estimatedTime: number;    // Time in seconds
  difficulty: number;       // 1-10 scale
}
```

## Usage Examples

### Basic Integration

```tsx
import TypingPractice from "@/components/typing-practice";

export default function Page() {
  return (
    <div>
      <h1>Learn Typing</h1>
      <TypingPractice />
    </div>
  );
}
```

### Custom Implementation

```tsx
import { useTypingMetrics, useProgressTracking } from "@/hooks/useTypingPractice";
import { getLessonsByLanguageAndLevel } from "@/lib/typing-lessons";

function CustomTyping() {
  const { progress, updateProgress } = useProgressTracking("english");
  const lessons = getLessonsByLanguageAndLevel("english", "beginner");
  const metrics = useTypingMetrics(text, userInput, startTime);

  // Your custom implementation
}
```

## Keyboard Compatibility

### English
- Standard QWERTY layout
- All standard characters supported
- No special configuration needed

### Hindi
- Devanagari script (Marathi, Konkani, Sindhi compatible)
- InScript keyboard layout support
- Unicode characters (U+0900 - U+097F)
- Lipi (Remington, Inscript, Phonetic) compatible

## Performance Considerations

- **Real-time Updates**: Metrics update on every keystroke
- **Efficient Rendering**: Only affected DOM elements re-render
- **Memory Optimized**: Progress stored in component state
- **No External Dependencies**: Uses system fonts exclusively

## Accessibility Features

- Keyboard navigation support
- Clear visual feedback
- Readable contrast ratios (WCAG AA compliant)
- Semantic HTML structure
- Focus management for screen readers

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Android Chrome)

## Customization

### Adding New Lessons

Edit `/lib/typing-lessons.ts`:

```typescript
export const typingLessons: Lesson[] = [
  // ... existing lessons
  {
    id: "en-custom-1",
    level: "beginner",
    language: "english",
    title: "Your Custom Lesson",
    description: "Your description",
    topic: "Your Topic",
    texts: ["text 1", "text 2", "text 3"],
    minWpm: 20,
    minAccuracy: 90,
    estimatedTime: 60,
    difficulty: 2,
  },
];
```

### Changing Pass Requirements

Modify requirements in `typing-practice.tsx`:

```typescript
const levels = {
  beginner: { minWpm: 20, minAccuracy: 90 },
  intermediate: { minWpm: 25, minAccuracy: 95 },
  advanced: { minWpm: 35, minAccuracy: 98 },
};
```

## Statistics

- **Total Lessons**: 27 (15 English + 12 Hindi)
- **Difficulty Range**: 1-10 scale
- **Languages**: 2 (English, Hindi)
- **Levels**: 3 (Beginner, Intermediate, Advanced)
- **Typing Modes**: 4 (Lesson, 1min, 3min, 5min)

## API Reference

### Lesson Functions

```typescript
// Get lessons by language and level
getLessonsByLanguageAndLevel(language, level): Lesson[]

// Get all lessons for a language
getLessonsByLanguage(language): Lesson[]

// Calculate average difficulty
calculateDifficultyScore(lessons): number
```

## Testing

To test the typing practice:

1. Navigate to `/typing-test-online` page
2. Scroll to "Typing Practice - Master Your Skills" section
3. Select language (English or Hindi)
4. Choose difficulty level
5. Select typing mode
6. Click "Start Test" and begin typing

## Troubleshooting

### Issue: Hindi characters not displaying correctly
- **Solution**: Ensure your system has Unicode font support (Devanagari compatible)
- **Alternative**: Use Noto Sans Devanagari system font

### Issue: Paste is blocked
- **Intended**: Paste is disabled to ensure genuine typing practice
- **Workaround**: Type manually or use character-by-character input

### Issue: WPM calculation seems low
- **Note**: WPM is calculated based on correctly typed words only
- Errors and extra characters reduce word count

### Issue: Accuracy not reaching 100%
- **Tip**: Accuracy percentage is rounded; minor deviations are normal
- Focus on reducing mistakes to reach 99-100%

## Performance Tips

1. **Practice Regularly**: Consistent daily practice yields best results
2. **Focus on Accuracy First**: Speed naturally improves with accuracy
3. **Progressive Difficulty**: Complete beginner level before intermediate
4. **Take Breaks**: Prevent fatigue with 5-minute breaks between tests
5. **Proper Posture**: Maintain correct typing posture for speed and health

## Future Enhancements

- [ ] Leaderboard system
- [ ] Detailed analytics dashboard
- [ ] Custom lesson creation
- [ ] Multiplayer typing competitions
- [ ] Achievement badges
- [ ] Voice-based feedback
- [ ] Typing game modes (typing games)
- [ ] Mobile app
- [ ] Offline mode

## License

Part of the ProCone App typing practice suite.

## Support

For issues or suggestions, please contact the development team or submit feedback through the app.
