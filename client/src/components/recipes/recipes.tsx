import { useState, useEffect } from 'react';
import { createTheme, ThemeProvider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Drawer, Box, CssBaseline, Select, TextField, AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Checkbox, FormControlLabel, Grid, Card, CardActionArea, CardMedia, CardContent } from '@mui/material';
import { SearchResult, RecipeSearchResults } from '../../types/search_types';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';



const Recipes: React.FC = () => {

    const theme = createTheme();


  const [searchResult, setSearchResult] = useState<Array<SearchResult>>([]);
  const [sidePanelOpen, setSidePanelOpen] = useState(false);
  const [cuisine, setCuisine] = useState("");
  const [vegetarianOnly, setVegetarianOnly] = useState(false);
  const [searchText, setSearchText] = useState("");

  const fetchRecipe = async () => {
    const response = await fetch(`http://localhost:3000/api/v1/search?`);
    const data = await response.json();
    console.log("****** client serach result =>", data.results);
    setSearchResult(data.results);
  };

  useEffect(() => {
    fetchRecipe();
  }, []);

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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <button onClick={() => setSidePanelOpen(true)}>Search Filter</button>
      {/* <Typography variant="h1" align="center" sx={{ mb: 5 }}>
        Recipe Search Results
      </Typography> */}
      <Grid container spacing={2} >
        {searchResult.map((recipe) => (
          <Grid item xs={12} sm={6} md={4} key={recipe.id}>
            <Card sx={{ maxWidth: 345, height: "100%", mt: 5  }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={recipe.image}
                  alt="Food"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {recipe.title}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Drawer anchor="right" open={sidePanelOpen} onClose={() => setSidePanelOpen(false)}>
        <List sx={{ width: 250 }}>
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
     
    </ThemeProvider>)
};
export default Recipes;
