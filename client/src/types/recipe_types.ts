export interface Recipe {
    vegetarian:               boolean;
    vegan:                    boolean;
    glutenFree:               boolean;
    dairyFree:                boolean;
    veryHealthy:              boolean;
    cheap:                    boolean;
    veryPopular:              boolean;
    sustainable:              boolean;
    lowFodmap:                boolean;
    weightWatcherSmartPoints: number;
    gaps:                     string;
    preparationMinutes:       number;
    cookingMinutes:           number;
    aggregateLikes:           number;
    healthScore:              number;
    creditsText:              string;
    sourceName:               string;
    pricePerServing:          number;
    extendedIngredients:      ExtendedIngredient[];
    id:                       number;
    title:                    string;
    readyInMinutes:           number;
    servings:                 number;
    sourceUrl:                string;
    image:                    string;
    imageType:                string;
    summary:                  string;
    cuisines:                 any[];
    dishTypes:                string[];
    diets:                    string[];
    occasions:                any[];
    winePairing:              WinePairing;
    instructions:             string;
    analyzedInstructions:     AnalyzedInstruction[];
    originalId:               null;
}

export interface AnalyzedInstruction {
    name:  string;
    steps: Step[];
}

export interface Step {
    number:      number;
    step:        string;
    ingredients?: Ent[];
    equipment?:   Ent[];
    length?:     Length;
}

export interface Ent {
    id:            number;
    name:          string;
    localizedName: string;
    image:         string;
    temperature?:  Length;
}

export interface Length {
    number: number;
    unit:   string;
}

export interface ExtendedIngredient {
    id:           number;
    aisle:        string;
    image:        string;
    consistency:  string;
    name:         string;
    nameClean:    string;
    original:     string;
    originalName: string;
    amount:       number;
    unit:         string;
    meta:         string[];
    measures:     Measures;
}

export interface Measures {
    us:     Metric;
    metric: Metric;
}

export interface Metric {
    amount:    number;
    unitShort: string;
    unitLong:  string;
}

export interface WinePairing {
    pairedWines:    string[];
    pairingText:    string;
    productMatches: ProductMatch[];
}

export interface ProductMatch {
    id:            number;
    title:         string;
    description:   string;
    price:         string;
    imageUrl:      string;
    averageRating: number;
    ratingCount:   number;
    score:         number;
    link:          string;
}
