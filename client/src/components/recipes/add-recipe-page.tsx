import React, { useState } from "react";
import { Typography, TextField, Button, CircularProgress } from "@mui/material";
import { Recipe } from "../../types/recipe_types";
import RecipeComponent from "./recipe";

const AddRecipePage: React.FC = () => {
  const [recipeData, setRecipeData] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const urlInput = document.getElementById("recipe-url-input") as HTMLInputElement;
    const url = urlInput.value.trim();

    if (!url) {
      setError("Please enter a valid URL.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`http://localhost:3000/api/v1/recipe/ext?url=${url}`);

      if (!response.ok) {
        setError("An error occurred while fetching the recipe.");
        setIsLoading(false);
        return;
      }

      const data = await response.json();
      setRecipeData(data as Recipe);
      setError(null);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setError("An error occurred while fetching the recipe.");
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Typography variant="h3">Add a recipe</Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        Found a great recipe elsewhere on the web? Add it here and keep them all in one place!
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          id="recipe-url-input"
          label="Link to the great recipe"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        {error && (
          <Typography variant="body1" color="error" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}
        <Button variant="contained" color="primary" type="submit">
          Add
        </Button>
        {isLoading && <CircularProgress sx={{ ml: 2 }} />}
      </form>
      {recipeData && (
        <RecipeComponent recipe={recipeData} />
      )}
    </div>
  );
};

export default AddRecipePage;
