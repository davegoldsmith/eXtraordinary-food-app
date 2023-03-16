import request from "supertest";
import { app } from "../app";
import * as DayMealPlannerSpoonacularAPI from "../services/get_day_meal_planner";

import { MealPlanner } from "../types/meal_planner";

const mockFunction = jest.fn();
afterEach(() => {
  jest.clearAllMocks();
});
const SAMPLEDATA = {
  meals: [
    {
      id: 1100990,
      imageType: "jpg",
      title:
        "Blueberry, Chocolate & Cocao Superfood Pancakes - Gluten-Free/Paleo/Vegan",
      readyInMinutes: 30,
      servings: 2,
      sourceUrl:
        "https://spoonacular.com/blueberry-chocolate-cocao-superfood-pancakes-gluten-free-paleo-vegan-1100990",
    },
    {
      id: 653251,
      imageType: "jpg",
      title: "Noodles and Veggies With Peanut Sauce",
      readyInMinutes: 30,
      servings: 4,
      sourceUrl:
        "https://spoonacular.com/noodles-and-veggies-with-peanut-sauce-653251",
    },
    {
      id: 654905,
      imageType: "jpg",
      title: "Pasta With Chickpeas and Kale",
      readyInMinutes: 45,
      servings: 4,
      sourceUrl: "https://spoonacular.com/pasta-with-chickpeas-and-kale-654905",
    },
  ],
  nutrients: {
    calories: 2069.95,
    protein: 57.72,
    fat: 74.94,
    carbohydrates: 298.45,
  },
};

describe("GET /DayMealPlanner endpoint", () => {
  test("status code successfully 200", async () => {
    // Act
    const res = await request(app).get("/api/v1/DayMealPlanner");
    console.log(res);
    // Assert
    expect(res.statusCode).toEqual(200);
  });

  test("meal planner successfully returned as empty array when no data", async () => {
    // Arrange
    jest
      .spyOn(DayMealPlannerSpoonacularAPI, "getDayMealPlanner")
      .mockResolvedValue([] as unknown as MealPlanner);
    // Act
    const res = await request(app).get("/api/v1/DayMealPlanner");

    // Assert
    expect(res.body).toEqual([]);
    expect(res.body.length).toEqual(0);
  });

  test("meal Planner successfully returned as array of meals", async () => {
    // Arrange
    jest
      .spyOn(DayMealPlannerSpoonacularAPI, "getDayMealPlanner")
      .mockResolvedValue(SAMPLEDATA as MealPlanner);

    // Act
    const res = await request(app).get("/api/v1/DayMealPlanner");

    // Assert
    expect(res.body).toEqual(SAMPLEDATA);
    expect(res.body.meals.length).toEqual(3);
    expect(res.body).toHaveProperty("meals");
  });
});
/*************** */
const SAMPLETARGETCALORIEDATA = {
  meals: [
    {
      id: 644800,
      imageType: "jpg",
      title: "Gluten Free Blueberry Muffins",
      readyInMinutes: 45,
      servings: 12,
      sourceUrl: "https://spoonacular.com/gluten-free-blueberry-muffins-644800",
    },
    {
      id: 641220,
      imageType: "jpg",
      title: "Simple Chicken Breast Salad",
      readyInMinutes: 25,
      servings: 2,
      sourceUrl: "https://spoonacular.com/simple-chicken-breast-salad-641220",
    },
    {
      id: 648430,
      imageType: "jpg",
      title: "Jambalaya Soup",
      readyInMinutes: 45,
      servings: 8,
      sourceUrl: "https://spoonacular.com/jambalaya-soup-648430",
    },
  ],
  nutrients: {
    calories: 1000.08,
    protein: 61.1,
    fat: 56.77,
    carbohydrates: 64.53,
  },
};
/*
describe("GET /DayMealPlanner/ endpoint userPreferences = targetCalories", () => {
  test("status code successfully 200", async () => {
    // Arrange
    jest
      .spyOn(DayMealPlannerSpoonacularAPI, "getDayCalorieMealPlanner")
      .mockResolvedValue(SAMPLETARGETCALORIEDATA as MealPlanner);
    //Act
    const res = await request(app).get("/api/v1/DayMealPlanner/1000");
    console.log(res);
    // Assert
    expect(res.statusCode).toEqual(200);
  });
});

describe("GET /DayMealPlanner/ endpoint userPrefeences = targetCalories or 0", () => {
  test("status code successfully 200", async () => {
    // Arrange
    jest
      .spyOn(DayMealPlannerSpoonacularAPI, "getDayMealPlanner")
      .mockResolvedValue(SAMPLETARGETCALORIEDATA as MealPlanner);
    //Act
    const res = await request(app).get("/api/v1/DayMealPlanner/500");
    console.log(res);
    // Assert
    expect(res.statusCode).toEqual(200);
  });
});

*/
const SAMPLEDIETDATA = {
  meals: [
    {
      id: 1100990,
      imageType: "jpg",
      title:
        "Blueberry, Chocolate & Cocao Superfood Pancakes - Gluten-Free/Paleo/Vegan",
      readyInMinutes: 30,
      servings: 2,
      sourceUrl:
        "https://spoonacular.com/blueberry-chocolate-cocao-superfood-pancakes-gluten-free-paleo-vegan-1100990",
    },
    {
      id: 642585,
      imageType: "jpg",
      title: "Farfalle with fresh tomatoes, basil and mozzarella",
      readyInMinutes: 15,
      servings: 4,
      sourceUrl:
        "https://spoonacular.com/farfalle-with-fresh-tomatoes-basil-and-mozzarella-642585",
    },
    {
      id: 647204,
      imageType: "jpg",
      title: "Honey Crescents",
      readyInMinutes: 45,
      servings: 4,
      sourceUrl: "https://spoonacular.com/honey-crescents-647204",
    },
  ],
  nutrients: {
    calories: 1969.46,
    protein: 47.03,
    fat: 67.76,
    carbohydrates: 296.64,
  },
};
