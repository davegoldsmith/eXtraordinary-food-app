import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import {
  UpdateUserContext,
  UserContext,
} from "../context/user_context_provider";
import { useContext } from "react";
import { User } from "../../types/user_types";
import LoginDrawer from "../login/login_drawer";
import { emptyUser, getUserInitials } from "../../helper/user_helper";
import { deepOrange } from '@mui/material/colors';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';

const pages = ["Home", "Recipe Search", "Meal Planner"];
const userLoggedInSettings = ["Sign Out", "Show User Preferences"];
const userLoggedOutSettings = ["Sign In"];

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [isOpen, setIsOpen] = React.useState(false);
  const [userSettings, setUserSettings] = React.useState(Array<string>);

  const user = useContext(UserContext) as User;
  const updateUser = useContext(UpdateUserContext);
  console.dir(user);

  const navigate = useNavigate();
  let settings = userLoggedOutSettings;
  if (user.email.length > 0) {
    settings = userLoggedInSettings;
  }
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (page: string) => {
    if (page === "Home") {
      navigate("/");
    } else {
      navigate(`/${page}`);
      setAnchorElNav(null);
    }
  };

  const handleCloseUserMenu = (setting: string) => {
    if (setting === "Sign In") {
      setIsOpen(true);
    } else if (setting === "Sign Out") {
      updateUser(emptyUser);
    }
    setAnchorElUser(null);
  };

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          <Box
            component="img"
            sx={{
              height: 64,
              width: 64,
              display: { xs: "none", md: "flex" },
              mr: 1,
            }}
            alt="Logo"
            src="logo.png"
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 4,
              ml: 4,
              display: { xs: "none", md: "flex" },
              fontFamily: "Roboto",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "#ff5454",
              textDecoration: "none",
            }}
          >
            Cook up a Storm!
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  onClick={() => {
                    handleCloseNavMenu(page);
                  }}
                >
                  <Typography fontFamily="Roboto" textAlign="center">
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
          <Box
            component="img"
            sx={{
              height: 40,
              width: 40,
              display: { xs: "flex", md: "none" },
              mr: 1,
            }}
            alt="Logo"
            src="logo.png"
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "Roboto",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "#ff5454",
              textDecoration: "none",
              textTransform: "capitalize",
            }}
          >
            Cook up a Storm!
          </Typography>
          <Box
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, ml: 10 }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => {
                  handleCloseNavMenu(page);
                }}
                sx={{
                  my: 2,
                  mr: 5,
                  color: "white",
                  display: "block",
                  fontWeight: 600,
                  letterSpacing: ".1rem",
                  fontFamily: "Roboto",
                  textTransform: "capitalize",
                  fontSize: "1.5rem",
                }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar sx={{ bgcolor: deepOrange[500] }}>
                {getUserInitials(user).length > 0 ? getUserInitials(user) : <LoginRoundedIcon/>}
              </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => handleCloseUserMenu(setting)}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
            <LoginDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
