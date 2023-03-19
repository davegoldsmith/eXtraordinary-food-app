import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { DyMealPlanner } from "../../types/meal_planner";

const MealPlanner: React.FC = () => {
  const [timeFrame, setTimeFrame] = useState("day");
  const [diet, setDiet] = useState("No Diet");
  const [exclude, setExclude] = useState({ dairy: false, Egg: false });
  const [targetCalories, setTargetCalories] = useState<number>();

  /*const handleChangeExclude = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExclude(event.target.checked);
  };
*/
  const handleChangeExclude = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExclude({
      ...exclude,
      [event.target.name]: event.target.checked,
    });
  };
  const handleChangeRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTimeFrame((event.target as HTMLInputElement).value);
  };

  const handleChangeDiet = (event: SelectChangeEvent) => {
    setDiet(event.target.value as string);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExclude(event.target.checked);
  };

  let valuePass = "";
  const [dayMeals, setdayMeals] = useState<DyMealPlanner>();
  const GenerateMealPlan = () => {
    alert(targetCalories);
    alert(diet);
    alert(exclude);
    alert(timeFrame);
    /*
    const requestDayMealPlannerService = async () => {
      const data = await fetch(`http://localhost:3000/api/v1/DayMealPlanner`);
      const json = await data.json();
      setdayMeals(json);
      console.log(json);
      return json;
    }; */

    const requestDayMealPlannerService = async (appendUrl: string) => {
      const data = await fetch(
        `http://localhost:3000/api/v1/DayMealPlanner${appendUrl}`
      );
      const json = await data.json();
      setdayMeals(json);
      console.log(json);
      return json;
    };
    const requestWeeklyMealPlannerService = async (appendUrl: string) => {
      const data = await fetch(
        `http://localhost:3000/api/v1/WeeklyMealPlanner${appendUrl}`
      );
      const json = await data.json();
      setdayMeals(json);
      console.log(json);
      return json;
    };

    if (typeof targetCalories === "string" && targetCalories !== "")
      valuePass = `targetCalories=${targetCalories}&`;
    if (diet !== "") valuePass += `diet=${diet}&`;
    if (exclude !== "") valuePass += `exclude=${exclude}&`;
    if (valuePass !== "") {
      valuePass = "/?" + valuePass;
    }
    if (timeFrame === "day") requestDayMealPlannerService(valuePass);
    else requestWeeklyMealPlannerService(valuePass);
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
          value={timeFrame}
          onChange={handleChangeRadio}
        >
          <FormControlLabel value="day" control={<Radio />} label="day" />
          <FormControlLabel value="week" control={<Radio />} label="week" />
        </RadioGroup>
      </FormControl>
      <TextField
        id="targetCalories" //ref={this.targetCalories}
        label="targetCalories"
        type="number"
        value={targetCalories}
        InputLabelProps={{
          shrink: true,
        }}
        variant="filled"
      />
      <InputLabel id="diet-select-standard-label">Diet</InputLabel>
      <Select
        labelId="diet-select-standard-label"
        id="demo-select-standard"
        value={diet}
        onChange={handleChangeDiet}
        label="Diet"
      >
        <MenuItem value="No Diet">
          <em>No Diet</em>
        </MenuItem>
        <MenuItem value={"Lacto Vegetarian"}>Lacto Vegetarian</MenuItem>
        <MenuItem value={"Vegetarian"}>Ovo Vegetarian</MenuItem>
        <MenuItem value={"Paleo"}>Paleo</MenuItem>
        <MenuItem value={"Primal"}>Primal</MenuItem>
        <MenuItem value={"Pescetarian"}>Pescetarian</MenuItem>
        <MenuItem value={"Vegan"}>Vegan</MenuItem>
        <MenuItem value={"Vegetarian"}>Vegetarian</MenuItem>
        <MenuItem value={"Ketogenic"}>Ketogenic</MenuItem>
        <MenuItem value={"Whole 30"}>Whole 30</MenuItem>
      </Select>

      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              //checked={Dairy}
              onChange={handleChange}
              name="Dairy"
              inputProps={{ "aria-label": "Dairy" }}
            />
          }
          label="Dairy"
        />
        <FormControlLabel
          control={
            <Checkbox
              //checked={Egg}
              onChange={handleChange}
              inputProps={{ "aria-label": "Egg" }}
            />
          }
          label="Egg"
        />
        <FormControlLabel
          control={
            <Checkbox
              //checked={Egg}
              onChange={handleChange}
              inputProps={{ "aria-label": "Gluten" }}
            />
          }
          label="Gluten"
        />
      </FormGroup>

      <Stack direction="row" spacing={2}>
        <Button onClick={GenerateMealPlan}>Generate Meal Plan</Button>
      </Stack>
    </>
  );
};
export default MealPlanner;
