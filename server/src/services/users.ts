import { User } from "../models/user";


export const createUser = async (user: User) => {
  return User.create<User>(user);
};

export const getUser = async (user: User) => {
  console.log("user.email = " + user.email);
  return User.findOne({
    where: {
      email: user.email
    },
  });  
};
