import { FormEvent, useContext, useState } from "react";
import { getUser } from "../../api/get_user";
import { validateLoginCredentials } from "../../validation/validate_user";
import { FormError } from "../../types/error_types";
import { User } from "../../types/user_types";
import { UpdateUserContext } from "../context/user_context_provider";
import * as React from "react";
import {
  Avatar, Button, TextField, FormControlLabel, Checkbox,
  Link, Grid, Box, Typography, Container
} from "@mui/material";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import Copyright from "./login_copyright";

interface loginProps {
  setIsLoggedIn: (loggedIn: boolean) => void;
  toggleDrawer: (open: boolean) => void;
  switchTab: (event: React.SyntheticEvent, tabIndex: number) => void;
}

const LoginForm: React.FC<loginProps> = (props: loginProps) => {
  const { setIsLoggedIn, toggleDrawer, switchTab } = props;
  const [errorMessages, setErrorMessages] = useState<Array<FormError>>([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setUser = useContext(UpdateUserContext);

  const errorMessage = (inputId: string) =>
    errorMessages.find((message) => message.inputName === inputId);

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
          toggleDrawer(false);
        }
      } catch (e) {
        setErrorMessages([
          { inputName: "email", message: "🚫Invalid Credentials" },
        ]);
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
  };

  return (
    <Container component="form" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "#ff5454" }}>
          <LoginRoundedIcon />
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
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            error={errorMessage("email") !== undefined}
            helperText={errorMessage("email")?.message}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            error={errorMessage("password") !== undefined}
            helperText={errorMessage("password")?.message}
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
              <Link href="#" variant="body2" onClick={(e) => switchTab(e, 1)}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
};

export default LoginForm;
