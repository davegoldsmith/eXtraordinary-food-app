import React, { useState } from "react";
import { Typography, TextField, Button } from "@mui/material";
import { Recipe } from "../../types/recipe_types";
import RecipeComponent from "./recipe";

const AddRecipePage: React.FC = () => {
  const [recipeData, setRecipeData] = useState<Recipe | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const urlInput = document.getElementById("recipe-url-input") as HTMLInputElement;
    const url = urlInput.value.trim();

    if (!url) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/v1/recipe/ext?url=${url}`);
      const data = await response.json();
      setRecipeData(data as Recipe);
    } catch (error) {
      console.error(error);
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
        <Button variant="contained" color="primary" type="submit">
          Add
        </Button>
      </form>
      {recipeData && (
        <RecipeComponent recipe={recipeData} />
      )}
    </div>
  );
};

export default AddRecipePage;
