import { Route, Routes } from "react-router-dom";
import Recipes from "../recipes/recipes";
import Home from "../home/home";
import MainLayout from "../layouts/main_layout";
import MealPlanner from "../meal_planner/meal_planner";
import NotFound from "../not_found/not_found";

const Router: React.FC = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<MainLayout/>}>
        <Route index element={<Home/>} /> 
        <Route path="recipes" element={<Recipes/>} /> 
        <Route path="mealPlanner" element={<MealPlanner/>} />  
        <Route path="*" element={<NotFound/>} /> 
      </Route>
    </Routes>
    </>
  );
};

export default Router;