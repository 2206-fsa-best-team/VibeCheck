import React, { useState } from "react";
import {
  Button,
  Container,
  useColorMode,
  VStack,
  Input,
  InputGroup,
  InputRightElement,
  Flex,
  Box,
  Text,
  HStack,
  Spinner,
} from "@chakra-ui/react";
import LightDarkButton from "../LightDarkButton";

const SettingsScreen = (props) => {
  const { colorMode } = useColorMode();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [loading, setLoading] = useState(false);

  const handleUpdate = (email, password) => {
    setLoading(true);
    


    alert("Your information has been updated");
    setLoading(false);
  };

  return (
    <Container>
      <VStack alignItems="stretch" p="5" pt="10">
        <InputGroup size="md">
          <Text alignContent="flex-start" pr="3">
            Update your Email
          </Text>
          <Input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputGroup>
        <InputGroup size="md">
          <Text alignContent="flex-start" pr="3">
            Update your Password
          </Text>
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement w="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
        {loading ? (
          <Spinner size="md" alignSelf={"center"} />
        ) : (
          <Button
            size="md"
            w="12rem"
            alignSelf={"center"}
            onClick={handleUpdate}
          >
            Confirm Update
          </Button>
        )}
        <HStack
          display="flex"
          width="100%"
          alignItems="center"
          pr="4.5rem"
          pt="10"
        >
          <Text alignContent="flex-start" w={"6rem"}>
            {`Disable ${colorMode} mode`}
          </Text>
          <LightDarkButton />
        </HStack>
      </VStack>
    </Container>
  );
};
export default SettingsScreen;
