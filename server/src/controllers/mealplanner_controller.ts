import { Request, Response } from "express";
import * as mealPlannerService from "../services/mealPlanner_service";

/*export const getDayMealPlanner = async (req: Request, res: Response) => {
  const dayMealPlanner = await mealPlannerService.getDayMealPlanner();
  res.json(dayMealPlanner).status(200);
};
*/
export const getDayMealPlanner = async (req: Request, res: Response) => {
  const inputTargetCalories = req.query.targetCalories;
  const inputDiet = req.query.diet;
  const inputExclude = req.query.exclude;
  let appendUrl = "";

  if (typeof inputTargetCalories === "string") {
    appendUrl = `&targetCalories=${inputTargetCalories}`;
  }
  if (typeof inputDiet === "string") {
    appendUrl += `&diet=${inputDiet}`;
  }
  if (typeof inputExclude === "string") {
    appendUrl += `&exclude=${inputExclude}`;
  }
  const dayMealPlanner = await mealPlannerService.getDayMealPlanner(appendUrl);
  res.json(dayMealPlanner).status(200);
};

export const getWeeklyMealPlanner = async (req: Request, res: Response) => {
  const inputTargetCalories = req.query.targetCalories;
  const inputDiet = req.query.diet;
  const inputExclude = req.query.exclude;
  let appendUrl = "";

  if (typeof inputTargetCalories === "string") {
    appendUrl = `&targetCalories=${inputTargetCalories}`;
  }
  if (typeof inputDiet === "string") {
    appendUrl += `&diet=${inputDiet}`;
  }
  if (typeof inputExclude === "string") {
    appendUrl += `&exclude=${inputExclude}`;
  }

  const weeklyMealPlanner = await mealPlannerService.getWeeklyMealPlanner(
    appendUrl
  );
  res.json(weeklyMealPlanner).status(200);
};
