import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  CircularProgress
} from "@mui/material";
import { useState } from "react";
import { DayMealPlan, WeekMealPlan } from "../../types/meal_planner_types";
import MealPlan from "./meal-planner";

const MealPlanPage: React.FC = () => {
  const [mealPlanType, setMealPlanType] = useState<"day" | "week">("day");
  const [mealPlan, setMealPlan] = useState<DayMealPlan | WeekMealPlan>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleTimeFrameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMealPlanType(event.target.value as "day" | "week");
    setIsLoading(true);
    getMealPlan();
    setIsLoading(false);
  };


  const getMealPlan = async () => {
    let url = 'http://localhost:3000/api/v1/DayMealPlanner';
    if (mealPlanType === "week") {
      url = 'http://localhost:3000/api/v1/WeekMealPlanner';
    }
    const data = await fetch(url);
    const json = await data.json();
    setMealPlan(json);
  };


  return (
    <>
      <FormControl>
        <FormLabel id="timeFrame-radio-buttons-group-label">
          TimeFrame
        </FormLabel>
        <RadioGroup
          aria-labelledby="timeFrame-radio-buttons-group-label"
          defaultValue="day"
          name="timeFrame-radio-buttons-group"
          value={mealPlanType}
          onChange={handleTimeFrameChange}
        >
          <FormControlLabel value="day" control={<Radio />} label="day" />
          <FormControlLabel value="week" control={<Radio />} label="week" />
        </RadioGroup>
      </FormControl>
      {isLoading && <CircularProgress sx={{ ml: 2 }} />}
      {mealPlan && (<MealPlan mealData={mealPlan} timeFrame={mealPlanType} />)}
    </>
  );
};
export default MealPlanPage;
