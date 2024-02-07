import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Container } from "@chakra-ui/react";

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <Container maxW="7xl" mb={16}>
        <Outlet />
      </Container>
    </>
  );
};

export default RootLayout;
