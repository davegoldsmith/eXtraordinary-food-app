import express from "express";
import * as userController from "../controllers/user_controller";
import * as userPrefsController from "../controllers/user_prefs_controller";
import * as recipeController from "../controllers/recipe_controller";
import * as mealplanner_controller from "../controllers/mealplanner_controller";

export const router = express.Router();

router.post("/user", userController.createUser);
router.get("/user", userController.getUser);

router.get("/userPrefs", userPrefsController.getAllUserPreferences);
router.post("/userPrefs", userPrefsController.createUserPreference);
router.get("/userPrefs/:pref_name", userPrefsController.getUserPreference);
router.put("/userPrefs/:pref_name", userPrefsController.updateUserPreference);

router.get("/recipe", recipeController.getRecipe);
router.get("/recipe/ext", recipeController.getRecipeFromURL); //TODO is ext a good name?
router.post("/recipe/save", recipeController.saveRecipeFromURL);

router.get("/DayMealPlanner", mealplanner_controller.getDayMealPlanner);
router.get("/WeeklyMealPlanner", mealplanner_controller.getWeeklyMealPlanner);
