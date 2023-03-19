import React from 'react';
import { render } from '@testing-library/react';
import RecipeComponent from './recipe';

import { Recipe } from '../../types/recipe_types';

describe('RecipeComponent', () => {
    const recipe: Recipe = {
        id: 1,
        title: 'Test Recipe',
        vegetarian: true,
        vegan: false,
        glutenFree: true,
        dairyFree: false,
        veryHealthy: true,
        cheap: false,
        veryPopular: true,
        sustainable: false,
        lowFodmap: false,
        weightWatcherSmartPoints: 10,
        gaps: "no",
        preparationMinutes: 10,
        cookingMinutes: 20,
        aggregateLikes: 50,
        healthScore: 80,
        creditsText: 'Test Credits',
        sourceName: 'Test Source Name',
        pricePerServing: 2.5,
        extendedIngredients: [
            {
                id: 1,
                aisle: 'Test Aisle 1',
                image: 'test-image-1.jpg',
                consistency: 'solid',
                name: 'Test Ingredient 1',
                nameClean: 'Clean Test Ingredient 1',
                original: '2 cups Test Ingredient 1',
                originalName: 'original Test Ingredient 1',
                amount: 2,
                unit: 'cups',
                meta: ['meta1', 'meta2'],
                measures: { metric: { amount: 500, unitShort: 'g', unitLong: 'grams' }, us: { amount: 1.1, unitShort: 'lbs', unitLong: 'pounds' } },
            },
            {
                id: 2,
                aisle: 'Test Aisle 2',
                image: 'test-image-2.jpg',
                consistency: 'liquid',
                name: 'Test Ingredient 2',
                nameClean: 'Clean Test Ingredient 2',
                original: '1 tsp Test Ingredient 2',
                originalName: 'original Test Ingredient 2',
                amount: 1,
                unit: 'tsp',
                meta: ['meta3', 'meta4'],
                measures: { metric: { amount: 5, unitShort: 'ml', unitLong: 'milliliters' }, us: { amount: 0.17, unitShort: 'fl oz', unitLong: 'fluid ounces' } },
            },
        ],
        readyInMinutes: 30,
        servings: 4,
        sourceUrl: 'https://testurl.com',
        image: 'https://testimage.com',
        imageType: 'jpg',
        summary: 'Test Summary',
        cuisines: ['Test Cuisine'],
        dishTypes: ['Test Dish Type'],
        diets: ['Test Diet'],
        occasions: ['Test Occasion'],
        winePairing: {
            pairedWines: ["Chardonnay", "Pinot Grigio"],
            pairingText: "Pair with a light and refreshing white wine.",
            productMatches: [
                {
                    id: 1,
                    title: "Test Wine 1",
                    description: "A crisp and refreshing Chardonnay.",
                    price: "19.99",
                    imageUrl: "https://example.com/wine1.jpg",
                    averageRating: 4.5,
                    ratingCount: 50,
                    score: 8.5,
                    link: "https://example.com/wine1"
                },
                {
                    id: 2,
                    title: "Test Wine 2",
                    description: "A fruity and aromatic Pinot Grigio.",
                    price: "14.99",
                    imageUrl: "https://example.com/wine2.jpg",
                    averageRating: 4.2,
                    ratingCount: 35,
                    score: 8.0,
                    link: "https://example.com/wine2"
                }
            ]
        },
        instructions: 'Test Instructions',
        analyzedInstructions: [{
            name: 'Test Recipe',
            steps: [
                {
                    number: 1,
                    step: 'Test Step 1',
                },
                {
                    number: 2,
                    step: 'Test Step 2',
                },
            ]
        }],
        originalId: null,
    };

    it('renders the title of the recipe', () => {
        const { getByText } = render(<RecipeComponent recipe={recipe} />);
        const titleElement = getByText('Test Recipe');
        expect(titleElement).toBeInTheDocument();
    });

    it('renders the image of the recipe', () => {
        const { getByAltText } = render(<RecipeComponent recipe={recipe} />);
        const imageElement = getByAltText('Test Recipe');
        expect(imageElement).toBeInTheDocument();
        expect(imageElement).toHaveAttribute('src', 'https://testimage.com');
    });

    it('renders the dietary restrictions', () => {
        const { getByText } = render(<RecipeComponent recipe={recipe} />);
        expect(getByText('Vegetarian')).toBeInTheDocument();
        expect(getByText('Gluten Free')).toBeInTheDocument();
        expect(getByText('Very Healthy')).toBeInTheDocument();
        expect(getByText('Very Popular')).toBeInTheDocument();
    });

    it('renders the ingredients', () => {
        const { getByText } = render(<RecipeComponent recipe={recipe} />);
        expect(getByText('Test Ingredient 1: 2 cups')).toBeInTheDocument();
        expect(getByText('Test Ingredient 2: 1 tsp')).toBeInTheDocument();
    });

    it('renders the instructions', () => {
        const { getByText } = render(<RecipeComponent recipe={recipe} />);
        expect(getByText('Test Step 1')).toBeInTheDocument();
        expect(getByText('Test Step 2')).toBeInTheDocument();
    });
});
