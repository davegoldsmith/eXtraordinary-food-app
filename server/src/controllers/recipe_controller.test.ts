import request from 'supertest';
import { app } from '../app';
import * as recipeService from '../services/recipe_service';

jest.mock('../services/recipe_service');
const apiPrefix = '/api/v1';

describe('GET /recipe', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should return a recipe when given a valid recipeId', async () => {
        const recipeId = '123';
        const recipe = {
            id: recipeId,
            name: 'Test Recipe',
        };

        (recipeService.getRecipe as jest.Mock).mockResolvedValue(recipe);
        const response = await request(app).get(`${apiPrefix}/recipe?recipeId=${recipeId}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(recipe);
        expect(recipeService.getRecipe).toHaveBeenCalledWith(recipeId);
    });

    it('should return a 400 error when no recipeId is provided', async () => {

        const response = await request(app).get(`${apiPrefix}/recipe`);

        expect(response.status).toBe(400);
        expect(response.body).toEqual({ message: 'No recipeId provided' });
        expect(recipeService.getRecipe).not.toHaveBeenCalled();
    });
});

describe('GET /recipe/ext?url={url}', () => {
    it('should return 400 if no URL is provided', async () => {
      const response = await request(app).get(`${apiPrefix}/recipe/ext`);
      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: 'No url provided' });
    });

    it('should call getRecipeFromURL service method and return the recipe if URL is provided', async () => {
      const mockRecipe = { id: '1', name: 'Recipe 1', url: 'http://example.com/recipe1' };
      (recipeService.getRecipeFromURL as jest.Mock).mockResolvedValue(mockRecipe);

      const response = await request(app).get(`${apiPrefix}/recipe/ext?url=http://example.com/recipe1`);


      expect(recipeService.getRecipeFromURL).toHaveBeenCalledWith('http://example.com/recipe1');
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockRecipe); 
    });
  });

  describe('POST /recipe/save?url={url}', () => {
    it('should return 400 if no URL is provided', async () => {
      const response = await request(app).post(`${apiPrefix}/recipe/save`);
      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: 'No url provided' });
    });

    it('should call saveRecipeFromURL service method and return the saved recipe if URL is provided', async () => {
      const mockSavedRecipe = { id: '1', name: 'Recipe 1', url: 'http://example.com/recipe1' };
      (recipeService.saveRecipeFromURL as jest.Mock).mockResolvedValue(mockSavedRecipe);

      const response = await request(app).post(`${apiPrefix}/recipe/save?url=http://example.com/recipe1`);

      expect(recipeService.saveRecipeFromURL).toHaveBeenCalledWith('http://example.com/recipe1');
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockSavedRecipe);
    });
  });