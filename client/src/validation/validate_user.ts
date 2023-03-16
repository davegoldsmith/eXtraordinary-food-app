import { FormError } from "../types/error_types";

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