import * as React from "react";
import { Avatar, Button, TextField, Box, Typography, Container } from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import Copyright from "./login_copyright";
import { FormEvent, useContext, useState } from "react";
import { SignUpChangeHandler, SignUpData, User } from "../../types/user_types";
import { FormError } from "../../types/error_types";
import { validateNewUser } from "../../validation/validate_user";
import { createUser } from "../../api/create_user";

const defaultSignUpData: SignUpData = {
  email: "",
  password: "",
  repeatPassword: "",
  firstName: "",
  lastName: "",
};

interface RegisterFormProps {
  toggleDrawer: (open: boolean) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ toggleDrawer }) => {
  const [signUpData, setSignUpData] = useState<SignUpData>(defaultSignUpData);
  const onChangeHandler: SignUpChangeHandler = <TKey extends keyof SignUpData>(
    value: SignUpData[TKey],
    name: TKey
  ) => {
    const newData = { ...signUpData };
    newData[name] = value;
    setSignUpData(newData);
  };
  const [errorMessages, setErrorMessages] = useState<Array<FormError>>([]);
  const errorMessage = (inputId: string) =>
    errorMessages.find((message) => message.inputName === inputId);
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formErrors = validateNewUser(signUpData);
    setErrorMessages(formErrors);

    if (formErrors.length === 0) {
      try {
        const newUser = {
          email: signUpData.email,
          password: signUpData.password,
          first_name: signUpData.firstName,
          last_name: signUpData.lastName,
        } as User;
        const createdOk = await createUser(newUser);
        if (createdOk) {
          toggleDrawer(false);
        }
      } catch (e) {
        setErrorMessages([
          { inputName: "email", message: "🚫Invalid Credentials" },
        ]);
      }
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
          <EditRoundedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
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
            onChange={(e) => onChangeHandler(e.currentTarget.value, "email")}
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
            autoComplete="new-password"
            onChange={(e) => onChangeHandler(e.currentTarget.value, "password")}
            error={errorMessage("password") !== undefined}
            helperText={errorMessage("password")?.message}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="repeat-password"
            label="Retype Password"
            type="password"
            id="repeat-password"
            autoComplete="new-password"
            onChange={(e) =>
              onChangeHandler(e.currentTarget.value, "repeatPassword")
            }
            error={errorMessage("repeat-password") !== undefined}
            helperText={errorMessage("repeat-password")?.message}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="first-name"
            label="First Name"
            name="text"
            autoComplete="first-name"
            onChange={(e) =>
              onChangeHandler(e.currentTarget.value, "firstName")
            }
            error={errorMessage("first-name") !== undefined}
            helperText={errorMessage("first-name")?.message}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="last-name"
            label="Last Name"
            name="text"
            autoComplete="name"
            onChange={(e) => onChangeHandler(e.currentTarget.value, "lastName")}
            error={errorMessage("last-name") !== undefined}
            helperText={errorMessage("last-name")?.message}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} gutterTop />
    </Container>
  );
};

export default RegisterForm;
