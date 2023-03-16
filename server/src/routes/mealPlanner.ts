import express from "express";
export const router = express.Router();
import * as mealplanner_controller from "../controllers/mealplanner_controller";
router.get("/DayMealPlanner", mealplanner_controller.getDayMealPlanner);
router.get("/WeeklyMealPlanner", mealplanner_controller.getWeeklyMealPlanner);
