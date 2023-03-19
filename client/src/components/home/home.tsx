import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Home: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom sx={{color: "lightblue"}}>
        Welcome to Cook up a Storm website
      </Typography>
      <Typography variant="body1" component="h2" gutterBottom>
        {
          "Plan your meals, browse recipes or add your own. Then go and Cook up a Storm!"
        }
      </Typography>
    </Box>
  );
};

export default Home;
