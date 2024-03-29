import * as React from 'react';
import { Typography, Box } from '@mui/material';

interface LoginTabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const LoginTabPanel: React.FC<LoginTabPanelProps> = (props: LoginTabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </Box>
  );
}

export default LoginTabPanel;