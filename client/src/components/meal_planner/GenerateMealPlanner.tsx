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
import { DyMealPlanner, WeeklyMealPlanner } from "../../types/meal_planner";
import MealPlanner from "./meal_planner";

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
  const [dayMeals, setdayMeals] = useState<DyMealPlanner>();
  const [weeklyMeals, setWeeklyMeals] = useState<WeeklyMealPlanner>();
  console.log(inputProps.timeFrame);
  return (
    <>
      {inputProps.timeFrame === "day"
        ? !isWeek(inputProps.mealData) &&
          inputProps.mealData.meals.map((meal) => {
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
