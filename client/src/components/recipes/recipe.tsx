import React from 'react';
import { Step, ExtendedIngredient, Recipe, } from '../../types/recipe_types';
import { Card, CardContent, Typography, CardMedia, CardHeader } from '@mui/material';

interface RecipeProps {
    recipe: Recipe;
}

const RecipeComponent: React.FC<RecipeProps> = ({ recipe }) => {
    const {
        vegetarian,
        vegan,
        glutenFree,
        dairyFree,
        veryHealthy,
        cheap,
        veryPopular,
        sustainable,
        lowFodmap,
        weightWatcherSmartPoints,
        gaps,
        preparationMinutes,
        cookingMinutes,
        aggregateLikes,
        healthScore,
        creditsText,
        sourceName,
        pricePerServing,
        extendedIngredients,
        id,
        title,
        readyInMinutes,
        servings,
        sourceUrl,
        image,
        imageType,
        summary,
        cuisines,
        dishTypes,
        diets,
        occasions,
        winePairing,
        instructions,
        analyzedInstructions,
        originalId,
    }
        = recipe;

    return (
        <Card>
            <CardHeader title={title} />
            <CardMedia component="img" height="200" image={image} alt={title} />
            <CardContent>
                <Typography>
                    Dietary restrictions:{' '}
                    {vegetarian && 'vegetarian, '}
                    {vegan && 'vegan, '}
                    {glutenFree && 'gluten-free, '}
                    {dairyFree && 'dairy-free, '}
                    {veryHealthy && 'very healthy, '}
                    {cheap && 'cheap, '}
                    {veryPopular && 'very popular, '}
                    {sustainable && 'sustainable, '}
                    {lowFodmap && 'low FODMAP, '}
                </Typography>
                <Typography variant="h6" gutterBottom>
                    Ingredients:
                </Typography>
                <ul>
                    {extendedIngredients.map((ingredient: ExtendedIngredient) => (
                        <li key={ingredient.id}>
                            {ingredient.name}: {ingredient.amount} {ingredient.unit}
                        </li>
                    ))}
                </ul>
                <Typography variant="h6" gutterBottom>
                    Instructions:
                </Typography>
                <Typography>{instructions}</Typography>
                <ul>
                    {analyzedInstructions[0].steps.map((step: Step) => (
                        <li key={step.number}>
                            {step.step}
                        </li>
                    ))}
                </ul>

            </CardContent>
        </Card>
    );
};

export default RecipeComponent;
