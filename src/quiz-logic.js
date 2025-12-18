/**
 * Shared quiz logic for vocabulary trainers
 * This module provides reusable functions for generating quiz questions
 * with category-based filtering.
 */

// Minimum number of words required in a category to generate quiz within that category only
const MIN_CATEGORY_SIZE = 4;

/**
 * Get all vocabularies from all categories as a flat list
 * @param {Object} vocabData - Object with categories as keys and vocab arrays as values
 * @returns {Array} Flat array of all vocabularies
 */
function getAllVocabs(vocabData) {
    let all = [];
    Object.values(vocabData).forEach(list => {
        all = [...all, ...list];
    });
    return all;
}

/**
 * Get all vocabs with their category information
 * @param {Object} vocabData - Object with categories as keys and vocab arrays as values
 * @returns {Array} Array of vocabularies with category field added
 */
function getAllVocabsWithCategory(vocabData) {
    let all = [];
    Object.entries(vocabData).forEach(([category, list]) => {
        list.forEach(vocab => {
            all.push({ ...vocab, category });
        });
    });
    return all;
}

/**
 * Get vocabs from a specific category
 * @param {Object} vocabData - Object with categories as keys and vocab arrays as values
 * @param {string} category - Category name
 * @returns {Array} Array of vocabularies in the specified category
 */
function getVocabsFromCategory(vocabData, category) {
    return vocabData[category] || [];
}

/**
 * Generate a quiz question with category-based filtering
 * @param {Object} vocabData - Object with categories as keys and vocab arrays as values
 * @param {string} questionField - Field name for the question (e.g., 'en', 'q')
 * @returns {Object} Quiz question object with target and options
 */
function generateQuizQuestion(vocabData, questionField = 'en') {
    // Get all vocabs with category information
    const allVocabsWithCategory = getAllVocabsWithCategory(vocabData);
    
    if (allVocabsWithCategory.length === 0) {
        return null;
    }
    
    // Select random target word
    const randomTarget = allVocabsWithCategory[Math.floor(Math.random() * allVocabsWithCategory.length)];
    
    // Get vocabs from the same category
    const categoryVocabs = getVocabsFromCategory(vocabData, randomTarget.category);
    
    // Determine which pool to use for distractors
    let vocabPool;
    if (categoryVocabs.length < MIN_CATEGORY_SIZE) {
        // If category has less than MIN_CATEGORY_SIZE words, use all words
        vocabPool = getAllVocabs(vocabData);
    } else {
        // Use only words from the same category
        vocabPool = categoryVocabs;
    }
    
    // Select 3 wrong options (distractors)
    let distractors = [];
    while (distractors.length < 3 && vocabPool.length > 1) {
        const randomDistractor = vocabPool[Math.floor(Math.random() * vocabPool.length)];
        if (randomDistractor[questionField] !== randomTarget[questionField] && 
            !distractors.find(d => d[questionField] === randomDistractor[questionField])) {
            distractors.push(randomDistractor);
        }
    }
    
    // If we don't have enough distractors (less than 4 total vocabs), pad with placeholders
    while (distractors.length < 3) {
        const placeholder = {};
        placeholder[questionField] = `Option ${distractors.length + 1}`;
        distractors.push(placeholder);
    }
    
    // Shuffle options
    const options = [...distractors, randomTarget].sort(() => Math.random() - 0.5);
    
    return {
        target: randomTarget,
        options: options,
        categorySize: categoryVocabs.length,
        usedCategoryOnly: categoryVocabs.length >= MIN_CATEGORY_SIZE
    };
}

// Export for Node.js (tests and potential server-side use)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        MIN_CATEGORY_SIZE,
        getAllVocabs,
        getAllVocabsWithCategory,
        getVocabsFromCategory,
        generateQuizQuestion
    };
}

// Export for browser use (can be loaded via script tag)
if (typeof window !== 'undefined') {
    window.QuizLogic = {
        MIN_CATEGORY_SIZE,
        getAllVocabs,
        getAllVocabsWithCategory,
        getVocabsFromCategory,
        generateQuizQuestion
    };
}
