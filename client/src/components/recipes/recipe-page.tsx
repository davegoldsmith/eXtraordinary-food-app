import React, { useState, useEffect } from 'react';
import { Container, CircularProgress } from '@mui/material';
import RecipeComponent from './recipe';
import { Recipe } from '../../types/recipe_types';
import { useParams } from 'react-router-dom';

const RecipePage: React.FC = () => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const {recipeId} = useParams();


  useEffect(() => {
    const fetchRecipe = async () => {
      const response = await fetch(`http://localhost:3000/api/v1/recipe?recipeId=${recipeId}`);
      const data = await response.json() as Recipe;
      setRecipe(data);
      setIsLoading(false);
    };

    fetchRecipe();
  }, []);

  return (
    <Container maxWidth="md">
      {isLoading ? (
        <CircularProgress />
      ) : (
        recipe && <RecipeComponent recipe={recipe} />
      )}
    </Container>
  );
};

export default RecipePage;
