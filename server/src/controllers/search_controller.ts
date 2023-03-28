import { Request, Response } from "express";
import * as searchService from "../services/search_service";
import {RecipeSearchParams} from '../types/search_types'


export const getRecipeList = async (req: Request, res: Response) => {
  const queryPara  = req.query;
  try {
    const searchPara : RecipeSearchParams = req.query as RecipeSearchParams
    const recipelist = await searchService.getSearch(searchPara);
    res.status(200).json(recipelist);
  } catch (error) {
    let message = (error as Error).message;
    res.status(400).json({ message });
  }
};
