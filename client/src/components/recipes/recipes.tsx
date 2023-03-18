import { useState, useEffect } from 'react';
import { Select, TextField, AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Checkbox, FormControlLabel, Grid, Card, CardActionArea, CardMedia, CardContent } from '@mui/material';
import { SearchResult, RecipeSearchResults } from '../../types/search_types';


const Recipes: React.FC = () => {

    const [searchResult, setSearchResult] = useState<Array<SearchResult>>([]);


    // function Navbar() {
    //     const [anchorEl, setAnchorEl] = useState(null);
    //     const [showFilters, setShowFilters] = useState(false);

    //     const handleMenuClick = (event) => {
    //         setAnchorEl(event.currentTarget);
    //     };

    //     const handleMenuClose = () => {
    //         setAnchorEl(null);
    //     };

    //     const handleFilterToggle = () => {
    //         setShowFilters(!showFilters);
    //     };

    //     return (
    //         <AppBar position="static">
    //             <Toolbar>

    //                 <IconButton color="inherit" aria-label="filters" onClick={handleFilterToggle}>

    //                 </IconButton>

    //                     <div>
    //                         <FormControlLabel control={<Checkbox />} label="Prime" />
    //                         <FormControlLabel control={<Checkbox />} label="Sale" />
    //                     </div>

    //             </Toolbar>
    //         </AppBar>
    //     );
    // }

    function Navbar() {


        return (
            <Grid container direction="column">
                <Checkbox />
                <Select>
                    <MenuItem>Option 1</MenuItem>
                    <MenuItem>Option 2</MenuItem>
                    <MenuItem>Option 3</MenuItem>
                </Select>
                <TextField label="Text Input" />
            </Grid>
        );
    }


    function ProductGrid() {
        // const products = [
        //     { name: 'Product 1', image: 'https://source.unsplash.com/random/300x200' },
        //     { name: 'Product 2', image: 'https://source.unsplash.com/random/300x200' },
        //     { name: 'Product 3', image: 'https://source.unsplash.com/random/300x200' },
        //     { name: 'Product 4', image: 'https://source.unsplash.com/random/300x200' },
        //     { name: 'Product 5', image: 'https://source.unsplash.com/random/300x200' },
        //     { name: 'Product 6', image: 'https://source.unsplash.com/random/300x200' },
        // ];

        return (
            <Grid container spacing={2}>
                {searchResult.map((recipe) => (
                    <Grid item xs={12} sm={6} md={4} key={recipe.id}>
                        <Card>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={recipe.image}
                                    alt={"Food"}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {recipe.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Description of the product
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        );
    }

    useEffect(() => {

        const fetchRecipe = async () => {
            const response = await fetch(`http://localhost:3000/api/v1/search?`);
            const data = await response.json() as RecipeSearchResults;
            console.log("****** client serach result =>", data.results);
            setSearchResult(data.results);
            //setIsLoading(false);
        };

        fetchRecipe();
    }, []);


    return (
        <>
            <div>
                <Navbar />
                <ProductGrid />
            </div>
        </>);
};
export default Recipes;
