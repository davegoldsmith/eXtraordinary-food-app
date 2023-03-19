import { useState, useEffect } from 'react';
import { createTheme, ThemeProvider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Drawer, Box, CssBaseline, Select, TextField, AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Checkbox, FormControlLabel, Grid, Card, CardActionArea, CardMedia, CardContent } from '@mui/material';
import { SearchResult, RecipeSearchResults, RecipeSearchParams } from '../../types/search_types';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useNavigate } from "react-router-dom"

const BASE_URL = "http://localhost:3000/api/v1/search";


const Recipes: React.FC = () => {

    const [searchResult, setSearchResult] = useState<Array<SearchResult>>([]);
    const [sidePanelOpen, setSidePanelOpen] = useState(false);
    const [cuisine, setCuisine] = useState("");
    const [vegetarianOnly, setVegetarianOnly] = useState(false);
    const [searchText, setSearchText] = useState("");

    function FilterPanel() {

        return (
            <>
                <Drawer anchor="right" open={sidePanelOpen} onClose={() => setSidePanelOpen(false)}>
                    <List sx={{ width: 200, mt: 2, mb: 2 }}>
                        <ListItem>
                            <ListItemText primary="Search Filters" />
                        </ListItem>
                        <ListItem>
                            <Select
                                label="Cuisine"
                                value={cuisine}
                                onChange={handleCuisineChange}
                                fullWidth
                            >
                                <MenuItem value="">Any Cuisine</MenuItem>
                                <MenuItem value="italian">Italian</MenuItem>
                                <MenuItem value="mexican">Mexican</MenuItem>
                                <MenuItem value="chinese">Chinese</MenuItem>
                            </Select>
                        </ListItem>
                        <ListItem>
                            <TextField
                                label="Search Text"
                                value={searchText}
                                onChange={handleSearchTextChange}
                                fullWidth
                            />
                        </ListItem>
                        <ListItem>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={vegetarianOnly}
                                        onChange={handleVegetarianOnlyChange}
                                        color="primary"
                                    />
                                }
                                label="Vegetarian Only"
                            />
                        </ListItem>
                    </List>
                </Drawer>
            </>
        )
    };

    function SearchResultGrid() {

        const navigate = useNavigate();
        function handleCardClick(recipe: SearchResult) {

            console.log("******* click =>", recipe.id);
            navigate(`/recipe/${recipe.id}`)

        }

        return (
            <>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <button onClick={() => setSidePanelOpen(true)}>Search Filter</button>
                    <Typography variant="h1" align="center" sx={{ mb: 1 }}>
                    </Typography>
                    <Grid container spacing={2} >
                        {searchResult.map((recipe) => (
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

                </ThemeProvider>
            </>
        )
    };

    const theme = createTheme();

    const searchParameters = (): string => {
        const searchParams = new URLSearchParams();
        //console.log("******* params", params)

        console.log("**8cuisine**", cuisine)
        if (cuisine !== "") searchParams.set('cuisine', cuisine);
        //   if (params.excludeCuisine !== undefined) searchParams.set('excludeCuisine', params.excludeCuisine);
        //   if (params.diet !== undefined) searchParams.set('diet', params.diet);
        //   if (params.intolerances !== undefined) searchParams.set('intolerances', params.intolerances);
        //   if (params.includeIngredients !== undefined) searchParams.set('includeIngredients', params.includeIngredients);
        //   if (params.excludeIngredients !== undefined) searchParams.set('excludeIngredients', params.excludeIngredients);
        //   if (params.type !== undefined) searchParams.set('type', params.type);
        //   if (params.titleMatch !== undefined) searchParams.set('titleMatch', params.titleMatch);
        //   if (params.maxReadyTime !== undefined) searchParams.set('maxReadyTime', params.maxReadyTime.toString());
        //   if (params.sort !== undefined) searchParams.set('sort', params.sort);
        //   if (params.sortDirection !== undefined) searchParams.set('sortDirection', params.sortDirection);
        //   if (params.minCarbs !== undefined) searchParams.set('minCarbs', params.minCarbs.toString());
        //   if (params.maxCarbs !== undefined) searchParams.set('maxCarbs', params.maxCarbs.toString());
        //   if (params.minProtein !== undefined) searchParams.set('minProtein', params.minProtein.toString());
        //   if (params.maxProtein !== undefined) searchParams.set('maxProtein', params.maxProtein.toString());
        //   if (params.minCalories !== undefined) searchParams.set('minCalories', params.minCalories.toString());
        //   if (params.maxCalories !== undefined) searchParams.set('maxCalories', params.maxCalories.toString());
        //   if (params.minFat !== undefined) searchParams.set('minFat', params.minFat.toString());
        //   if (params.maxFat !== undefined) searchParams.set('maxFat', params.maxFat.toString());

        console.log("**searchParams1111**", searchParams.toString())
        return searchParams.toString();
    }




    const fetchRecipe = async () => {


        //const response = await fetch(`http://localhost:3000/api/v1/search?`);

        const response = await fetch(`${BASE_URL}?${searchParameters()}`);
        const data = await response.json();
        console.log("****** client serach result =>", data.results);
        setSearchResult(data.results);
    };

    useEffect(() => {
        fetchRecipe();
    }, [cuisine]);

    const handleCuisineChange = (event) => {
        setCuisine(event.target.value);
        console.log("**** value =>", event.target.value)
    };

    const handleVegetarianOnlyChange = (event) => {
        setVegetarianOnly(event.target.checked);
    };

    const handleSearchTextChange = (event) => {
        setSearchText(event.target.value);
    };

    return (
        <>
            <FilterPanel />
            <SearchResultGrid />
        </>
    )
};
export default Recipes;
