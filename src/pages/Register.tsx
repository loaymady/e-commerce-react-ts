import { useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  InputRightElement,
  InputGroup,
  FormHelperText,
  useColorMode,
  Text,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { useAppDispatch } from "../app/store";
import { useSelector } from "react-redux";
import { selectRegister, userRegister } from "../app/features/registerSlice";

export default function RegisterPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { colorMode } = useColorMode();
  const { loading } = useSelector(selectRegister);

  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
    admin: false,
  });

  const [isEmail, setIsEmail] = useState(false);
  const [isUsername, setIsUsername] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const handleAdminChange = (value: string) => {
    setUser({ ...user, admin: value === "yes" });
  };

  const goBack = () => navigate(-1);

  const submitHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (!user.email && !user.password && !user.username) {
      setIsEmail(true);
      setIsUsername(true);
      setIsPassword(true);
      return;
    }
    if (!user.email) {
      setIsEmail(true);
      return;
    }
    if (!user.username) {
      setIsUsername(true);
      return;
    }
    if (!user.password) {
      setIsPassword(true);
      return;
    }

    setIsEmail(false);
    setIsPassword(false);
    setIsUsername(false);
    dispatch(userRegister(user));
  };

  return (
    <Flex>
      <Stack mx={"auto"} maxW={"lg"}>
        <Flex
          alignItems={"center"}
          maxW="sm"
          mr={"auto"}
          my={3}
          fontSize={"lg"}
          cursor={"pointer"}
          onClick={goBack}
        >
          <BsArrowLeft />
          <Text ml={2}>Back</Text>
        </Flex>

        <Stack align={"center"}>
          <Heading fontSize={"4xl"} mb={3}>
            Create An Account
          </Heading>
        </Stack>

        <Box
          as={"form"}
          rounded={"lg"}
          border={
            colorMode === "light" ? "1px solid #ddd" : "1px solid #2d3748"
          }
          boxShadow={"10px 10px 0px 0px rgba(245,245,245,1)"}
          minW={{ base: "90%", md: "lg" }}
          p={8}
          onSubmit={submitHandler}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                isInvalid={isEmail}
                errorBorderColor="crimson"
                name={"email"}
                value={user.email}
                onChange={onChangeHandler}
                autoComplete="email"
              />
              {isEmail ? (
                <FormHelperText color="red.500">
                  Email is required
                </FormHelperText>
              ) : null}
            </FormControl>

            <FormControl id="username">
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                isInvalid={isUsername}
                errorBorderColor="crimson"
                name={"username"}
                value={user.username}
                onChange={onChangeHandler}
                autoComplete="username"
              />
              {isUsername ? (
                <FormHelperText color="red.500">
                  Username is required
                </FormHelperText>
              ) : null}
            </FormControl>

            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  isInvalid={isPassword}
                  errorBorderColor="crimson"
                  name={"password"}
                  value={user.password}
                  onChange={onChangeHandler}
                />

                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                    p={0}
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible size={20} />
                    ) : (
                      <AiOutlineEye size={20} />
                    )}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {isPassword ? (
                <FormHelperText color="red.500">
                  Password is required
                </FormHelperText>
              ) : null}
            </FormControl>
            <FormControl as="fieldset" id="admin">
              <FormLabel as="legend">Are you an admin?</FormLabel>
              <RadioGroup
                defaultValue="no" // Set a default value based on your requirements
                name="admin"
                onChange={handleAdminChange}
              >
                <Stack direction="row">
                  <Radio value="yes">Yes</Radio>
                  <Radio value="no">No</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
            <Stack spacing={5} mt={2}>
              <Button
                color={"#e6f3fd"}
                bg={isEmail || isPassword ? "red.500" : "#6b28ef"}
                _hover={{
                  bg: "#570af2",
                  border: "transparent",
                }}
                type="submit"
                h={16}
                isLoading={loading}
              >
                Register
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
