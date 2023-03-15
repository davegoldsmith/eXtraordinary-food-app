import React, { ReactElement, useState } from "react";
import { User } from "../../types/user_types";

interface UserProviderProps {
  children: ReactElement;
}

export const UserContext = React.createContext({} as User);
export const UpdateUserContext = React.createContext((user: User) => {});

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>({
    user_id: -1,
    first_name: "",
    last_name: "",
    user_name: "",
    email: "",
    password: "",
    api_hash: "",
  });
  return (
    <UserContext.Provider value={currentUser}>
      <UpdateUserContext.Provider value={setCurrentUser}>
        {children}
      </UpdateUserContext.Provider>
    </UserContext.Provider>
  );
};

export default UserProvider;