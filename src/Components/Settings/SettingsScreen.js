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
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

const SettingsScreen = (props) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  return (
    <Container>
      <VStack alignItems="stretch">
        <InputGroup size="md">
          <Text alignContent="flex-start" pr='3'>Update your Email</Text>
          <Input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputGroup>
        <InputGroup size="md">
          <Text alignContent="flex-start" pr='3'>Update your Password</Text>
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
        <Box
          display="flex"
          width="100%"
          alignItems="center"
          pr="4.5rem"
        >
          <Text alignContent="flex-start" w={'6rem'}>
            {`Toggle off ${colorMode} mode`}
          </Text>
          <Button onClick={toggleColorMode} >
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
        </Box>
      </VStack>
    </Container>
  );
};
export default SettingsScreen;
