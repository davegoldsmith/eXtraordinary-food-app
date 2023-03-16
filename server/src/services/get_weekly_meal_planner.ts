import { MealPlanner } from "../types/meal_planner";
import { getMealPlanner } from "./get_day_meal_planner";

export const getWeeklyMealPlanner = async () => {
  const retvalue = getMealPlanner("day");
  return retvalue;
};
