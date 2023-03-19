import * as React from "react";
import { Tabs, Tab, Box } from "@mui/material";
import LoginTabPanel from "./login_tab_panel";
import LoginForm from "./login_form";
import RegisterForm from "./register_form";

const tabProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

interface LoginTabsProps {
  toggleDrawer: (open: boolean) => void;
}

const LoginTabs: React.FC<LoginTabsProps> = (props: LoginTabsProps) => {
  const { toggleDrawer } = props;
  const [value, setValue] = React.useState(0);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const switchTab = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={switchTab}
          aria-label="Sign in and sign up tabs"
        >
          <Tab label="Sign In" {...tabProps(0)} />
          <Tab label="Sign Up" {...tabProps(1)} />
        </Tabs>
      </Box>
      <LoginTabPanel value={value} index={0}>
        <LoginForm
          setIsLoggedIn={setIsLoggedIn}
          toggleDrawer={toggleDrawer}
          switchTab={switchTab}
        />
      </LoginTabPanel>
      <LoginTabPanel value={value} index={1}>
        <RegisterForm toggleDrawer={toggleDrawer} />
      </LoginTabPanel>
    </Box>
  );
};

export default LoginTabs;
