import { User } from "../types/user_types";

export const createUser = async (user: User) => {
  const url = `http://localhost:3000/api/v1/user`;

  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(user),
    });

    if (response.ok && response.status === 201) {
      return true;
    } else {
      throw Error;
    }
  } catch (e) {
    throw new Error("Failed to create user");
  }
};