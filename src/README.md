# Quiz Logic Module

This directory contains the shared quiz logic used by both vocabulary trainers.

## Files

- **quiz-logic.js** - Reusable quiz generation logic with category-based filtering
- **quiz-logic.simple-test.js** - Test suite for the quiz logic (no dependencies required)
- **quiz-logic.test.js** - Jest-based test suite (optional, for advanced testing)

## Usage

### In HTML Files

Include the script in your HTML file:

```html
<script src="../src/quiz-logic.js"></script>
```

Then use the functions via the `window.QuizLogic` object:

```javascript
const { generateQuizQuestion, MIN_CATEGORY_SIZE } = window.QuizLogic;

// Your vocabulary data
const vocabData = {
    "Category 1": [
        { en: "word1", de: "wort1" },
        { en: "word2", de: "wort2" },
        // ...
    ]
};

// Generate a quiz question
const quiz = generateQuizQuestion(vocabData, 'en');
console.log(quiz.target);   // The correct answer
console.log(quiz.options);  // Array of 4 options (3 distractors + 1 correct)
```

### In Node.js

```javascript
const { generateQuizQuestion } = require('./src/quiz-logic.js');

const quiz = generateQuizQuestion(vocabData, 'q');
```

## Testing

Run tests with:

```bash
npm test
```

This runs the simple test suite that has no external dependencies.

For advanced testing with Jest:

```bash
npm run test:jest
```

## API Documentation

### `MIN_CATEGORY_SIZE`

Constant that defines the minimum number of words required in a category for category-only quiz generation (currently 4).

### `getAllVocabs(vocabData)`

Returns all vocabularies as a flat array.

### `getAllVocabsWithCategory(vocabData)`

Returns all vocabularies with their category information attached.

### `getVocabsFromCategory(vocabData, category)`

Returns vocabularies from a specific category.

### `generateQuizQuestion(vocabData, questionField = 'en')`

Generates a quiz question with category-based filtering.

**Parameters:**
- `vocabData` - Object with categories as keys and vocab arrays as values
- `questionField` - Field name for the question text (default: 'en')

**Returns:** Object with:
- `target` - The correct answer vocabulary object
- `options` - Array of 4 vocabulary objects (shuffled)
- `categorySize` - Number of words in the target's category
- `usedCategoryOnly` - Boolean indicating if only category words were used

**Behavior:**
- If category has >= 4 words: Uses only words from the same category
- If category has < 4 words: Uses all available words as fallback
