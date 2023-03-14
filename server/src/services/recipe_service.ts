import { Recipe } from "../types/recipe_types";
export const getRecipe = async (recipeId = "716429") => {

    const apiResponse = await fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${process.env.SPOONACULAR_API_KEY}`);
    const recipe = await apiResponse.json() as Recipe;
    return recipe;
}

