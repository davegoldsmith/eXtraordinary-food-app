export interface Meals {
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
  meals: Meals[];
  nutrients: Nutrients;
}
export interface DyMealPlanner {
  meals: Meals[];
  nutrients: Nutrients;
}
export interface WeeklyMealPlanner {
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
