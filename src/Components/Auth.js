import { useState } from "react";
import { supabase } from "../server/supabaseClient";
import {
  Input,
  InputGroup,
  Button,
  Flex,
  VStack,
  HStack,
  Heading,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const toast = useToast();

  const handleLogin = async (email, password) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn({ email, password });
      if (error) throw error;
      toast({
        title: "logged in",
        description: "enjoy the moment",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      // alert(error.error_description || error.message);
      console.error(error.error_description || error.message);
      toast({
        title: "invalid credentials",
        description: "please check your email and password and try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (email, password) => {
    try {
      setLoading(true);
      const { data, session, error } = await supabase.auth.signUp(
        {
          email,
          password,
        },
        { redirectTo: "http://localhost:3000/welcome" }
      );
      if (error) throw error;
      console.log("data-->", data);
      console.log("session-->", session);
      toast({
        title: "email sent",
        description:
          "a verification email has been sent to the address provided",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  const showPw = () => setShow(!show);

  return (
    <Flex>
      <VStack>
        <Heading size="md">Sign in or sign up with your email below</Heading>
        <VStack>
          {/**** email input ****/}
          <Input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/**** password input w/ show/hide ****/}
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={showPw}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </VStack>
        <HStack>
          {/**** signup button ****/}
          <Button
            onClick={(e) => {
              e.preventDefault();
              handleSignUp(email, password);
            }}
            disabled={loading}
            h="1.75rem"
            size="sm"
          >
            {loading ? "Loading" : "Sign Up"}
          </Button>
          {/**** login button ****/}
          <Button
            onClick={(e) => {
              e.preventDefault();
              handleLogin(email, password);
            }}
            disabled={loading}
            h="1.75rem"
            size="sm"
          >
            {loading ? "Loading" : "Login"}
          </Button>
        </HStack>
      </VStack>
    </Flex>
  );
}
