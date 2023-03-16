import { Request, Response } from "express";
import * as mealPlannerDayService from "../services/get_day_meal_planner";
import * as mealPlannerWeeklyService from "../services/get_weekly_meal_planner";

export const getDayMealPlanner = async (req: Request, res: Response) => {
  const dayMealPlanner = await mealPlannerDayService.getDayMealPlanner();
  res.json(dayMealPlanner).status(200);
};

export const getDayCalorieMealPlanner = async (
  req: Request<object, object, object, { targetCalories: number }>,
  res: Response
) => {
  const inputTargetCalories = req.query.targetCalories;
  const dayMealPlanner = await mealPlannerDayService.getDayCalorieMealPlanner(
    inputTargetCalories
  );
  res.json(dayMealPlanner).status(200);
};

export const getWeeklyMealPlanner = async (req: Request, res: Response) => {
  const weeklyMealPlanner =
    await mealPlannerWeeklyService.getWeeklyMealPlanner();
  res.json(weeklyMealPlanner).status(200);
};
