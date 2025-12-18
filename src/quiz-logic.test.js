/**
 * Tests for quiz logic
 */

const {
    MIN_CATEGORY_SIZE,
    getAllVocabs,
    getAllVocabsWithCategory,
    getVocabsFromCategory,
    generateQuizQuestion
} = require('./quiz-logic.js');

describe('Quiz Logic', () => {
    // Mock vocabulary data with various category sizes
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

    describe('getAllVocabs', () => {
        test('should return all vocabularies as a flat array', () => {
            const result = getAllVocabs(mockVocabData);
            expect(result).toHaveLength(18); // 3 + 5 + 10
            expect(Array.isArray(result)).toBe(true);
        });

        test('should return empty array for empty data', () => {
            const result = getAllVocabs({});
            expect(result).toHaveLength(0);
        });
    });

    describe('getAllVocabsWithCategory', () => {
        test('should add category field to each vocab', () => {
            const result = getAllVocabsWithCategory(mockVocabData);
            expect(result).toHaveLength(18);
            result.forEach(vocab => {
                expect(vocab).toHaveProperty('category');
                expect(vocab).toHaveProperty('en');
                expect(vocab).toHaveProperty('de');
            });
        });

        test('should correctly assign category names', () => {
            const result = getAllVocabsWithCategory(mockVocabData);
            const smallCategoryVocabs = result.filter(v => v.category === 'Small Category');
            expect(smallCategoryVocabs).toHaveLength(3);
        });
    });

    describe('getVocabsFromCategory', () => {
        test('should return vocabs from specified category', () => {
            const result = getVocabsFromCategory(mockVocabData, 'Medium Category');
            expect(result).toHaveLength(5);
        });

        test('should return empty array for non-existent category', () => {
            const result = getVocabsFromCategory(mockVocabData, 'Non Existent');
            expect(result).toHaveLength(0);
        });
    });

    describe('generateQuizQuestion', () => {
        test('should return null for empty vocab data', () => {
            const result = generateQuizQuestion({});
            expect(result).toBeNull();
        });

        test('should return a valid quiz question structure', () => {
            const result = generateQuizQuestion(mockVocabData);
            expect(result).toHaveProperty('target');
            expect(result).toHaveProperty('options');
            expect(result).toHaveProperty('categorySize');
            expect(result).toHaveProperty('usedCategoryOnly');
            expect(result.options).toHaveLength(4);
        });

        test('should use all words for small categories (< 4 words)', () => {
            // Create a data set with only small category
            const smallOnlyData = {
                "Small Category": mockVocabData["Small Category"]
            };
            
            const result = generateQuizQuestion(smallOnlyData);
            expect(result.categorySize).toBe(3);
            expect(result.usedCategoryOnly).toBe(false);
        });

        test('should use category words only for large categories (>= 4 words)', () => {
            // Run multiple tests to verify category restriction
            const results = [];
            for (let i = 0; i < 50; i++) {
                const result = generateQuizQuestion(mockVocabData);
                if (result.categorySize >= MIN_CATEGORY_SIZE) {
                    results.push(result);
                }
            }
            
            // All large category questions should use category only
            results.forEach(result => {
                expect(result.usedCategoryOnly).toBe(true);
            });
        });

        test('should include the target in options', () => {
            const result = generateQuizQuestion(mockVocabData);
            expect(result.options).toContainEqual(result.target);
        });

        test('should generate 4 unique options', () => {
            const result = generateQuizQuestion(mockVocabData);
            const uniqueOptions = new Set(result.options.map(o => o.en));
            expect(uniqueOptions.size).toBe(4);
        });

        test('should work with different question fields', () => {
            // Test with 'q' field (used in with-config.html)
            const altVocabData = {
                "Category": [
                    { q: "word1", a: "answer1" },
                    { q: "word2", a: "answer2" },
                    { q: "word3", a: "answer3" },
                    { q: "word4", a: "answer4" },
                    { q: "word5", a: "answer5" }
                ]
            };
            
            const result = generateQuizQuestion(altVocabData, 'q');
            expect(result).not.toBeNull();
            expect(result.target).toHaveProperty('q');
            expect(result.options).toHaveLength(4);
        });

        test('MIN_CATEGORY_SIZE constant should be 4', () => {
            expect(MIN_CATEGORY_SIZE).toBe(4);
        });

        test('should handle edge case with exactly 4 words in category', () => {
            const exactData = {
                "Exact Category": [
                    { en: "word1", de: "wort1" },
                    { en: "word2", de: "wort2" },
                    { en: "word3", de: "wort3" },
                    { en: "word4", de: "wort4" }
                ]
            };
            
            const result = generateQuizQuestion(exactData);
            expect(result.categorySize).toBe(4);
            expect(result.usedCategoryOnly).toBe(true);
        });
    });

    describe('Category-based filtering behavior', () => {
        test('should consistently use same category for large categories', () => {
            // Run 100 tests to verify consistency
            const stats = {
                smallCategoryTests: 0,
                largeCategoryTests: 0,
                correctCategoryUsage: 0,
                correctFallbackUsage: 0
            };

            for (let i = 0; i < 100; i++) {
                const result = generateQuizQuestion(mockVocabData);
                
                if (result.categorySize < MIN_CATEGORY_SIZE) {
                    stats.smallCategoryTests++;
                    if (!result.usedCategoryOnly) {
                        stats.correctFallbackUsage++;
                    }
                } else {
                    stats.largeCategoryTests++;
                    if (result.usedCategoryOnly) {
                        // Verify all options are from same category
                        const categoryVocabs = getVocabsFromCategory(mockVocabData, result.target.category);
                        const allFromCategory = result.options.every(opt => 
                            categoryVocabs.some(cv => cv.en === opt.en)
                        );
                        if (allFromCategory) {
                            stats.correctCategoryUsage++;
                        }
                    }
                }
            }

            // All small category tests should use fallback
            expect(stats.correctFallbackUsage).toBe(stats.smallCategoryTests);
            // All large category tests should use category only
            expect(stats.correctCategoryUsage).toBe(stats.largeCategoryTests);
        });
    });
});
