import { SearchResult } from "../types/search_types";
import fetch from "node-fetch";

export const getSearch = async (search: string) => {
  const apiResponse = await fetch(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.SPOONACULAR_API_KEY}`
  );

  if (apiResponse.ok) {
    const searchResult = (await apiResponse.json()) as SearchResult[];
    return searchResult;
  } else {
    return [];
  }
};
