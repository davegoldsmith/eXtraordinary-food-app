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
export interface DayMealPlan {
  meals: Meal[];
  nutrients: Nutrients;
}

export interface WeekMealPlan {
  week: Record<string, DayMealPlan>;
}

