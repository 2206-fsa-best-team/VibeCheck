import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  useColorMode,
  VStack,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  HStack,
  Spinner,
  Skeleton,
} from "@chakra-ui/react";
import LightDarkButton from "../LightDarkButton";
import { supabase } from "../../server/supabaseClient";

const SettingsScreen = (props) => {
  const { colorMode } = useColorMode();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [emailLoading, setEmailLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);

  async function updateEmail() {
    try {
      setEmailLoading(true);

      const { data, error } = await supabase.auth.update({
        email: email,
        updated_at: new Date(),
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setEmailLoading(false);
    }
    alert('You have updated your email')
  }
  async function updatePassword() {
    try {
      setPasswordLoading(true);

      const { data, error } = await supabase.auth.update({
        password: password,
        updated_at: new Date(),
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setPasswordLoading(false);
    }
    alert('You have updated your password')
  }

  useEffect(() => {
    setPageLoading(true);
    const user = supabase.auth.user();
    setEmail(user.email);
    setPageLoading(false);
  }, []);

  return (
    <Container zIndex='hide' >
      <VStack alignItems="stretch" p="5" pt="10" >
        {pageLoading ? (
          <>
            <Skeleton h="20px" />
            <Skeleton h="20px" />
          </>
        ) : (
          <>
            <HStack align={"center"} flexDirection="row">
              <Text alignContent="flex-start" pr="3">
                Edit Email
              </Text>
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailLoading ? (
                <Spinner size="md" alignSelf={"center"} colorScheme="tomato" />
              ) : (
                <Button size="md" w="10rem" onClick={updateEmail}>
                  Update
                </Button>
              )}
            </HStack>
            <HStack align={"center"} flexDirection="row">
              <InputGroup size="md" alignItems={"center"}>
                <Text alignContent="flex-start" pr="3">
                  Edit Password
                </Text>
                <Input
                  pr="4.5rem"
                  type={show ? "text" : "password"}
                  placeholder="Your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement w="4.5rem" pt="8px">
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {passwordLoading ? (
                <Spinner size="md" alignSelf={"center"} colorScheme="tomato" />
              ) : (
                <>
                  <Button size="md" w="8rem" onClick={updatePassword}>
                    Update
                  </Button>
                </>
              )}
            </HStack>
            <HStack
              display="flex"
              width="100%"
              alignItems="center"
              pr="4.5rem"
              pt="10"
              flexDirection="row"
            >
              <Text alignContent="flex-start" w={"6rem"}>
                {`Disable ${colorMode} mode`}
              </Text>
              <LightDarkButton justifyContent="flex-end" />
            </HStack>
          </>
        )}
      </VStack>
    </Container>
  );
};
export default SettingsScreen;
