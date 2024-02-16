import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Container } from "@chakra-ui/react";
import CartDrawer from "../components/CartDrawer";

const RootLayout = () => {
  return (
    <>
      <CartDrawer />
      <Navbar />
      <Container maxW="7xl" px="5" mb={16}>
        <Outlet />
      </Container>
    </>
  );
};

export default RootLayout;
