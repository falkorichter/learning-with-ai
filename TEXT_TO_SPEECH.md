# Text-to-Speech Feature

## Overview

The vocabulary trainers now include text-to-speech (TTS) functionality that allows you to hear the correct pronunciation of English vocabulary words. This feature uses the browser's built-in Web Speech API, so no external services or API keys are required.

## Features

- **Free and Offline**: Uses the browser's built-in Web Speech API
- **No Setup Required**: Works immediately without any configuration
- **Dynamic Audio Generation**: Generates pronunciation on-the-fly for any text
- **Optimized for Learning**: Speech rate set to 0.9 (slightly slower) for better comprehension
- **Available Everywhere**: Speaker buttons appear in all learning modes

## How to Use

### In the Appearance Vocabulary Trainer (`english/index.html`)

1. **Learn Mode**: 
   - Click the speaker icon (🔊) next to any English word in the vocabulary list
   - The word will be pronounced in English

2. **Quiz Mode**:
   - Click the speaker icon next to any answer option to hear its pronunciation
   - Great for learning proper pronunciation while testing yourself

### In the Dynamic Vocabulary Trainer (`english/with-config.html`)

1. **Flashcard Mode (Lernen)**:
   - Click the green "Pronounce English" button below the flashcard
   - Pronounces the English word shown on the front of the card

2. **List View (Liste)**:
   - Click the speaker icon next to any English word in the vocabulary list
   - Browse and listen to all vocabulary items

3. **Quiz Mode (Quiz üben)**:
   - Click the speaker icon next to any answer option
   - Continue practicing pronunciation even after selecting your answer

## Browser Compatibility

The Web Speech API is supported in most modern browsers:
- ✅ Chrome/Edge (Chromium): Excellent support
- ✅ Safari: Good support
- ✅ Firefox: Supported
- ⚠️ Older browsers: May not support TTS

If your browser doesn't support TTS, you'll see an alert message when clicking a speaker button.

## Technical Details

### Implementation

- **API Used**: Web Speech API (`window.speechSynthesis`)
- **Language**: Set to `en-US` (American English)
- **Speech Rate**: 0.9 (10% slower than normal for learning)
- **Pitch**: 1.0 (normal pitch)

### Code Example

```javascript
function speakText(text) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.rate = 0.9;
        utterance.pitch = 1;
        
        window.speechSynthesis.speak(utterance);
    } else {
        alert('Text-to-Speech is not supported in your browser.');
    }
}
```

## Benefits for Language Learning

1. **Proper Pronunciation**: Hear native-like pronunciation of every word
2. **Self-Paced Learning**: Listen to words as many times as needed
3. **Auditory Learning**: Supports learners who benefit from hearing content
4. **Multisensory Experience**: Combines reading, listening, and interactive testing
5. **Confidence Building**: Learn correct pronunciation before speaking

## Privacy

All text-to-speech processing happens locally in your browser. No data is sent to external servers, ensuring complete privacy for your vocabulary learning.

## Future Enhancements

Potential improvements for future versions:
- Voice selection (male/female voices)
- Adjustable speech rate
- Support for other languages (German, Spanish, etc.)
- Option to auto-play during flashcard study
- Pronunciation practice mode with speech recognition
