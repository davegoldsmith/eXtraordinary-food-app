import { Request, Response } from "express";
import * as recipeService from "../services/recipe_service"

export const getRecipe = async (req: Request<object, object, object, {recipeId:string|undefined}>, res: Response) => {
    const { recipeId } = req.query;
    if (recipeId) {
        const recipe = await recipeService.getRecipe(recipeId);
        res.json(recipe).status(200);
    } else {
        res.status(400).json({message: "No recipeId provided"});
    }

}
