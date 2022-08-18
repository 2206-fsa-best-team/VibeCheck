import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorMode,
  useColorModeValue,
  Stack,
  Center,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { onOpen, onClose } = useDisclosure();
  return (
    <Box bg={useColorModeValue("tomato", "black")} px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Box fontSize={["36px", "48px"]}>Moments</Box>
        <Flex alignItems={"center"}>
          <Stack direction={"row"} spacing={7}>
            <Button onClick={toggleColorMode}>
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>
            <Box>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                  onClick={onOpen}
                >
                  <Avatar
                    size={"sm"}
                    name={/*username goes here */ "Evan Barden"}
                    src={/*user profile pic could go here */ ""}
                  />
                </MenuButton>
                <MenuList alignItems={"center"} onClose={onClose} m={0}>
                  <br />
                  <Center>
                    <Avatar size={"2xl"} name={"Evan Barden"} src={""} />
                  </Center>
                  <br />
                  <Center>
                    <p>"this.state.username"</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem>testing</MenuItem>
                  <MenuItem>Account Settings (testing)</MenuItem>
                  <MenuItem>Logout (tessting)</MenuItem>
                </MenuList>
              </Menu>
            </Box>
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
}
