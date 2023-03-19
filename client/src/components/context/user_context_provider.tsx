import React, { ReactElement, useState } from "react";
import { emptyUser } from "../../helper/user_helper";
import { User } from "../../types/user_types";

interface UserProviderProps {
  children: ReactElement;
}

export const UserContext = React.createContext({} as User);
export const UpdateUserContext = React.createContext((user: User) => {});

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>(emptyUser);
  return (
    <UserContext.Provider value={currentUser}>
      <UpdateUserContext.Provider value={setCurrentUser}>
        {children}
      </UpdateUserContext.Provider>
    </UserContext.Provider>
  );
};

export default UserProvider;