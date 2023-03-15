import { User } from "../types/user_types";

export const getUser = async (email: string, password: string) => {
  const urlQueryParams = new URLSearchParams({ email, password });
  const url = `http://localhost:3000/api/v1/user?${urlQueryParams}`;

  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    });
    console.dir(response);

    if (response.ok) {
      return (await response.json()) as User;
    } else {
      throw Error("blah");
    }
  } catch (e) {
    throw new Error("Failed to authenticate user");
  }
};
