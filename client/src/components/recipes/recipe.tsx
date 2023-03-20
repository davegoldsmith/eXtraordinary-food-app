import React from "react";
import { Step, ExtendedIngredient, Recipe } from "../../types/recipe_types";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  CardHeader,
  Chip,
  Grid,
} from "@mui/material";
import { orange } from "@mui/material/colors";
import { Box } from "@mui/system";

interface RecipeProps {
  recipe: Recipe;
}

const RecipeComponent: React.FC<RecipeProps> = ({ recipe }) => {
  const {
    vegetarian,
    vegan,
    glutenFree,
    dairyFree,
    veryHealthy,
    cheap,
    veryPopular,
    sustainable,
    lowFodmap,
    weightWatcherSmartPoints,
    gaps,
    preparationMinutes,
    cookingMinutes,
    aggregateLikes,
    healthScore,
    creditsText,
    sourceName,
    pricePerServing,
    extendedIngredients,
    id,
    title,
    readyInMinutes,
    servings,
    sourceUrl,
    image,
    imageType,
    summary,
    cuisines,
    dishTypes,
    diets,
    occasions,
    winePairing,
    instructions,
    analyzedInstructions,
    originalId,
  } = recipe;

  return (
    <Card sx={{ width: "100%" }}>
      <CardHeader sx={{ pd: 0 }} />
      <Typography
        variant="h5"
        sx={{
          m: 1,
        }}
        gutterBottom
      >
        {title}
      </Typography>
      <CardMedia component="img" height="400" image={image} alt={title} />
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Dietary restrictions:{" "}
        </Typography>
        <Grid container spacing={2}>
          {vegetarian && (
            <Grid item>
              <Chip label="Vegetarian" color="success" />
            </Grid>
          )}
          {vegan && (
            <Grid item>
              <Chip label="Vegan" color="success" />
            </Grid>
          )}
          {glutenFree && (
            <Grid item>
              <Chip label="Gluten Free" color="success" />
            </Grid>
          )}
          {dairyFree && (
            <Grid item>
              <Chip label="Dairy Free" color="success" />
            </Grid>
          )}
          {veryHealthy && (
            <Grid item>
              <Chip label="Very Healthy" color="success" />
            </Grid>
          )}
          {cheap && (
            <Grid item>
              <Chip label="Cheap" color="success" />
            </Grid>
          )}
          {veryPopular && (
            <Grid item>
              <Chip label="Very Popular" color="success" />
            </Grid>
          )}
          {sustainable && (
            <Grid item>
              <Chip label="Sustainable" color="success" />
            </Grid>
          )}
        </Grid>

        <Typography variant="h6" gutterBottom>
          Ingredients:
        </Typography>
        <Typography variant="body1">
        <ul>
          {extendedIngredients.map((ingredient: ExtendedIngredient) => (
            <li key={ingredient.id}>
              {ingredient.name}: {ingredient.amount} {ingredient.unit}
            </li>
          ))}
        </ul>
        </Typography>
        <Typography variant="h6" gutterBottom>
          Instructions:
        </Typography>
        <Typography variant="body1">
        <ul>
          {analyzedInstructions[0].steps.map((step: Step) => (
            <li key={step.number}>{step.step}</li>
          ))}
        </ul>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default RecipeComponent;
