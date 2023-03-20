import { Request, Response } from "express";
import { userInfo } from "os";
import { UserPrefs } from "../models/user_prefs";
import * as userPrefsService from "../services/user_prefs_service";

export const createUserPreference = async (req: Request, res: Response) => {
  const userPrefToBeCreated = req.body;
  try {
    const userPref = await userPrefsService.createUserPreference(userPrefToBeCreated);
    res.status(201).json(userPref);
  } catch (error) {
    let message = (error as Error).message;
    res.status(400).json({ message });
  }
};

export const getAllUserPreferences = async (req: Request<object, object, object, {user_id:string|undefined}>, res: Response) => {
  const { user_id } = req.query;
  if (user_id) {
      const recipe = await userPrefsService.getAllUserPreferences(user_id);
      res.json(recipe).status(200);
  } else {
      res.status(400).json({message: "No userId provided"});
  }

}

export const getUserPreference = async (req: Request<{pref_name: string}, object, object, {user_id:number|undefined}>, res: Response) => {
  const pref_name = req.params.pref_name;
  const { user_id } = req.query;
  console.log("User Id = " + user_id);
  console.log("pref_name = " + pref_name);
  if (user_id) {
      const userPref = await userPrefsService.getUserPreference({user_id, pref_name} as UserPrefs);
      res.json(userPref).status(200);
  } else {
      res.status(400).json({message: "No user_id provided"});
  }

}

export const updateUserPreferences = async  (req: Request<object, object, object, {user_id:number|undefined}>, res: Response) => {
  console.log(req.body );
  const userPrefs = req.body as UserPrefs[];
  console.dir(userPrefs);
  const { user_id } = req.query;
  try {
    userPrefs.forEach(async (userPref: UserPrefs) => {
      if (userPref.pref_id) {
        let updatedUserPref = await userPrefsService.updateUserPreference(userPref);
      } else {
        let newUserPref = await userPrefsService.createUserPreference(userPref);
      }
    })
    
    res.status(204).json({ message: `User Preferences for user_id '${user_id}' not found` });
  } catch (error) {
    let message = (error as Error).message;
    res.status(400).json({ message });
  }
};

export const updateUserPreference = async (req: Request<{pref_name: string}, object, object, {user_id:number|undefined}>, res: Response) => {
  const pref_name = req.params.pref_name;
  const { user_id } = req.query;
	const prefUpdateData = req.body as UserPrefs;
  if (user_id ) {
    prefUpdateData.user_id = user_id;
  }
  prefUpdateData.pref_name = pref_name;
  
  if (user_id) {
    const updatedUserPref = await userPrefsService.updateUserPreference(prefUpdateData);
    console.dir(updatedUserPref);
    if (updatedUserPref[0] === 1) {
      res.status(204).json({message:`Preference '${pref_name}' for user_id '${user_id}' successfully updated`});
    } else {
      res.status(404).json({ message: `Preference with '${pref_name}' for user_id '${user_id}' not found` });
    }
  } else {
    res.status(400).json({message: "No user_id provided"});
  }
};


