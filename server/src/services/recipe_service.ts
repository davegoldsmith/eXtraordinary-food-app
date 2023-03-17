import { Recipe } from "../types/recipe_types";
import { RecipeUrl } from "../models/recipe_url";
const defaultRecipeId = "716429";
const defaultRecipeUrl = "https://www.thepioneerwoman.com/food-cooking/recipes/a34225821/beef-and-bean-chili-recipe/";

export const getRecipe = async (recipeId = defaultRecipeId) => {

    const apiResponse = await fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${process.env.SPOONACULAR_API_KEY}`);
    const recipe = await apiResponse.json() as Recipe;
    return recipe;
}

export const getRecipeFromURL = async (url = defaultRecipeUrl) => {

    const apiResponse = await fetch(`https://api.spoonacular.com/recipes/extract?url=${url}&apiKey=${process.env.SPOONACULAR_API_KEY}`);
    const recipe = await apiResponse.json() as Recipe;
    return recipe;
}

export const saveRecipeFromURL = async (url = defaultRecipeUrl) => {
    RecipeUrl.sync(); //Delete after first run. Leaving it here for now to create the table.
    const defaultUserId = 1; //TODO replace with user id from session
    return  RecipeUrl.findOrCreate({where: {url: url, user_id: defaultUserId}});
}