import { Box, Typography, Container } from "@mui/material";
import Copyright from "../login/login_copyright";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[900],
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="body1"></Typography>
        <Copyright />
      </Container>
    </Box>
  );
};

export default Footer;
