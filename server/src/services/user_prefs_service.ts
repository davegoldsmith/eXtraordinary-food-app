import { UserPrefs } from "../models/user_prefs";

export const createUserPreference = async (userPref: UserPrefs) => {
  return UserPrefs.create<UserPrefs>(userPref);
};

export const getAllUserPreferences = async (user_id: string) => {
  return UserPrefs.findAll({
    where: {
      user_id
    },
  });  
};

export const getUserPreference = async (userPrefs: UserPrefs) => {
  console.dir(userPrefs);
  return UserPrefs.findOne({
    where: {
      user_id: userPrefs.user_id,
      pref_name: userPrefs.pref_name
    },
  });  
};

export const updateUserPreference = async (user_id: number, pref_name: string, userPref: UserPrefs) => {
	return UserPrefs.update(userPref, {
		where: {
			user_id,
      pref_name
		},
	});
};

export const deleteUserPreference = async (user_id: number, pref_name: string) => {
	return UserPrefs.destroy( {
		where: {
			user_id,
      pref_name
		},
	});
};
