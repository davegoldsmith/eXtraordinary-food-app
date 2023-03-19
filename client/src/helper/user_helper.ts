import { User } from "../types/user_types";

export const emptyUser = {
  user_id: -1,
  first_name: "",
  last_name: "",
  user_name: "",
  email: "",
  password: "",
  api_hash: "",
};

export const getUserInitials = (user: User) => {
  return (user.first_name.charAt(0) + user.last_name.charAt(0));
}
