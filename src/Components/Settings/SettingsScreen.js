import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Box,
  VStack,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  CircularProgress,
  Skeleton,
  useToast,
} from "@chakra-ui/react";
import { supabase } from "../../server/supabaseClient";
import { passwordUpdated, emailUpdated } from "../ToastAlerts/AuthFormAlerts";

const SettingsScreen = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [emailLoading, setEmailLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const toast = useToast();

  async function updateEmail() {
    try {
      setEmailLoading(true);

      const { error } = await supabase.auth.update({
        email: email,
        updated_at: new Date(),
      });

      if (error) {
        throw error;
      }
      toast(emailUpdated());
    } catch (error) {
      alert(error.message);
    } finally {
      setEmailLoading(false);
    }
  }
  async function updatePassword() {
    try {
      setPasswordLoading(true);

      const { error } = await supabase.auth.update({
        password: password,
        updated_at: new Date(),
      });

      if (error) {
        throw error;
      }
      toast(passwordUpdated());
    } catch (error) {
      alert(error.message);
    } finally {
      setPasswordLoading(false);
    }
  }

  useEffect(() => {
    setPageLoading(true);
    const user = supabase.auth.user();
    setEmail(user.email);
    setPageLoading(false);
  }, []);

  return (
    <Container zIndex="hide">
      <VStack alignItems="stretch" p="5" pt="10">
        {pageLoading ? (
          <>
            <Skeleton h="20px" />
            <Skeleton h="20px" />
          </>
        ) : (
          <>
            <Text alignContent="flex-start" pr="3" fontSize={"24px"}>
              edit email
            </Text>

            <Input
              type="email"
              placeholder="your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailLoading ? (
              <CircularProgress
                isIndeterminate
                size="1.75rem"
                align="right"
                pr={"32px"}
              />
            ) : (
              <Box align="right">
                <Button size="md" w="6rem" onClick={updateEmail}>
                  update
                </Button>
              </Box>
            )}
            <br />
            <Text alignContent="flex-start" pr="3" fontSize={"24px"}>
              edit password
            </Text>
            <InputGroup size="md" alignItems={"center"}>
              <Input
                pr="4.5rem"
                type={show ? "text" : "password"}
                placeholder="your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightElement w="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
            {passwordLoading ? (
              <CircularProgress
                isIndeterminate
                size="1.75rem"
                align="right"
                pr={"32px"}
              />
            ) : (
              <Box align="right">
                <Button size="md" w="6rem" onClick={updatePassword}>
                  update
                </Button>
              </Box>
            )}
          </>
        )}
      </VStack>
    </Container>
  );
};
export default SettingsScreen;
