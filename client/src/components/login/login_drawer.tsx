import * as React from "react";
import { Box, Drawer } from "@mui/material";
import LoginTabs from "./login_register_tabs";

interface LoginDrawerProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const LoginDrawer: React.FC<LoginDrawerProps> = ({ isOpen, setIsOpen }) => {
  const anchor = "right";

  const toggleDrawer = (open: boolean) => {
    setIsOpen(open);
  };

  return (
      <React.Fragment>
        <Drawer
          anchor={anchor}
          open={isOpen}
          onClose={(e) => toggleDrawer(false)}
        >
          <Box sx={{ width: 375 }} role="presentation">
            <LoginTabs toggleDrawer={toggleDrawer} />
          </Box>
        </Drawer>
      </React.Fragment>
  );
};

export default LoginDrawer;
