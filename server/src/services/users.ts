import { User } from "../models/user";


export const createUser = async (user: User) => {
  return User.create<User>(user);
};

export const getUser = async (email: string) => {
  console.log("user.email = " + email);
  return User.findOne({
    where: {
      email
    },
  });  
};
