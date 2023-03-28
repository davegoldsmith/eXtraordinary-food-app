import { UserPreference } from "../types/user_preferences";

export const getUserPreferences = async (setUserPreference: (userPrefs: Array<UserPreference>) => void, user_id: string) => {
  const urlQueryParams = new URLSearchParams({ user_id });
  const url = `http://localhost:3000/api/v1/userPrefs?${urlQueryParams}`;

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    });

    if (response.ok) {
      const json = (await response.json()) as UserPreference[];
      setUserPreference(json);
    } 
};