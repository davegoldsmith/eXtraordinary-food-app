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
import { DyMealPlanner, WeeklyMealPlanner } from "../../types/meal_planner_types";
import { GenerateMealPlanner } from "./GenerateMealPlanner";
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
  const [dayMeals, setdayMeals] = useState<DyMealPlanner>(SAMPLEDATA);
  const [weeklyMeals, setWeeklyMeals] =
    useState<WeeklyMealPlanner>(SAMPLEWEEKDATA);

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
      <FormGroup row>
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

      <GenerateMealPlanner
        timeFrame="week"
        mealData={weeklyMeals as WeeklyMealPlanner}
      />
    </>
  );
};
export default MealPlanner;
