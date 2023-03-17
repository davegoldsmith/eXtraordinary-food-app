import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LoginTabPanel from './login_tab_panel';
import LoginForm from './login_form';

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function LoginTabs() {
  const [value, setValue] = React.useState(0);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Login" {...a11yProps(0)} />
          <Tab label="Register" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <LoginTabPanel value={value} index={0}>
        <LoginForm setIsLoggedIn={setIsLoggedIn} />
      </LoginTabPanel>
      <LoginTabPanel value={value} index={1}>
        Item Two
      </LoginTabPanel>
    </Box>
  );
}