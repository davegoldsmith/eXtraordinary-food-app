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

