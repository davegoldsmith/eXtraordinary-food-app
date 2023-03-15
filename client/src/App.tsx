import Router from "./components/router/router";
import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import UserProvider from "./components/context/user_context_provider";
import LoginForm from "./components/login/login_form";
import "./styles.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <UserProvider>
        {isLoggedIn === false ? (
          <LoginForm setIsLoggedIn={setIsLoggedIn} />
        ) : (
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        )}
    </UserProvider>
  );
}

export default App;
