import { useState } from "react";
import { supabase } from "../../server/supabaseClient";
import LightDarkButton from '../Buttons/LightDarkButton'
import {
  Input,
  InputGroup,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  InputRightElement,
  useToast,
  Box,
  FormControl,
  CircularProgress,
} from "@chakra-ui/react";
import { ViewOffIcon, ViewIcon } from "@chakra-ui/icons";
import {
  invalidCredentialsLogin,
  loginSuccess,
  userExists,
  verifyEmailSent,
  invalidEmailSignup,
  invalidPasswordSignup,
  invalidCredentialsSignup,
} from "../ToastAlerts/AuthFormAlerts";

export default function Auth() {
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [loadingSignUp, setLoadingSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const toast = useToast();

  const credsInvalid = password.length < 6 || email.length === 0; // very rudimentary validation check

  // click handlers for login & signup
  const handleLogin = async (email, password) => {
    try {
      setLoadingLogin(true);
      const { error } = await supabase.auth.signIn({ email, password });
      if (error) throw error;
      toast(loginSuccess());
    } catch (error) {
      console.error(error.error_description || error.message);
      toast(invalidCredentialsLogin());
    } finally {
      setEmail("");
      setPassword("");
      setShow(false);
      setLoadingLogin(false);
    }
  };

  const handleSignUp = async (email, password) => {
    try {
      setLoadingSignUp(true);
      let lowercaseEmail = email.toLowerCase();

      const dbCheck = await supabase
        .from("profiles")
        .select()
        .eq("email", lowercaseEmail);

      if (dbCheck.data.length !== 0) {
        toast(userExists());
      } else {
        const { error } = await supabase.auth.signUp(
          {
            email,
            password,
          },
          { redirectTo: "http://localhost:3000/welcome" }
        );

        if (error) throw error;

        toast(verifyEmailSent());
      }
    } catch (error) {
      console.error(error.error_description || error.message);
      const commonMsgs = [
        "Unable to validate email address: invalid format",
        "Password should be at least 6 characters",
      ];
      if (error.message === commonMsgs[0]) {
        toast(invalidEmailSignup());
      } else if (error.message === commonMsgs[1]) {
        toast(invalidPasswordSignup(error));
      }

      if (!commonMsgs.includes(error.message)) {
        toast(invalidCredentialsSignup());
      }
    } finally {
      setEmail("");
      setPassword("");
      setShow(false);
      setLoadingSignUp(false);
    }
  };

  return (
    <Box>
      <Box textAlign="right" py={4} mr="2%">
        <LightDarkButton />
      </Box>
      <Flex justifyContent="center" width="full" align="center">
        <Box
          p={8}
          maxWidth="500px"
          borderWidth={1}
          borderRadius={8}
          boxShadow="md"
        >
          <Box textAlign="center">
            <Box fontSize={["36px", "48px"]}>vibe☑</Box>
            <Heading size="md">time to check in</Heading>
          </Box>
          <Box my={4} textAlign="left">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleLogin(email, password);
              }}
            >
              <FormControl isRequired>
                <Input
                  type="email"
                  placeholder="your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl mt={6} isRequired>
                <InputGroup size="md">
                  <Input
                    type={show ? "text" : "password"}
                    placeholder="your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      onClick={() => setShow(!show)}
                    >
                      {show ? <ViewOffIcon /> : <ViewIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <ButtonGroup size="md" mt={4}>
                <Button type="submit" disabled={credsInvalid}>
                  {loadingLogin ? (
                    <CircularProgress
                      isIndeterminate
                      size="1.75rem"
                      color="tomato"
                    />
                  ) : (
                    "login"
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSignUp(email, password);
                  }}
                  disabled={credsInvalid}
                >
                  {loadingSignUp ? (
                    <CircularProgress
                      isIndeterminate
                      size="1.75rem"
                      color="tomato"
                    />
                  ) : (
                    "sign up"
                  )}
                </Button>
              </ButtonGroup>
            </form>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}
