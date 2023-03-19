import { useContext } from "react";
import {
  UpdateUserContext,
  UserContext,
} from "../context/user_context_provider";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { User } from "../../types/user_types";

interface UserPreferenceProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const UserPreferences: React.FC<UserPreferenceProps> = (props: UserPreferenceProps) => {
  const user = useContext(UserContext) as User;
  const { children, value, index, ...other } = props;

  return (
    <div>

    </div>
  );
}

export default UserPreferences;