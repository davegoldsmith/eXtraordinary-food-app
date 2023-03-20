import { useState, useEffect } from 'react';
import { FormControl, List, ListItem, ListItemText } from '@mui/material';
import { SearchResult } from '../../types/search_types';
import { SelectInput } from './select';
import { SearchResultGrid } from './search-result-grid';
import SideDrawer from '../general/side_drawer';
//import MultipleSelectWithCheckboxes from '../general/multi_select_checks'

const BASE_URL = "http://localhost:3000/api/v1/search";


const Recipes: React.FC = () => {

    const [searchResult, setSearchResult] = useState<Array<SearchResult>>([]);
    const [sidePanelOpen, setSidePanelOpen] = useState(false);
    const [cuisine, setCuisine] = useState("All");
    const [diet, setDiet] = useState("All");
    const [mealType, setMealType] = useState("All");
    const [intolerances, setIntolerances] = useState("None");
    const [vegetarianOnly, setVegetarianOnly] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [searchCriteria, setSearchCriteria] = useState("");

    const toggleSidePanelDrawer = (open: boolean) => {
        setSidePanelOpen(open);
    };

    const cuisineList: string[] = ['All', 'African', 'American', 'British', 'Cajun', 'Caribbean', 'Chinese',
        'Eastern European', 'European', 'French', 'German', 'Greek', 'Indian', 'Irish', 'Italian',
        'Japanese', 'Jewish', 'Korean', 'Latin American', 'Mediterranean', 'Mexican', 'Middle Eastern',
        'Nordic', 'Southern', 'Spanish', 'Thai', 'Vietnamese'];

    const intolerancesList: string[] = ['None', 'Dairy', 'Egg', 'Gluten', 'Grain', 'Peanut', 'Seafood', 'Sesame',
        'Shellfish', 'Soy', 'Sulfite', 'Tree Nut', 'Wheat'];

    const mealTypeList: string[] = ['All', 'Main course', 'Side dish', 'Dessert', 'Appetizer', 'Salad', 'Bread',
        'Breakfast', 'Soup', 'Beverage', 'Sauce', 'Marinade', 'Fingerfood', 'Snack', 'Drink']

    function FilterPanel() {

        return (
            <>
                <FormControl variant='outlined' size="small" style={{ width: '100%' }}>
                    <List sx={{ width: 250, mt: 2, mb: 2 }}>
                        <ListItem>
                            <ListItemText primary="Search Filters" />
                        </ListItem>
                        <SelectInput
                            id='cuisine'
                            name='cuisine'
                            value={cuisine}
                            label='Cuisine'
                            onChangeHandler={(newValue) => setCuisine(newValue)}
                            options={cuisineList}
                        />

                        <SelectInput
                            id='mealtype'
                            name='mealtype'
                            value={mealType}
                            label='Type'
                            onChangeHandler={(newValue) => setMealType(newValue)}
                            options={mealTypeList}
                        />
                        <SelectInput
                            id='intolerances'
                            name='intolerances'
                            value={intolerances}
                            label='Intolerances'
                            onChangeHandler={(newValue) => setIntolerances(newValue)}
                            options={intolerancesList}
                        />
                        <ListItem>
                            <button onClick={() => setSidePanelOpen(false)}>Search</button>
                        </ListItem>
                    </List>
                </FormControl>
            </>
        )
    };



    const searchParameters = (): string => {
        const searchParams = new URLSearchParams();

        if (cuisine !== "All") searchParams.set('cuisine', cuisine);
        if (intolerances !== "None") searchParams.set('intolerances', intolerances);
        if (mealType !== "All") searchParams.set('type', mealType);
        if (searchText !== "") searchParams.set('titleMatch', searchText);
        return searchParams.toString();
    }

    const fetchRecipe = async () => {

        const response = await fetch(`${BASE_URL}?${searchParameters()}`);
        const data = await response.json();
        setSearchResult(data.results);
    };

    useEffect(() => {
        fetchRecipe();
        console.log(" fetch recipe")
    }, [sidePanelOpen]);

    return (
        <>
            <button onClick={() => setSidePanelOpen(true)}>Search Filter</button>
            <SideDrawer isOpen={sidePanelOpen} toggleDrawer={toggleSidePanelDrawer}>
                <FilterPanel />
            </SideDrawer>
            <SearchResultGrid recipeList={searchResult} />
        </>
    )
};
export default Recipes;
