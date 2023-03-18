import { SearchResult } from "../types/search_types";
import  {RecipeSearchParams} from '../types/search_types'
//import fetch from "node-fetch";
const BASE_URL = "https://api.spoonacular.com/recipes/complexSearch";
const DEFAULT_SEARCH_NUMBER = 100;

const searchParameters = (params : RecipeSearchParams):string  =>
{
  const searchParams = new URLSearchParams();
  //console.log("******* params", params)

  if (params.cuisine !== undefined) searchParams.set('cuisine', params.cuisine);
  if (params.excludeCuisine !== undefined) searchParams.set('excludeCuisine', params.excludeCuisine);
  if (params.diet !== undefined) searchParams.set('diet', params.diet);
  if (params.intolerances !== undefined) searchParams.set('intolerances', params.intolerances);
  if (params.includeIngredients !== undefined) searchParams.set('includeIngredients', params.includeIngredients);
  if (params.excludeIngredients !== undefined) searchParams.set('excludeIngredients', params.excludeIngredients);
  if (params.type !== undefined) searchParams.set('type', params.type);
  if (params.titleMatch !== undefined) searchParams.set('titleMatch', params.titleMatch);
  if (params.maxReadyTime !== undefined) searchParams.set('maxReadyTime', params.maxReadyTime.toString());
  if (params.sort !== undefined) searchParams.set('sort', params.sort);
  if (params.sortDirection !== undefined) searchParams.set('sortDirection', params.sortDirection);
  if (params.minCarbs !== undefined) searchParams.set('minCarbs', params.minCarbs.toString());
  if (params.maxCarbs !== undefined) searchParams.set('maxCarbs', params.maxCarbs.toString());
  if (params.minProtein !== undefined) searchParams.set('minProtein', params.minProtein.toString());
  if (params.maxProtein !== undefined) searchParams.set('maxProtein', params.maxProtein.toString());
  if (params.minCalories !== undefined) searchParams.set('minCalories', params.minCalories.toString());
  if (params.maxCalories !== undefined) searchParams.set('maxCalories', params.maxCalories.toString());
  if (params.minFat !== undefined) searchParams.set('minFat', params.minFat.toString());
  if (params.maxFat !== undefined) searchParams.set('maxFat', params.maxFat.toString());
  console.log("***** params.number", params.number);
  if (params.number !== undefined) {

    searchParams.set('number', params.number.toString());
  }
  else{
    searchParams.set('number', DEFAULT_SEARCH_NUMBER.toString());
  }
  searchParams.set('addRecipeNutrition', "false");
  console.log(" serach params=",  searchParams.toString());


  return searchParams.toString();
}

export const getSearch = async (params: RecipeSearchParams={}) => {  

  const apiResponse = await fetch(`${BASE_URL}?${searchParameters(params)}`, {
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": `${process.env.SPOONACULAR_API_KEY}`,
    },
  });

  if (apiResponse.ok) {
    const searchResult = (await apiResponse.json()) as SearchResult[];
    return searchResult;
  } else {
    return [];
  }
};
