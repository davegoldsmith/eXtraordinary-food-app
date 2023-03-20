import { CardMedia, Grid, Typography, Card, CardActionArea, CardContent, CardHeader } from "@mui/material";
import { AccessTime } from "@mui/icons-material";
import { DayMealPlan, WeekMealPlan } from "../../types/meal_planner_types";
import { useNavigate } from "react-router-dom";

interface MealPlanProps {
  mealData: DayMealPlan | WeekMealPlan;
  timeFrame: "day" | "week";
}

const MealPlan: React.FC<MealPlanProps> = ({ mealData, timeFrame }) => {
  const isWeek = (inputMealPlan: DayMealPlan | WeekMealPlan): inputMealPlan is WeekMealPlan => {
    return (inputMealPlan as WeekMealPlan).week !== undefined;
  };
  const meals = isWeek(mealData) ? mealData.week : { Day: mealData };
  const navigate = useNavigate();
  function handleCardClick(recipeId: number) {

    navigate(`/recipe/${recipeId}`)

  }

  return (
    <>
      {
        Object.keys(meals).map((day, index) => (
          <Grid key={day} item>
            <Grid item >
              <Typography variant="h6" component="h2" padding="2">
                {day[0].toUpperCase() + day.slice(1)}
              </Typography>
            </Grid>
            <Grid container spacing={3}>
              {meals[day].meals.map((meal) => (
                <Grid key={meal.id} item xs={12} sm={6} md={4}>
                  <Card sx={{ maxWidth: 345, height: "80%", mt: 4 }} onClick={() => handleCardClick(meal.id)} >
                    <CardActionArea>
                      <CardContent>
                        <Typography variant="subtitle1" component="h6" padding="2">
                          {meal.title}
                        </Typography>
                        <Typography variant="subtitle2">No of Servings: {meal.servings}</Typography>
                        <Typography variant="subtitle2">
                          Ready In Minutes: {meal.readyInMinutes}
                          <AccessTime sx={{ width: 20.0, height: 12.5 }} />
                        </Typography>
                      </CardContent>
                      <CardMedia
                        component="img"
                        height="250"
                        image={`https://spoonacular.com/recipeImages/${meal.id}-90x90.${meal.imageType}`}
                        alt={meal.title}
                      />
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        ))
      }
    </>
  );
};

export default MealPlan;
