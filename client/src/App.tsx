import * as React from "react";
import Router from "./components/router/router";
import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import UserProvider from "./components/context/user_context_provider";
import LoginForm from "./components/login/login_form";
import "./styles.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),

    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </UserProvider>
     </ThemeProvider>
  );
}

export default App;
