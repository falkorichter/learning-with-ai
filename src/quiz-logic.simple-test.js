/**
 * Simple test runner for quiz logic (no dependencies required)
 */

const {
    MIN_CATEGORY_SIZE,
    getAllVocabs,
    getAllVocabsWithCategory,
    getVocabsFromCategory,
    generateQuizQuestion
} = require('./quiz-logic.js');

// Test helpers
let passedTests = 0;
let failedTests = 0;

function assert(condition, message) {
    if (condition) {
        passedTests++;
        console.log(`  ✓ ${message}`);
    } else {
        failedTests++;
        console.error(`  ✗ ${message}`);
    }
}

// Mock data
const mockVocabData = {
    "Small Category": [
        { en: "small1", de: "klein1" },
        { en: "small2", de: "klein2" },
        { en: "small3", de: "klein3" }
    ],
    "Medium Category": [
        { en: "med1", de: "medium1" },
        { en: "med2", de: "medium2" },
        { en: "med3", de: "medium3" },
        { en: "med4", de: "medium4" },
        { en: "med5", de: "medium5" }
    ],
    "Large Category": [
        { en: "large1", de: "groß1" },
        { en: "large2", de: "groß2" },
        { en: "large3", de: "groß3" },
        { en: "large4", de: "groß4" },
        { en: "large5", de: "groß5" },
        { en: "large6", de: "groß6" },
        { en: "large7", de: "groß7" },
        { en: "large8", de: "groß8" },
        { en: "large9", de: "groß9" },
        { en: "large10", de: "groß10" }
    ]
};

console.log('\n=== Running Quiz Logic Tests ===\n');

// Test getAllVocabs
console.log('Test: getAllVocabs');
const allVocabs = getAllVocabs(mockVocabData);
assert(allVocabs.length === 18, 'Should return all 18 vocabularies');
assert(Array.isArray(allVocabs), 'Should return an array');

// Test getAllVocabsWithCategory
console.log('\nTest: getAllVocabsWithCategory');
const allWithCategory = getAllVocabsWithCategory(mockVocabData);
assert(allWithCategory.length === 18, 'Should return all 18 vocabularies');
assert(allWithCategory.every(v => v.hasOwnProperty('category')), 'All vocabs should have category field');

// Test getVocabsFromCategory
console.log('\nTest: getVocabsFromCategory');
const mediumCat = getVocabsFromCategory(mockVocabData, 'Medium Category');
assert(mediumCat.length === 5, 'Should return 5 vocabs from Medium Category');
const nonExistent = getVocabsFromCategory(mockVocabData, 'Non Existent');
assert(nonExistent.length === 0, 'Should return empty array for non-existent category');

// Test generateQuizQuestion structure
console.log('\nTest: generateQuizQuestion structure');
const quiz = generateQuizQuestion(mockVocabData);
assert(quiz !== null, 'Should return a quiz object');
assert(quiz.hasOwnProperty('target'), 'Should have target property');
assert(quiz.hasOwnProperty('options'), 'Should have options property');
assert(quiz.hasOwnProperty('categorySize'), 'Should have categorySize property');
assert(quiz.hasOwnProperty('usedCategoryOnly'), 'Should have usedCategoryOnly property');
assert(quiz.options.length === 4, 'Should have 4 options');

// Test category-based filtering
console.log('\nTest: Category-based filtering behavior');
let smallCategoryTests = 0;
let largeCategoryTests = 0;
let correctFallback = 0;
let correctCategoryUse = 0;

for (let i = 0; i < 50; i++) {
    const result = generateQuizQuestion(mockVocabData);
    
    if (result.categorySize < MIN_CATEGORY_SIZE) {
        smallCategoryTests++;
        if (!result.usedCategoryOnly) {
            correctFallback++;
        }
    } else {
        largeCategoryTests++;
        if (result.usedCategoryOnly) {
            const categoryVocabs = getVocabsFromCategory(mockVocabData, result.target.category);
            const allFromCategory = result.options.every(opt =>
                categoryVocabs.some(cv => cv.en === opt.en)
            );
            if (allFromCategory) {
                correctCategoryUse++;
            }
        }
    }
}

assert(correctFallback === smallCategoryTests, `All small category tests should use fallback (${correctFallback}/${smallCategoryTests})`);
assert(correctCategoryUse === largeCategoryTests, `All large category tests should use category only (${correctCategoryUse}/${largeCategoryTests})`);

// Test with different field names
console.log('\nTest: Different field names');
const altData = {
    "Category": [
        { q: "word1", a: "answer1" },
        { q: "word2", a: "answer2" },
        { q: "word3", a: "answer3" },
        { q: "word4", a: "answer4" },
        { q: "word5", a: "answer5" }
    ]
};
const altQuiz = generateQuizQuestion(altData, 'q');
assert(altQuiz !== null, 'Should work with different field names');
assert(altQuiz.target.hasOwnProperty('q'), 'Should use the specified field');

// Test empty data
console.log('\nTest: Edge cases');
const emptyQuiz = generateQuizQuestion({});
assert(emptyQuiz === null, 'Should return null for empty data');

// Test MIN_CATEGORY_SIZE constant
console.log('\nTest: Constants');
assert(MIN_CATEGORY_SIZE === 4, 'MIN_CATEGORY_SIZE should be 4');

// Summary
console.log('\n=== Test Summary ===');
console.log(`Passed: ${passedTests}`);
console.log(`Failed: ${failedTests}`);
console.log(`Total:  ${passedTests + failedTests}`);

if (failedTests === 0) {
    console.log('\n✓ ALL TESTS PASSED!\n');
    process.exit(0);
} else {
    console.log('\n✗ SOME TESTS FAILED!\n');
    process.exit(1);
}
