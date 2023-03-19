import { FormError } from "../types/error_types";
import { SignUpData, User } from "../types/user_types";

export const validateLoginCredentials = (email: string | undefined, password: string | undefined) : Array<FormError> => {
  const formErrors: Array<FormError> = [];

  if (password === undefined || password.length === 0) {
    formErrors.push({ inputName: "password", message : "🚫Invalid password"});
  }
  if (email === undefined || email.length === 0) {
    formErrors.push({ inputName: "email", message : "🚫Invalid email"});
  }
  return formErrors;
}

export const validateNewUser = (signUpData: SignUpData) : Array<FormError> => {
  const {password, repeatPassword, firstName, lastName, email} = signUpData;
  const formErrors: Array<FormError> = [];
  if (!validateHasLength(password)) {
    formErrors.push({ inputName: "password", message : "🚫Password must be provided"});
  }
  if (!validateHasLength(repeatPassword)) {
    formErrors.push({ inputName: "repeat-password", message : "🚫Confirm password must be provided"});
  }
  if (repeatPassword !== password) {
    formErrors.push({ inputName: "password", message : "🚫Password and Confirm password do not match"});
    formErrors.push({ inputName: "repeat-password", message : "🚫Password and Confirm password do not match"});
  }
  if (!validateHasLength(email)) {
    formErrors.push({ inputName: "email", message : "🚫Email must be provided"});
  }
  if (!validateHasLength(firstName)) {
    formErrors.push({ inputName: "first-name", message : "🚫First Name must be provided"});
  }
  if (!validateHasLength(lastName)) {
    formErrors.push({ inputName: "last-name", message : "🚫Last Name must be provided"});
  }
  return formErrors;
}

const validateHasLength = (value: string) => {
  return (value !== undefined && value.length > 0);
}