import { Request, Response } from "express";
import * as searchService from "../services/search-service";
//import bcrypt from "bcrypt";

export const getRecipeList = async (req: Request, res: Response) => {
  const search = req.body;
  console.log("****Server recipeSearch endPt ****");
  try {
    const recipelist = await searchService.getSearch(search);
    res.status(201).json(recipelist);
  } catch (error) {
    let message = (error as Error).message;
    res.status(400).json({ message });
  }
};
