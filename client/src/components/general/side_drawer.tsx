import * as React from "react";
import { Box, Drawer } from "@mui/material";

interface SideDrawerProps {
  toggleDrawer: (isOpen: boolean) => void;
  isOpen: boolean;
  children?: React.ReactNode;
}

const SideDrawer: React.FC<SideDrawerProps> = ({ isOpen, toggleDrawer, children }) => {
  const anchor = "right";

  return (
      <React.Fragment>
        <Drawer
          anchor={anchor}
          open={isOpen}
          onClose={(e) => toggleDrawer(false)}
        >
          <Box sx={{ width: 375 }} role="presentation">
            {children}
          </Box>
        </Drawer>
      </React.Fragment>
  );
};

export default SideDrawer;