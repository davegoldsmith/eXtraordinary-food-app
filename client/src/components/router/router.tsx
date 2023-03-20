import { Route, Routes } from "react-router-dom";
import Recipes from "../recipes/recipes";
import Home from "../home/home";
import MainLayout from "../layouts/main_layout";
import NotFound from "../not_found/not_found";
import RecipePage from "../recipes/recipe-page";
import AddRecipePage from "../recipes/add-recipe-page";
import MealPlanPage from "../meal_planner/meal-planner-page";

const Router: React.FC = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<MainLayout/>}>
        <Route index element={<Home/>} /> 
        <Route path="recipes" element={<Recipes/>} /> 
        <Route path="mealPlanner" element={<MealPlanPage/>} />
        <Route path="recipe/:recipeId" element={<RecipePage/>} />
        <Route path="recipe/add" element={<AddRecipePage/>} />
        <Route path="*" element={<NotFound/>} /> 
      </Route>
    </Routes>
    </>
  );
};

export default Router;