import Header from "../header/header";
import { Outlet } from "react-router-dom";
import Footer from "../footer/footer";
import Container from '@mui/material/Container';
import CssBaseline from "@mui/material/CssBaseline";

const MainLayout: React.FC = () => (
  <>
    <CssBaseline/>
    <Header />

    <Container component="main" sx={{ mt: 2, mb: 2 }} maxWidth="xl">
      <Outlet />
    </Container>
    <Footer />
  </>
);

export default MainLayout;