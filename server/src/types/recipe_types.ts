export interface ExtendedIngredientMeasure {
    amount: number;
    unitShort: string;
    unitLong: string;
}

export interface ExtendedIngredient {
    id: number;
    aisle: string;
    image: string;
    consistency: string;
    name: string;
    nameClean: string;
    original: string;
    originalName: string;
    amount: number;
    unit: string;
    meta: string[];
    measures: {
        us: ExtendedIngredientMeasure;
        metric: ExtendedIngredientMeasure;
    };
}

export interface Recipe {
    vegetarian: boolean;
    vegan: boolean;
    glutenFree: boolean;
    dairyFree: boolean;
    veryHealthy: boolean;
    cheap: boolean;
    veryPopular: boolean;
    sustainable: boolean;
    lowFodmap: boolean;
    weightWatcherSmartPoints: number;
    gaps: string;
    preparationMinutes: number;
    cookingMinutes: number;
    aggregateLikes: number;
    healthScore: number;
    creditsText: string;
    license: string;
    sourceName: string;
    pricePerServing: number;
    extendedIngredients: ExtendedIngredient[];
}
