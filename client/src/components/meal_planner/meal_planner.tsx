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
import { DyMealPlanner, WeeklyMealPlanner } from "../../types/meal_planner";
import { GenerateMealPlanner } from "./GenerateMealPlanner";

const MealPlanner: React.FC = () => {
  const [timeFrame, setTimeFrame] = useState("day");
  const [diet, setDiet] = useState("No Diet");
  const [exclude, setExclude] = useState({
    dairy: false,
    egg: false,
    gluten: false,
    grain: false,
    peanut: false,
    seafood: false,
    sesame: false,
    shellfish: false,
    soy: false,
    sulfite: false,
    treenut: false,
    wheat: false,
    corn: false,
  });
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
  const {
    dairy,
    egg,
    gluten,
    grain,
    peanut,
    seafood,
    sesame,
    shellfish,
    soy,
    sulfite,
    treenut,
    wheat,
    corn,
  } = exclude;
  /*const error =
    [
      dairy,
      egg,
      gluten,
      grain,
      peanut,
      seafood,
      sesame,
      shellfish,
      soy,
      sulfite,
      treenut,
      wheat,
      corn,
    ].filter((v) => v).length !== 12; */

  const handleChangeRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTimeFrame((event.target as HTMLInputElement).value);
  };

  const handleChangeDiet = (event: SelectChangeEvent) => {
    setDiet(event.target.value as string);
  };

  let valuePass = "";
  const [dayMeals, setdayMeals] = useState<DyMealPlanner>();
  const [weeklyMeals, setWeeklyMeals] = useState<WeeklyMealPlanner>();

  const GenerateMealPlan = () => {
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
      setWeeklyMeals(json);
      console.log(json);
      return json;
    };

    if (typeof targetCalories === "string" && targetCalories !== "")
      valuePass = `targetCalories=${targetCalories}&`;
    if (diet !== "") valuePass += `diet=${diet}&`;
    //if ([...exclude] === true) valuePass += `exclude=${exclude}&`;
    if (valuePass !== "") {
      valuePass = "/?" + valuePass;
    }
    if (timeFrame === "day") {
      requestDayMealPlannerService(valuePass);
      <GenerateMealPlanner
        timeFrame="day"
        mealData={dayMeals as DyMealPlanner}
      />;
    } else {
      requestWeeklyMealPlannerService(valuePass);
      return (
        <>
          <Typography> Week </Typography>
          <GenerateMealPlanner
            timeFrame="week"
            mealData={weeklyMeals as WeeklyMealPlanner}
          />
        </>
      );
    }
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
        <FormLabel component="legend">Intolerances</FormLabel>
        <FormControlLabel
          control={
            <Checkbox
              // checked={dairy}
              onChange={handleChangeExclude}
              name="Dairy"
              inputProps={{ "aria-label": "Dairy" }}
            />
          }
          label="Dairy"
        />
        <FormControlLabel
          control={
            <Checkbox
              //checked={egg}
              onChange={handleChangeExclude}
              inputProps={{ "aria-label": "Egg" }}
            />
          }
          label="Egg"
        />
        <FormControlLabel
          control={
            <Checkbox
              //checked={gluten}
              onChange={handleChangeExclude}
              inputProps={{ "aria-label": "Gluten" }}
            />
          }
          label="Gluten"
        />
        <FormControlLabel
          control={
            <Checkbox
              //checked={grain}
              onChange={handleChangeExclude}
              inputProps={{ "aria-label": "Grain" }}
            />
          }
          label="Grain"
        />
        <FormControlLabel
          control={
            <Checkbox
              //checked={peanut}
              onChange={handleChangeExclude}
              inputProps={{ "aria-label": "peanut" }}
            />
          }
          label="peanut"
        />
        <FormControlLabel
          control={
            <Checkbox
              //checked={seafood}
              onChange={handleChangeExclude}
              inputProps={{ "aria-label": "seafood" }}
            />
          }
          label="seafood"
        />
        <FormControlLabel
          control={
            <Checkbox
              //checked={sesame}
              onChange={handleChangeExclude}
              inputProps={{ "aria-label": "Sesame" }}
            />
          }
          label="Sesame"
        />{" "}
        <FormControlLabel
          control={
            <Checkbox
              //checked={shellfish}
              onChange={handleChangeExclude}
              inputProps={{ "aria-label": "Shellfish" }}
            />
          }
          label="Shellfish"
        />
        <FormControlLabel
          control={
            <Checkbox
              //checked={soy}
              onChange={handleChangeExclude}
              inputProps={{ "aria-label": "Soy" }}
            />
          }
          label="Soy"
        />
        <FormControlLabel
          control={
            <Checkbox
              //checked={sulfite}
              onChange={handleChangeExclude}
              inputProps={{ "aria-label": "Sulfit" }}
            />
          }
          label="Sulfite"
        />
        <FormControlLabel
          control={
            <Checkbox
              //checked={treenut}
              onChange={handleChangeExclude}
              inputProps={{ "aria-label": "Tree Nut" }}
            />
          }
          label="Tree Nut"
        />
        <FormControlLabel
          control={
            <Checkbox
              //checked={wheat}
              onChange={handleChangeExclude}
              inputProps={{ "aria-label": "Wheat" }}
            />
          }
          label="Wheat"
        />
        <FormControlLabel
          control={
            <Checkbox
              //checked={corn}
              onChange={handleChangeExclude}
              inputProps={{ "aria-label": "Corn" }}
            />
          }
          label="Corn"
        />
      </FormGroup>
      <Stack direction="row" spacing={2}>
        <Button onClick={GenerateMealPlan}>Generate Meal Plan</Button>
      </Stack>
    </>
  );
};
export default MealPlanner;
