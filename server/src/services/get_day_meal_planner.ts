import { app } from "../app";
import { MealPlanner } from "../types/meal_planner";

const SPOONACULAR_API_KEY = "23384aee00744f30b4f3d7bb7fa347c6";
console.log(SPOONACULAR_API_KEY);
//${process.env.SPOONACULAR_API_KEY}`
//"https://api.spoonacular.com/mealplanner/generate/?timeFrame=%22day%22&apiKey=23384aee00744f30b4f3d7bb7fa347c6";
//api.spoonacular.com/mealplanner/generate/apiKey=23384aee00744f30b4f3d7bb7fa347c6

//let FETCHURL = `https://api.spoonacular.com/mealplanner/generate/?timeFrame=day&apiKey=${SPOONACULAR_API_KEY}`;

/*export const getDayMealPlanner = async () => {
  try {
    const response = await fetch(FETCHURL);
    if (response.ok) {
      const json = await response.json();
      console.log(json);
      return json as MealPlanner;
    }
  } catch (error) {
    if (typeof error === "string") {
      return error;
    }
  }
};
*/
export const getMealPlanner = async (
  inputTimeFrame: string = "",
  inputTargetCalories: number = 0,
  inputDiet: string = "",
  inputExclude: string = "" //A comma-separated list of allergens or ingredients that must be excluded. "shellfish, olives",
) => {
  let APPENDURL = "";
  let FETCHURL = `https://api.spoonacular.com/mealplanner/generate/?apiKey=${SPOONACULAR_API_KEY}`;
  console.log("inside get meal planner");
  console.log(inputTimeFrame);
  console.log(inputTargetCalories);
  console.log(inputDiet);
  console.log(inputExclude);

  if (inputTimeFrame !== "")
    APPENDURL = APPENDURL + `&timeFrame=%22${inputTimeFrame}%22`;
  if (inputTargetCalories > 0)
    APPENDURL = APPENDURL + `&targetCalories=${inputTargetCalories}`;
  if (inputDiet !== "") APPENDURL = APPENDURL + `&diet=%22${inputDiet}%22`;
  if (inputExclude !== "")
    APPENDURL = APPENDURL + `&diet=%22${inputExclude}%22`;
  if (APPENDURL !== undefined) FETCHURL = FETCHURL + APPENDURL;
  console.log(FETCHURL);
  try {
    const response = await fetch(FETCHURL);
    if (response.ok) {
      const json = await response.json();
      return json;
    }
  } catch (error) {
    if (typeof error === "string") {
      return error;
    }
  }
  app.get("MealPlanner", async (req, res) => {
    const dayMealPlanner = await getMealPlanner("");
    const result = JSON.stringify({
      results: dayMealPlanner,
    });
    res.status(200).send(result);
  });
};

export const getDayMealPlanner = async () => {
  const retvalue = getMealPlanner("day");
  return retvalue;
};

export const getDayCalorieMealPlanner = async (inputTargetCalories: number) => {
  const retvalue = getMealPlanner("day", inputTargetCalories);
  return retvalue;
};
