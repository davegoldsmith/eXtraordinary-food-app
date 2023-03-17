import { Request, Response } from "express";
import * as mealPlannerService from "../services/mealPlanner_service";

export const getDayMealPlanner = async (req: Request, res: Response) => {
  const dayMealPlanner = await mealPlannerService.getDayMealPlanner();
  res.json(dayMealPlanner).status(200);
};

export const getWeeklyMealPlanner = async (req: Request, res: Response) => {
  const weeklyMealPlanner = await mealPlannerService.getWeeklyMealPlanner();
  res.json(weeklyMealPlanner).status(200);
};
