import { useState } from "react";
import { supabase } from "../server/supabaseClient";
import {
  Input,
  InputGroup,
  Button,
  ButtonGroup,
  FormControl,
  Flex,
  VStack,
  HStack,
  Heading,
  InputRightElement,
  useToast,
  Box,
} from "@chakra-ui/react";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const toast = useToast();

  // toast alerts for login & signup
  const ivalidLoginCredentials = () => {
    toast({
      title: "invalid credentials",
      description: "please check your email and password and try again",
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  };

  const loginSuccess = () => {
    toast({
      title: "logged in",
      description: "enjoy the moment",
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top",
    });
  };

  const userExists = () => {
    toast({
      title: "account already exists",
      description:
        "an account for this email address already exists. please log in to that account or request a password reset.",
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  };

  const verifyEmailSent = () => {
    toast({
      title: "email sent",
      description: "a verification email has been sent to the address provided",
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top",
    });
  };

  const invalidEmailSignup = () => {
    toast({
      title: "invalid email",
      description: "please enter a valid email and try again.",
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  };

  const invalidPasswordSignup = (error) => {
    toast({
      title: "invalid password",
      description: `${error.message.toLowerCase()}`,
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  };

  const invalidCredentialsSignup = () => {
    toast({
      title: "invalid credentials",
      description:
        "please use a valid email and password with at least 6 characters",
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  };

  // click handlers for login & signup
  const handleLogin = async (email, password) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn({ email, password });
      console.log("error", error);
      if (error) throw error;
      loginSuccess();
    } catch (error) {
      console.error(error.error_description || error.message);
      ivalidLoginCredentials();
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (email, password) => {
    try {
      setLoading(true);
      let lowercaseEmail = email.toLowerCase();

      const dbCheck = await supabase
        .from("profiles")
        .select()
        .eq("email", lowercaseEmail);

      if (dbCheck.data.length !== 0) {
        userExists();
      } else {
        const { error } = await supabase.auth.signUp(
          {
            email,
            password,
          },
          { redirectTo: "http://localhost:3000/welcome" }
        );

        if (error) throw error;

        verifyEmailSent();
      }
    } catch (error) {
      console.error(error.error_description || error.message);
      const commonMsgs = [
        "Unable to validate email address: invalid format",
        "Password should be at least 6 characters",
      ];
      if (error.message === commonMsgs[0]) {
        invalidEmailSignup();
      } else if (error.message === commonMsgs[1]) {
        invalidPasswordSignup(error);
      }

      if (!commonMsgs.includes(error.message)) {
        invalidCredentialsSignup();
      }
    } finally {
      setLoading(false);
    }
  };

  const showPw = () => setShow(!show);

  return (
    <Flex justifyContent="center" alignItems="center" height="50vh">
      <VStack>
        <Box fontSize={["36px", "48px"]}>vibe☑ </Box>
        <Heading size="md">time to check in</Heading>
        <FormControl isRequired>
          <VStack>
            {/**** email input ****/}
            <Input
              type="email"
              placeholder="your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {/**** password input w/ show/hide ****/}
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type={show ? "text" : "password"}
                placeholder="your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={showPw}>
                  {show ? "hide" : "show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </VStack>
        </FormControl>
        <ButtonGroup disabled={loading} h="1.75rem" size="sm">
          {/**** signup button ****/}
          <Button
            onClick={(e) => {
              e.preventDefault();
              handleSignUp(email, password);
            }}
            // disabled={loading}
            // h="1.75rem"
            // size="sm"
          >
            {loading ? "loading" : "sign up"}
          </Button>
          {/**** login button ****/}
          <Button
            onClick={(e) => {
              e.preventDefault();
              handleLogin(email, password);
            }}
            // disabled={loading}
            // h="1.75rem"
            // size="sm"
          >
            {loading ? "loading" : "login"}
          </Button>
        </ButtonGroup>
      </VStack>
    </Flex>
  );
}
