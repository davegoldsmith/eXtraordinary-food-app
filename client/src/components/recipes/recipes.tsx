import { useState, useEffect } from 'react';
import { FormControl, InputLabel, createTheme, ThemeProvider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Drawer, Box, CssBaseline, Select, TextField, AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Checkbox, FormControlLabel, Grid, Card, CardActionArea, CardMedia, CardContent } from '@mui/material';
import { SearchResult, RecipeSearchResults, RecipeSearchParams } from '../../types/search_types';
import { useNavigate } from "react-router-dom"
import { SelectCuisine } from './select-cuisine';
import { SelectInput } from './select';

const BASE_URL = "http://localhost:3000/api/v1/search";


const Recipes: React.FC = () => {

    const [searchResult, setSearchResult] = useState<Array<SearchResult>>([]);
    const [sidePanelOpen, setSidePanelOpen] = useState(false);
    const [cuisine, setCuisine] = useState("All");
    const [diet, setDiet] = useState("All");
    const [intolerances, setIntolerances] = useState("None");
    const [vegetarianOnly, setVegetarianOnly] = useState(false);
    const [searchText, setSearchText] = useState("");

    const cuisineList: string[] = ['All', 'African', 'American', 'British', 'Cajun', 'Caribbean', 'Chinese',
        'Eastern European', 'European', 'French', 'German', 'Greek', 'Indian', 'Irish', 'Italian',
        'Japanese', 'Jewish', 'Korean', 'Latin American', 'Mediterranean', 'Mexican', 'Middle Eastern',
        'Nordic', 'Southern', 'Spanish', 'Thai', 'Vietnamese'];

    const intolerancesList: string[] = ['None','Dairy', 'Egg', 'Gluten', 'Grain', 'Peanut', 'Seafood', 'Sesame',
        'Shellfish', 'Soy', 'Sulfite', 'Tree Nut', 'Wheat'];

    function FilterPanel() {

        return (
            <>
                <Drawer anchor="right" open={sidePanelOpen} onClose={() => setSidePanelOpen(false)}>
                    <FormControl variant='outlined' size="small" style={{ width: '100%' }}>
                        <List sx={{ width: 250, mt: 2, mb: 2 }}>
                            <ListItem>
                                <ListItemText primary="Search Filters" />
                            </ListItem>
                            {/* <SelectCuisine cuisine={cuisine} onChange={(newValue) => setCuisine(newValue)} /> */}
                            <SelectInput
                                id='cuisine'
                                name='cuisine'
                                value={cuisine}
                                label='Cuisine'
                                onChangeHandler={(newValue) => setCuisine(newValue)}
                                options={cuisineList}
                            />
                            <SelectInput
                                id='intolerances'
                                name='intolerances'
                                value={intolerances}
                                label='Intolerances'
                                onChangeHandler={(newValue) => setDiet(newValue)}
                                options={intolerancesList}
                            />
                            {/* <SearchText searchText={searchText} onChange={(newValue) => setSearchText(newValue)} /> */}

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
                    </FormControl>
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
        if (cuisine !== "All") searchParams.set('cuisine', cuisine);
        //   if (params.excludeCuisine !== undefined) searchParams.set('excludeCuisine', params.excludeCuisine);
        //   if (params.diet !== undefined) searchParams.set('diet', params.diet);
        //   if (params.intolerances !== undefined) searchParams.set('intolerances', params.intolerances);
        //   if (params.includeIngredients !== undefined) searchParams.set('includeIngredients', params.includeIngredients);
        //   if (params.excludeIngredients !== undefined) searchParams.set('excludeIngredients', params.excludeIngredients);
        //   if (params.type !== undefined) searchParams.set('type', params.type);
        if (searchText !== "") searchParams.set('titleMatch', searchText);
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
        console.log(" fetch recipe")
    }, [sidePanelOpen]);

    const handleCuisineChange = (event) => {
        setCuisine(event.target.value);
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
