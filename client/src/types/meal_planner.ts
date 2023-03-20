export interface Meal {
  id: number;
  imageType: string;
  title: string;
  readyInMinutes: number;
  servings: number;
  sourceUrl: string;
}
export interface Nutrients {
  calories: number;
  protein: number;
  fat: number;
  carbohydrates: number;
}
export interface MealPlanner {
  meals: Meal[];
  nutrients: Nutrients;
}
export interface DayMealPlan {
  meals: Meal[];
  nutrients: Nutrients;
}
export interface WeeklyMealPlan {
  week: {
    monday: MealPlanner;
    tuesday: MealPlanner;
    wednesday: MealPlanner;
    thursday: MealPlanner;
    friday: MealPlanner;
    saturday: MealPlanner;
    sunday: MealPlanner;
  };
}
