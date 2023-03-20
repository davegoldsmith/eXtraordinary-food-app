import * as React from "react";
import Router from "./components/router/router";
import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import UserProvider from "./components/context/user_context_provider";
import { createTheme, GlobalStyles, ThemeProvider, useMediaQuery } from "@mui/material";
import { teal } from "@mui/material/colors";
import red from "@mui/material/colors/red";
import { body1, header5, header6 } from "./styles/styles";

function App() {

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
          primary: teal,
          secondary: red,
        },
        
      }),

    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles styles={{ h5: header5, h6: header6, body1: body1 }} />
      <UserProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
