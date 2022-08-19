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
} from "@chakra-ui/react";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const handleLogin = async (email, password) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn({ email, password });
      if (error) throw error;
      alert("Sick. You should be logged in now.");
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (email, password) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp(
        {
          email,
          password,
        },
        { redirectTo: "http://localhost:3000/welcome" }
      );
      if (error) throw error;

      alert("Check your email for a verification link.");
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = () => setShow(!show);

  return (
    <Flex>
      <VStack>
        <Heading size="md">Sign in or sign up with your email below</Heading>
        <VStack>
          <Input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </VStack>
        <HStack>
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
        </HStack>
      </VStack>
    </Flex>
  );
}
