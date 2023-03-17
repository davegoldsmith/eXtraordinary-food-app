export interface SearchResult {
  id: number;
  title: string;
  image: string;
  imageType: string;
}

//export interface RecipeSearchParams extends Record<string, string> {
export interface RecipeSearchParams {
  cuisine?: string;
  excludeCuisine?: string;
  diet?: string;
  intolerances?: string;
  includeIngredients?: string;
  excludeIngredients?: string;
  type?: string;
  instructionsRequired?: boolean;
  fillIngredients?: boolean;
  addRecipeInformation?: boolean;
  addRecipeNutrition?: boolean;
  titleMatch?: string;
  maxReadyTime?: number;
  sort?: string;
  sortDirection?: string;
  minCarbs?: number;
  maxCarbs?: number;
  minProtein?: number;
  maxProtein?: number;
  minCalories?: number;
  maxCalories?: number;
  minFat?: number;
  maxFat?: number;
  number? : number;
}
