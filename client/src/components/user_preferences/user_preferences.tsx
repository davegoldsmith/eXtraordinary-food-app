import React, { useContext } from "react";
import {
  UpdateUserPreferencesContext,
  UserContext,
  UserPreferencesContext,
} from "../context/user_context_provider";
import { User } from "../../types/user_types";
import { UserPreference } from "../../types/user_preferences";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  TextField,
  Divider,
} from "@mui/material";
import BuildRoundedIcon from "@mui/icons-material/BuildRounded";
import MultipleSelectWithCheckboxes from "../general/multi_select_checks";
import {
  cuisineTypes,
  dietDefinitions,
  intolerencies,
} from "../../helper/user_prefs_helper";
import { getUserPreferences } from "../../api/get_user_prefs";
import { updateUserPreferences } from "../../api/update_user_prefs";

interface UserPreferenceProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const UserPreferences: React.FC<UserPreferenceProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const userPrefs = useContext(UserPreferencesContext) as UserPreference[];
  const updateUserPrefs = useContext(UpdateUserPreferencesContext);
  const user = useContext(UserContext) as User;

  const handleClose = (reset: boolean) => {
    const idString = `${user.user_id}`;
    if (reset === true) {
      getUserPreferences(updateUserPrefs, idString);
    } else {
      updateUserPreferences(userPrefs, idString);
    }
    setIsOpen(false);
  };

  const updateUserPrefFromArray = (
    pref_name: string,
    prefValues: Array<string>
  ) => {
    console.log(prefValues);
    const pref_value = prefValues.reduce(
      (prev, curr) => (prev ? (prev += "," + curr) : curr),
      ""
    );
    const userPref = { pref_name, pref_value, user_id: user.user_id };
    updateUserPreference(userPref);
  };

  const updateUserPrefString = (pref_name: string, pref_value: string) => {
    console.log(pref_value);
    const userPref = { pref_name, pref_value, user_id: user.user_id };
    updateUserPreference(userPref);
  };

  const updateUserPreference = (userPref: UserPreference) => {
    const otherUserPrefs = userPrefs.filter(
      (pref) => pref.pref_name !== userPref.pref_name
    );
    updateUserPrefs([...otherUserPrefs, userPref]);
  };

  const getUserPreferenceValue = (prefName: string): string => {
    if (userPrefs) {
      const userPref = userPrefs.find((pref) => pref.pref_name === prefName);
      if (userPref) {
        return userPref.pref_value;
      } else {
        return "";
      }
    } else {
      return "";
    }
  };

  return (
    <Dialog open={isOpen}>
      <DialogTitle>
        <Typography variant="h6">
          <BuildRoundedIcon /> User Preferences for : {user.first_name}{" "}
          {user.last_name}
        </Typography>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <TextField
          margin="normal"
          name="morning-meal"
          label="Morning Meal Descriptor"
          type="text"
          id="morning-meal"
          fullWidth
          sx={{ m: 1 }}
          defaultValue={getUserPreferenceValue("morning-meal")}
          onChange={(e) =>
            updateUserPrefString("morning-meal", e.currentTarget.value)
          }
        />
        <TextField
          margin="normal"
          name="midday-meal"
          label="Midday Meal Descriptor"
          type="text"
          id="midday-meal"
          fullWidth
          sx={{ m: 1 }}
          defaultValue={getUserPreferenceValue("midday-meal")}
          onChange={(e) =>
            updateUserPrefString("midday-meal", e.currentTarget.value)
          }
        />
        <TextField
          margin="normal"
          name="evening-meal"
          label="Evening Meal Descriptor"
          type="text"
          id="evening-meal"
          fullWidth
          sx={{ m: 1 }}
          defaultValue={getUserPreferenceValue("evening-meal")}
          onChange={(e) =>
            updateUserPrefString("evening-meal", e.currentTarget.value)
          }
        />
        <Divider sx={{ my: 1, mb: 1 }} />
        <MultipleSelectWithCheckboxes
          selectItems={cuisineTypes}
          selectedValues={getUserPreferenceValue("cuisines").split(",")}
          setSelectedValues={(selected) =>
            updateUserPrefFromArray("cuisines", selected)
          }
          inputLabel="Preferred Cuisines"
        />
        <MultipleSelectWithCheckboxes
          selectItems={cuisineTypes}
          selectedValues={getUserPreferenceValue("exclude-cuisines").split(",")}
          setSelectedValues={(selected) =>
            updateUserPrefFromArray("exclude-cuisines", selected)
          }
          inputLabel="Exclude Cuisines"
        />
        <MultipleSelectWithCheckboxes
          selectItems={intolerencies}
          selectedValues={getUserPreferenceValue("intolerences").split(",")}
          setSelectedValues={(selected) =>
            updateUserPrefFromArray("intolerences", selected)
          }
          inputLabel="Intolerances"
        />
        <MultipleSelectWithCheckboxes
          selectItems={dietDefinitions}
          selectedValues={getUserPreferenceValue("diet-types").split(",")}
          setSelectedValues={(selected) =>
            updateUserPrefFromArray("diet-types", selected)
          }
          inputLabel="Diet Types"
        />
        <Divider sx={{ my: 1, mb: 1 }} />
        <TextField
          margin="normal"
          name="daily-calories"
          label="Daily Calorie Limit"
          type="text"
          id="calories-limit"
          sx={{ m: 1 }}
          defaultValue={getUserPreferenceValue("calories-limit")}
          onChange={(e) =>
            updateUserPrefString("calories-limit", e.currentTarget.value)
          }
        />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={() => handleClose(true)}>
          Ignore Changes
        </Button>
        <Button variant="outlined" onClick={() => handleClose(false)}>
          Save Preferences
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserPreferences;
