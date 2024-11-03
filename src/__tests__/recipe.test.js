// src/__tests__/recipe.test.js
import { 
    searchRecipes, 
    validateRecipe, 
    calculateCookingTime,
    filterRecipesByDietary,
    calculateServings
} from '../utils/recipeHelpers';

describe('Recipe Functions', () => {
    // Original validation tests
    describe('Recipe Validation', () => {
        test.each([
            [{title: 'Pasta', ingredients: ['garlic'], instructions: ['cook']}, true],
            [{title: '', ingredients: [], instructions: []}, false],
            [{title: 'Invalid'}, false],
            [null, false],
            [undefined, false],
            [{title: 'No Instructions', ingredients: ['salt']}, false],
            [{title: 'Full Recipe', ingredients: ['salt', 'pepper'], instructions: ['mix', 'cook']}, true]
        ])('validateRecipe handles different inputs correctly', (input, expected) => {
            expect(validateRecipe(input)).toBe(expected);
        });
    });

    // Original search tests plus more cases
    describe('Recipe Search', () => {
        test.each([
            [
                [{title: 'Pasta'}, {title: 'Pizza'}, {title: 'Salad'}],
                'pa',
                [{title: 'Pasta'}]
            ],
            [
                [{title: 'Pasta'}, {title: 'Pizza'}, {title: 'Salad'}],
                '',
                [{title: 'Pasta'}, {title: 'Pizza'}, {title: 'Salad'}]
            ],
            [
                [{title: 'Spaghetti Carbonara'}, {title: 'Pizza'}, {title: 'Pasta Alfredo'}],
                'pasta',
                [{title: 'Pasta Alfredo'}]
            ],
            [
                [{title: 'Pasta'}, {title: 'Pizza'}, {title: 'Salad'}],
                'burger',
                []
            ]
        ])('searchRecipes works with various search terms', (recipes, searchTerm, expected) => {
            expect(searchRecipes(recipes, searchTerm)).toEqual(expected);
        });
    });

    // New test suite for cooking time calculation
    describe('Cooking Time Calculation', () => {
        test.each([
            [{ prepTime: '20', cookTime: '30' }, 50],
            [{ prepTime: '0', cookTime: '25' }, 25],
            [{ prepTime: '15', cookTime: '0' }, 15],
            [null, 0],
            [{}, 0],
            [{ prepTime: 'invalid' }, 0]
        ])('calculateCookingTime handles different time inputs', (input, expected) => {
            expect(calculateCookingTime(input)).toBe(expected);
        });
    });

    // New test suite for dietary filtering
    describe('Dietary Filtering', () => {
        const testRecipes = [
            { title: 'Veggie Pasta', dietary: ['vegetarian', 'vegan'] },
            { title: 'Chicken Curry', dietary: ['gluten-free'] },
            { title: 'Tofu Stir Fry', dietary: ['vegetarian', 'gluten-free'] }
        ];

        test.each([
            ['vegetarian', 2],
            ['vegan', 1],
            ['gluten-free', 2],
            ['keto', 0],
            ['', 3],
            [null, 3]
        ])('filterRecipesByDietary filters %s recipes correctly', (dietary, expectedCount) => {
            expect(filterRecipesByDietary(testRecipes, dietary)).toHaveLength(expectedCount);
        });
    });

    // New test suite for serving size calculations
    describe('Serving Size Calculations', () => {
        const baseIngredients = [
            { item: 'flour', amount: 200 },
            { item: 'sugar', amount: 100 },
            { item: 'butter', amount: 150 }
        ];

        test.each([
            [2, 0.5], // Half the base recipe (2 servings instead of 4)
            [8, 2],   // Double the base recipe
            [4, 1],   // Same as base recipe
            [0, 0],   // Invalid serving size
            [-1, 0]   // Invalid serving size
        ])('calculateServings adjusts ingredients correctly for %i servings', (servings, multiplier) => {
            const result = calculateServings(baseIngredients, servings);
            if (multiplier === 0) {
                expect(result).toEqual([]);
            } else {
                result.forEach((ing, index) => {
                    expect(ing.amount).toBe(baseIngredients[index].amount * multiplier);
                });
            }
        });

        test('handles null ingredients', () => {
            expect(calculateServings(null, 2)).toEqual([]);
        });
    });
});