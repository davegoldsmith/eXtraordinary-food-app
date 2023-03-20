import {
  Box,
  getFormControlLabelUtilityClasses,
  Grid,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { AccessTime } from "@mui/icons-material";
import { useContext, useState } from "react";
import {
  DayMealPlannerContext,
  MealPlannerContext,
} from "../context/mealPlanner_context_provider";
import { DyMealPlanner, WeeklyMealPlanner } from "../../types/meal_planner_types";
import MealPlanner from "./meal_planner";

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

const SAMPLEWEEKDATA = {
  week: {
    monday: {
      meals: [
        {
          id: 665273,
          imageType: "jpg",
          title: "Whole Wheat Blueberry Muffins",
          readyInMinutes: 45,
          servings: 12,
          sourceUrl:
            "https://spoonacular.com/whole-wheat-blueberry-muffins-665273",
        },
        {
          id: 1697625,
          imageType: "jpg",
          title:
            "Light and Tasty Tomato Basil Mozzarella Pasta for a Hot Summer Evening",
          readyInMinutes: 25,
          servings: 2,
          sourceUrl:
            "https://spoonacular.com/light-and-tasty-tomato-basil-mozzarella-pasta-for-a-hot-summer-evening-1697625",
        },
        {
          id: 654009,
          imageType: "jpg",
          title: "Orecchiette With Sun-Dried and Fresh Cherry Tomatoes",
          readyInMinutes: 45,
          servings: 2,
          sourceUrl:
            "https://spoonacular.com/orecchiette-with-sun-dried-and-fresh-cherry-tomatoes-654009",
        },
      ],
      nutrients: {
        calories: 1879.53,
        protein: 55.47,
        fat: 75.41,
        carbohydrates: 248.02,
      },
    },
    tuesday: {
      meals: [
        {
          id: 640965,
          imageType: "jpg",
          title: "Crushed Lentil Soup- Granola Style",
          readyInMinutes: 45,
          servings: 1,
          sourceUrl:
            "https://spoonacular.com/crushed-lentil-soup-granola-style-640965",
        },
        {
          id: 639954,
          imageType: "jpg",
          title: "Colorful Wild Rice Salad",
          readyInMinutes: 30,
          servings: 3,
          sourceUrl: "https://spoonacular.com/colorful-wild-rice-salad-639954",
        },
        {
          id: 645795,
          imageType: "jpg",
          title: "Grilled Peppers With Anchovies, Feta Cheese and Spaghetti",
          readyInMinutes: 45,
          servings: 4,
          sourceUrl:
            "https://spoonacular.com/grilled-peppers-with-anchovies-feta-cheese-and-spaghetti-645795",
        },
      ],
      nutrients: {
        calories: 1908.21,
        protein: 51.56,
        fat: 76.07,
        carbohydrates: 262.75,
      },
    },
    wednesday: {
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
          id: 639927,
          imageType: "jpg",
          title: "Cold Soba Noodles",
          readyInMinutes: 45,
          servings: 3,
          sourceUrl: "https://spoonacular.com/cold-soba-noodles-639927",
        },
      ],
      nutrients: {
        calories: 1781.41,
        protein: 49.98,
        fat: 69.77,
        carbohydrates: 249.25,
      },
    },
    thursday: {
      meals: [
        {
          id: 632639,
          imageType: "jpg",
          title: "Applesauce Carrot Cake Muffins",
          readyInMinutes: 45,
          servings: 24,
          sourceUrl:
            "https://spoonacular.com/applesauce-carrot-cake-muffins-632639",
        },
        {
          id: 1697625,
          imageType: "jpg",
          title:
            "Light and Tasty Tomato Basil Mozzarella Pasta for a Hot Summer Evening",
          readyInMinutes: 25,
          servings: 2,
          sourceUrl:
            "https://spoonacular.com/light-and-tasty-tomato-basil-mozzarella-pasta-for-a-hot-summer-evening-1697625",
        },
        {
          id: 641429,
          imageType: "jpg",
          title: "Creamy Corn Chowder",
          readyInMinutes: 45,
          servings: 4,
          sourceUrl: "https://spoonacular.com/creamy-corn-chowder-641429",
        },
      ],
      nutrients: {
        calories: 1764.76,
        protein: 55.58,
        fat: 67.32,
        carbohydrates: 247.54,
      },
    },
    friday: {
      meals: [
        {
          id: 665279,
          imageType: "jpg",
          title: "Whole Wheat Cranberry Pear Muffins",
          readyInMinutes: 45,
          servings: 18,
          sourceUrl:
            "https://spoonacular.com/whole-wheat-cranberry-pear-muffins-665279",
        },
        {
          id: 1697625,
          imageType: "jpg",
          title:
            "Light and Tasty Tomato Basil Mozzarella Pasta for a Hot Summer Evening",
          readyInMinutes: 25,
          servings: 2,
          sourceUrl:
            "https://spoonacular.com/light-and-tasty-tomato-basil-mozzarella-pasta-for-a-hot-summer-evening-1697625",
        },
        {
          id: 634404,
          imageType: "jpg",
          title: "Basic Risotto",
          readyInMinutes: 45,
          servings: 2,
          sourceUrl: "https://spoonacular.com/basic-risotto-634404",
        },
      ],
      nutrients: {
        calories: 1766.75,
        protein: 55.5,
        fat: 66.7,
        carbohydrates: 235.44,
      },
    },
    saturday: {
      meals: [
        {
          id: 640965,
          imageType: "jpg",
          title: "Crushed Lentil Soup- Granola Style",
          readyInMinutes: 45,
          servings: 1,
          sourceUrl:
            "https://spoonacular.com/crushed-lentil-soup-granola-style-640965",
        },
        {
          id: 664565,
          imageType: "jpg",
          title: "Vegetable Minestrone Soup",
          readyInMinutes: 30,
          servings: 4,
          sourceUrl: "https://spoonacular.com/vegetable-minestrone-soup-664565",
        },
        {
          id: 651190,
          imageType: "jpg",
          title: "Masala-Tofu Burger",
          readyInMinutes: 45,
          servings: 4,
          sourceUrl: "https://spoonacular.com/masala-tofu-burger-651190",
        },
      ],
      nutrients: {
        calories: 1736.89,
        protein: 47.2,
        fat: 58.15,
        carbohydrates: 267.34,
      },
    },
    sunday: {
      meals: [
        {
          id: 635394,
          imageType: "jpg",
          title: "Blueberry & Orange Maple Scones",
          readyInMinutes: 45,
          servings: 16,
          sourceUrl:
            "https://spoonacular.com/blueberry-orange-maple-scones-635394",
        },
        {
          id: 1697625,
          imageType: "jpg",
          title:
            "Light and Tasty Tomato Basil Mozzarella Pasta for a Hot Summer Evening",
          readyInMinutes: 25,
          servings: 2,
          sourceUrl:
            "https://spoonacular.com/light-and-tasty-tomato-basil-mozzarella-pasta-for-a-hot-summer-evening-1697625",
        },
        {
          id: 642125,
          imageType: "jpg",
          title: "Easy Thai Fried Rice",
          readyInMinutes: 45,
          servings: 4,
          sourceUrl: "https://spoonacular.com/easy-thai-fried-rice-642125",
        },
      ],
      nutrients: {
        calories: 1820.15,
        protein: 51.79,
        fat: 60.11,
        carbohydrates: 265.15,
      },
    },
  },
};

export interface GenerateMealPlannerProps {
  timeFrame: string;
  mealData: DyMealPlanner | WeeklyMealPlanner;
}
export const GenerateMealPlanner: React.FC<GenerateMealPlannerProps> = (
  inputProps
) => {
  function isWeek(
    inputMealPlan: DyMealPlanner | WeeklyMealPlanner
  ): inputMealPlan is WeeklyMealPlanner {
    return (inputMealPlan as WeeklyMealPlanner) !== undefined;
  }
  const [dayMeals, setdayMeals] = useState<DyMealPlanner>(SAMPLEDATA);
  const [weeklyMeals, setWeeklyMeals] =
    useState<WeeklyMealPlanner>(SAMPLEWEEKDATA);
  console.log(inputProps.timeFrame);
  return (
    <>
      {inputProps.timeFrame === "day"
        ? !isWeek(inputProps.mealData) &&
          dayMeals.meals.map((meal) => {
            return (
              <>
                <Grid item xs={4}>
                  <Grid container>
                    <>
                      <Grid item>
                        <Paper elevation={10}>
                          <Box
                            sx={{
                              height: 85,
                            }}
                          >
                            <Typography
                              variant="subtitle1"
                              component={"h6"}
                              padding="2"
                            >
                              {meal.title}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography variant="subtitle2">
                              No of Servings: {meal.servings}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography variant="subtitle2">
                              Ready In Minutes: {meal.readyInMinutes}
                              <AccessTime sx={{ width: 20.0, height: 12.5 }} />
                            </Typography>
                          </Box>
                          <Box>
                            <img
                              src={`https://spoonacular.com/recipeImages/${meal.id}-90x90.${meal.imageType}`}
                              alt={meal.title}
                            />
                          </Box>
                        </Paper>
                      </Grid>
                    </>
                  </Grid>
                </Grid>
              </>
            );
          })
        : weeklyMeals &&
          weeklyMeals.week &&
          weeklyMeals.week.monday.meals &&
          weeklyMeals.week.monday.meals.map((meal, index) => {
            return (
              <>
                <Grid item xs={4}>
                  <Grid container>
                    <>
                      <Grid item>
                        <Paper elevation={10}>
                          <Box
                            sx={{
                              height: 85,
                            }}
                          >
                            <Typography
                              variant="subtitle1"
                              component={"h6"}
                              padding="2"
                            >
                              {meal.title}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography variant="subtitle2">
                              No of Servings: {meal.servings}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography variant="subtitle2">
                              Ready In Minutes: {meal.readyInMinutes}
                              <AccessTime sx={{ width: 20.0, height: 12.5 }} />
                            </Typography>
                          </Box>
                          <Box>
                            <img
                              src={`https://spoonacular.com/recipeImages/${meal.id}-90x90.${meal.imageType}`}
                              alt={meal.title}
                            />
                          </Box>
                        </Paper>
                      </Grid>
                    </>
                  </Grid>
                </Grid>
              </>
            );
          })}
    </>
  );
};
