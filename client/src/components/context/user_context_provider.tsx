import React, { ReactElement, useState, useEffect } from "react";
import { getUserPreferences } from "../../api/get_user_prefs";
import { emptyUser } from "../../helper/user_helper";
import { UserPreference } from "../../types/user_preferences";
import { User } from "../../types/user_types";

interface UserProviderProps {
  children: ReactElement;
}

export const UserContext = React.createContext({} as User);
export const UpdateUserContext = React.createContext((user: User) => {});
export const UserPreferencesContext = React.createContext<UserPreference[]>([]);
export const UpdateUserPreferencesContext = React.createContext(
  (userPrefs: Array<UserPreference>) => {}
);

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>(emptyUser);
  const [userPrefs, setUserPrefs] = useState<Array<UserPreference>>([]);
  useEffect(() => {
    console.log("fired useEffect");
    console.log("user_id = " + currentUser.user_id);
    if (currentUser.user_id != -1) {
      getUserPreferences(setUserPrefs, `${currentUser.user_id}`);
    }
  }, [currentUser]);
  return (
    <UserContext.Provider value={currentUser}>
      <UpdateUserContext.Provider value={setCurrentUser}>
        <UserPreferencesContext.Provider value={userPrefs}>
          <UpdateUserPreferencesContext.Provider value={setUserPrefs}>
            {children}
          </UpdateUserPreferencesContext.Provider>
        </UserPreferencesContext.Provider>
      </UpdateUserContext.Provider>
    </UserContext.Provider>
  );
};

export default UserProvider;
