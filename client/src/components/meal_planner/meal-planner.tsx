import { Box, Grid, Typography, Paper } from "@mui/material";
import { AccessTime } from "@mui/icons-material";
import { DayMealPlan,WeekMealPlan } from "../../types/meal_planner_types";


interface MealPlanProps {
  mealData: DayMealPlan | WeekMealPlan;
  timeFrame: "day" | "week";
}

const MealPlan: React.FC<MealPlanProps> = ({ mealData, timeFrame }) => {
  const isWeek = (inputMealPlan: DayMealPlan | WeekMealPlan): inputMealPlan is WeekMealPlan => {
    return (inputMealPlan as WeekMealPlan).week !== undefined;
  };

  const meals = isWeek(mealData) ? mealData.week : { monday: mealData };

  return (
    <>
      {Object.keys(meals).map((day, index) => (
        <Grid key={day} item xs={4}>
          <Grid container>
            {meals[day].meals.map((meal) => (
              <Grid key={meal.id} item>
                <Paper elevation={10}>
                  <Box sx={{ height: 85 }}>
                    <Typography variant="subtitle1" component="h6" padding="2">
                      {meal.title}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2">No of Servings: {meal.servings}</Typography>
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
            ))}
          </Grid>
        </Grid>
      ))}
    </>
  );
};

export default MealPlan;
