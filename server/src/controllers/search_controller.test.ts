import request from 'supertest';
import { app } from '../app';
import * as searchService from '../services/search_service';
import {SearchResult, RecipeSearchParams} from '../types/search_types'

const dummySearchResultData = [{
  "id": 715424,
  "title": "The Best Chili",
  "image": "https://spoonacular.com/recipeImages/715424-312x231.jpg",
  "imageType": "jpg"
},
{
  "id": 646512,
  "title": "Salmon Caesar Salad",
  "image": "https://spoonacular.com/recipeImages/646512-312x231.jpg",
  "imageType": "jpg"
},
{
  "id": 1046982,
  "title": "How to Make the Perfect Sweet Potato Sloppy Joes",
  "image": "https://spoonacular.com/recipeImages/1046982-312x231.jpg",
  "imageType": "jpg"
},
{
  "id": 642540,
  "title": "Falafel Burgers",
  "image": "https://spoonacular.com/recipeImages/642540-312x231.jpg",
  "imageType": "jpg"
},
{
  "id": 639392,
  "title": "Chunky Two-Bean Chili",
  "image": "https://spoonacular.com/recipeImages/639392-312x231.jpg",
  "imageType": "jpg"
},
{
  "id": 644581,
  "title": "Ginger Garlic Chili Salmon",
  "image": "https://spoonacular.com/recipeImages/644581-312x231.jpg",
  "imageType": "jpg"
},
{
  "id": 633837,
  "title": "Baked Sweet Potato Fries",
  "image": "https://spoonacular.com/recipeImages/633837-312x231.jpg",
  "imageType": "jpg"
},
{
  "id": 660395,
  "title": "Smokey Rainbow Chili",
  "image": "https://spoonacular.com/recipeImages/660395-312x231.jpg",
  "imageType": "jpg"
},
{
  "id": 638552,
  "title": "Chili chops with cauliflower salad",
  "image": "https://spoonacular.com/recipeImages/638552-312x231.jpg",
  "imageType": "jpg"
},
{
  "id": 638764,
  "title": "Chipotle Turkey Chili",
  "image": "https://spoonacular.com/recipeImages/638764-312x231.jpg",
  "imageType": "jpg"
},
{
  "id": 660288,
  "title": "Slow Cooker Kahlua Pork with Sweet Chili Pineapple Sauce",
  "image": "https://spoonacular.com/recipeImages/660288-312x231.jpg",
  "imageType": "jpg"
},
{
  "id": 795749,
  "title": "Crispy Baked Green Bean Fries",
  "image": "https://spoonacular.com/recipeImages/795749-312x231.jpg",
  "imageType": "jpg"
}
];


jest.mock('../services/search_service');
const apiPrefix = '/api/v1';

describe('<Search Controoler>', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should return a recipe list of  when no search parameters are given', async () => {
        
        (searchService.getSearch as jest.Mock).mockResolvedValue(dummySearchResultData[1]);
        const response = await request(app).get(`${apiPrefix}/search`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(dummySearchResultData[1]);
        expect(searchService.getSearch).toHaveBeenCalledWith({});
    });

    it('should return a recipe list of  when  search parameters are given', async () => {
       
      const mockSearch: RecipeSearchParams = {cuisine: 'american', type : 'main course'};
      (searchService.getSearch as jest.Mock).mockResolvedValue(dummySearchResultData);
      const response = await request(app).get(`${apiPrefix}/search?cuisine=american&type=main course`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(dummySearchResultData);
      expect(searchService.getSearch).toHaveBeenCalledWith(mockSearch);
  });

});
