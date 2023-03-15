import { MealPlanner } from "../types/meal_planner";

const SPOONACULAR_API_KEY = "23384aee00744f30b4f3d7bb7fa347c6";
console.log(SPOONACULAR_API_KEY);
//${process.env.SPOONACULAR_API_KEY}`
//"https://api.spoonacular.com/mealplanner/generate/?timeFrame=%22day%22&apiKey=23384aee00744f30b4f3d7bb7fa347c6";

const FETCHURL = `https://api.spoonacular.com/mealplanner/generate/?timeFrame=day&apiKey=${SPOONACULAR_API_KEY}`;

export const getDayMealPlanner = async () => {
  try {
    const response = await fetch(FETCHURL);
    if (response.ok) {
      const json = await response.json();
      console.log(json);
      return json as MealPlanner;
    }
  } catch (error) {
    if (typeof error === "string") {
      return error;
    }
  }
};
