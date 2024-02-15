import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Stack,
  useColorMode,
  Center,
  Container,
  HStack,
} from "@chakra-ui/react";
import { BsMoon, BsSun } from "react-icons/bs";
import { Link as RouterLink } from "react-router-dom";
import CookieService from "../services/CookieService";
import { onOpenCartDrawerAction } from "../app/features/globalSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectCart } from "../app/features/cartSlice";
import profileDefault from "../assets/profileDefault.jpg";

interface Props {
  children: React.ReactNode;
  fontWeight?: string;
  fontSize?: string;
}

const NavLink = ({ children, fontWeight, fontSize }: Props) => (
  <Link
    as={RouterLink}
    to={children?.toString().toLowerCase()}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      color: "#7d3ff7",
    }}
    fontWeight={fontWeight || "500"}
    fontSize={fontSize || "sm"}
  >
    {children}
  </Link>
);

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const jwt = CookieService.get("jwt");
  const logout = () => {
    CookieService.remove("jwt");
    CookieService.remove("username");
    CookieService.remove("isAdmin");
    window.location.reload();
  };
  const username = CookieService.get("username");
  const isAdmin = CookieService.get("isAdmin");
  const dispatch = useDispatch();
  const onOpen = () => dispatch(onOpenCartDrawerAction());
  const { cartProducts } = useSelector(selectCart);

  return (
    <>
      <Box
        borderBottom={
          colorMode === "light" ? "1px solid #ddd" : "1px solid #2d3748"
        }
        px={{ base: "0", md: "4" }}
        mb={16}
      >
        <Container maxW="7xl">
          <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
            <HStack spacing={4} alignItems={"center"}>
              <NavLink fontWeight={"500"} fontSize={"sm"}>
                Home
              </NavLink>
              <HStack as={"nav"} spacing={4}>
                {isAdmin ? <NavLink>Dashboard</NavLink> : ""}
              </HStack>
            </HStack>

            <Flex alignItems={"center"}>
              <Stack direction={"row"} spacing={3}>
                <Button onClick={toggleColorMode}>
                  {colorMode === "light" ? <BsMoon /> : <BsSun />}
                </Button>
                <Button onClick={onOpen}>Cart ({cartProducts.length})</Button>
                {jwt ? (
                  <Menu>
                    <MenuButton
                      as={Button}
                      rounded={"full"}
                      variant={"link"}
                      cursor={"pointer"}
                      minW={0}
                    >
                      <Avatar size={"sm"} src={profileDefault} />
                    </MenuButton>
                    <MenuList
                      alignItems={"center"}
                      pb={0}
                      pos="relative"
                      zIndex="999"
                    >
                      <Center>
                        <Avatar size={"xl"} src={profileDefault} />
                      </Center>
                      <Center>
                        <p>{username}</p>
                      </Center>
                      <MenuDivider />
                      <MenuItem py={3} onClick={logout}>
                        Logout
                      </MenuItem>
                    </MenuList>
                  </Menu>
                ) : (
                  <HStack as={"nav"} spacing={4}>
                    <HStack display={{ base: "none", md: "flex" }}>
                      <NavLink>Register</NavLink>
                    </HStack>
                    <NavLink>Login</NavLink>
                  </HStack>
                )}
              </Stack>
            </Flex>
          </Flex>
        </Container>
      </Box>
    </>
  );
}
