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
  // useDisclosure,
  // useColorModeValue,
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
    window.location.reload();
  };
  const username = CookieService.get("user");
  const dispatch = useDispatch();
  const onOpen = () => dispatch(onOpenCartDrawerAction());
  const { cartProducts } = useSelector(selectCart);

  return (
    <>
      <Box
        borderBottom={
          colorMode === "light" ? "1px solid #ddd" : "1px solid #2d3748"
        }
        px={4}
        mb={16}
      >
        <Container maxW="7xl">
          <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
            <HStack spacing={8} alignItems={"center"}>
              <NavLink fontWeight={"500"} fontSize={"sm"}>
                Home
              </NavLink>
              <HStack
                as={"nav"}
                spacing={4}
                display={{ base: "none", md: "flex" }}
              >
                <NavLink>Dashboard</NavLink>
              </HStack>
            </HStack>

            <Flex alignItems={"center"}>
              <Stack direction={"row"} spacing={7}>
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
                      <Avatar
                        size={"sm"}
                        src={
                          "https://avatars.dicebear.com/api/male/username.svg"
                        }
                      />
                    </MenuButton>
                    <MenuList alignItems={"center"}>
                      <br />
                      <Center>
                        <Avatar
                          size={"2xl"}
                          src={
                            "https://avatars.dicebear.com/api/male/username.svg"
                          }
                        />
                      </Center>
                      <br />
                      <Center>
                        <p>{username}</p>
                      </Center>
                      <br />
                      <MenuDivider />
                      <MenuItem>Your Servers</MenuItem>
                      <MenuItem>Account Settings</MenuItem>
                      <MenuItem onClick={logout}>Logout</MenuItem>
                    </MenuList>
                  </Menu>
                ) : (
                  <HStack
                    as={"nav"}
                    spacing={4}
                    display={{ base: "none", md: "flex" }}
                  >
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
