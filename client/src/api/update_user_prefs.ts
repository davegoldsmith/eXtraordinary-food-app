import { UserPreference } from "../types/user_preferences";

export const updateUserPreferences = async (
  userPrefs: UserPreference[],
  user_id: string
) => {
  const urlQueryParams = new URLSearchParams({ user_id });
  const url = `http://localhost:3000/api/v1/userPrefs?${urlQueryParams}`;

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(userPrefs),
  });
  console.dir(response);

  if (response.ok) {
    return true;
  } else {
    return false;
  }
};
