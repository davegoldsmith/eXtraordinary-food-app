import { MealPlanner, WeeklyMealPlanner } from "../types/meal_planner";

let FETCHURL = `https://api.spoonacular.com/mealplanner/generate/?apiKey=${process.env.SPOONACULAR_API_KEY}`;

export const getDayMealPlanner = async (inputAppendUrl: string) => {
  FETCHURL = `https://api.spoonacular.com/mealplanner/generate/?apiKey=${process.env.SPOONACULAR_API_KEY}&timeFrame=day${inputAppendUrl}`;
  const fetchResponse = await fetch(FETCHURL);
  const mealPlanner = (await fetchResponse.json()) as MealPlanner;
  return mealPlanner;
};

export const getWeeklyMealPlanner = async (inputAppendUrl: string) => {
  FETCHURL = `https://api.spoonacular.com/mealplanner/generate/?apiKey=${process.env.SPOONACULAR_API_KEY}&timeFrame=week${inputAppendUrl}`;
  const fetchResponse = await fetch(FETCHURL);
  const weeklyMealPlanner = (await fetchResponse.json()) as WeeklyMealPlanner;
  return weeklyMealPlanner;
};
