import { Typography, Grid, Card, CardActionArea, CardMedia, CardContent } from '@mui/material';
import { SearchResult} from '../../types/search_types';
import { useNavigate } from "react-router-dom"

export interface SelectProps {
	recipeList : SearchResult[];
}

export const SearchResultGrid:React.FC<SelectProps> = ({recipeList}) => {

    const navigate = useNavigate();
    function handleCardClick(recipe: SearchResult) {
        navigate(`/recipe/${recipe.id}`)
    }

    return (
        <>
            <Typography variant="h1" align="center" sx={{ mb: 1 }}>
            </Typography>
            <Grid container spacing={2} >
                {recipeList.map((recipe) => (
                    <Grid item xs={12} sm={6} md={4} key={recipe.id}>
                        <Card sx={{ maxWidth: 345, height: "100%", mt: 4 }} onClick={() => handleCardClick(recipe)}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="250"
                                    image={recipe.image}
                                    alt="Food"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h6" component="div">
                                        {recipe.title}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    )
};