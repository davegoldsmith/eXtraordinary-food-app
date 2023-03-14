import express from "express";
import * as userController from "../controllers/user_controller";
import * as recipeController from "../controllers/recipe_controller";

export const router = express.Router();

router.post("/user", userController.createUser);
router.get("/user", userController.getUser);

router.get("/recipe", recipeController.getRecipe);
