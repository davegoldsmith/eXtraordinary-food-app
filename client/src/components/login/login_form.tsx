import { FormEvent, useContext, useState } from "react";
import { getUser } from "../../api/get_user";
import { validateLoginCredentials } from "../../validation/validate_user";
import { FormError } from "../../types/error_types";
import { User } from "../../types/user_types";
import { UpdateUserContext } from "../context/user_context_provider";
// import LoginInput from "./login_input";
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Copyright from "./login_copyright";

interface loginProps {
  setIsLoggedIn: (loggedIn: boolean) => void;
}

const LoginForm: React.FC<loginProps> = ({ setIsLoggedIn }) => {
  const [errorMessages, setErrorMessages] = useState<Array<FormError>>([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setUser = useContext(UpdateUserContext);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formErrors = validateLoginCredentials(email, password);
    setErrorMessages(formErrors);
      
    if (formErrors.length === 0) {
      try {     
        const user: User | undefined = await getUser(email, password);
        if (user) {
          setUser(user);
          setIsLoggedIn(true);
        }           
      } catch (e) {
        setErrorMessages([{ inputName: "email", message : "🚫Invalid Credentials"}]);
        setIsLoggedIn(true);
      }
    } else {
      setIsLoggedIn(true);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
    <CssBaseline />
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          // autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link href="#" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
    <Copyright sx={{ mt: 8, mb: 4 }} />
  </Container>
    // <div className="login-form-container">
    //   <form className="login-form" onSubmit={handleSubmit}>
    //     <h3 className="header-title">Cooking Up a Storm!</h3>
    //     <LoginInput
    //       inputValue={email}
    //       setInputValue={setEmail}
    //       inputType="email"
    //       inputLabel="Email"
    //       id="email"
    //       className="input-container"
    //       errorMessages={errorMessages}
    //     />
    //     <LoginInput
    //       inputValue={password}
    //       setInputValue={setPassword}
    //       inputType="password"
    //       inputLabel="Password"
    //       id="password"
    //       className="input-container"
    //       errorMessages={errorMessages}
    //     />
    //     <div className="button-container">
    //       <input type="submit" />
    //     </div>
    //   </form>
    // </div>
  );
};

export default LoginForm;