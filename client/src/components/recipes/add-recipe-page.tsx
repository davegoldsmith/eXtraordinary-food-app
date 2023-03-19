import React from "react";
import { Typography, TextField, Button } from "@mui/material";


const AddRecipePage: React.FC = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Add logic to save recipe URL
  };

  return (
    <div>
      <Typography variant="h3">Add a recipe</Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin cursus
        tellus sit amet ipsum malesuada, in fringilla risus feugiat. Aliquam
        erat volutpat. Sed quis mollis magna. Nullam et ex quis augue
        condimentum ultricies. Integer varius dignissim massa, eget elementum
        lorem sagittis id. Ut maximus, mauris sit amet lacinia hendrerit, odio
        enim blandit risus, vel laoreet risus nunc vel mi.
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          id="recipe-url-input"
          label="Recipe URL"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" type="submit">
          Save
        </Button>
      </form>
    </div> 
  );
};

export default AddRecipePage;
