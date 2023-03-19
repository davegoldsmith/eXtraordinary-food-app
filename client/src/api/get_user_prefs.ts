import { UserPreference } from "../types/user_preferences";

export const getMisdemeanours = async (
  setUserPreference: (misdemeanours: Array<UserPreference>) => void
) => {
  const apiResponse = await fetch("");
  const json = (await apiResponse.json()) as { misdemeanours: UserPreference[] };

  setUserPreference(json.misdemeanours);
};


export const getUserPreferences = async (setUserPreference: (userPrefs: Array<UserPreference>) => void, user_id: string) => {
  const urlQueryParams = new URLSearchParams({ user_id });
  const url = `http://localhost:3000/api/v1/user?${urlQueryParams}`;

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    });
    console.dir(response);

    if (response.ok) {
      const json = (await response.json()) as {userPrefs: UserPreference[]};
      setUserPreference(json.userPrefs);
    } 
};