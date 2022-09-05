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
  useColorModeValue,
  Stack,
  Center,
  Portal,
} from "@chakra-ui/react";
import { supabase } from "../../server/supabaseClient";
import { Link } from "react-router-dom";
import LightDarkButton from "../Buttons/LightDarkButton";
import { useEffect, useState } from "react";
import { Logo } from "./logo";

export default function Navbar(props) {
  const { onOpen, onClose } = useDisclosure();
  const [user, setUser] = useState({});
  const { isLoggedIn } = props;
  const name = user.email || "";

  useEffect(() => {
    fetchUser();
  }, []);

  async function fetchUser() {
    try {
      const person = supabase.auth.user();
      setUser(person);
    } catch (error) {
      console.error(error.error_description || error.message);
    }
  }

  return (
    <Box
      bg={useColorModeValue("gray.300", "gray.800")}
      px={4}
      pos={"fixed"}
      w={"100%"}
      top={0}
      zIndex={999}
    >
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Link to="/moments">
          <Box h={[10, 14]} color={useColorModeValue("gray.800", "white")}>
            <Logo />
          </Box>
        </Link>
        <Flex alignItems={"center"}>
          <Stack direction={"row"} spacing={7}>
            <LightDarkButton />
            <Box>
              <Menu isLazy={true}>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                  onClick={onOpen}
                  aria-label="open user menu button"
                >
                  <Avatar
                    size={"sm"}
                    name={name}
                    src=""
                    bg={useColorModeValue("gray.800", "whiteAlpha.900")}
                    color={useColorModeValue("whiteAlpha.900", "gray.700")}
                  />
                </MenuButton>
                <Portal>
                  <MenuList
                    alignItems={"center"}
                    onClose={onClose}
                    m={0}
                    zIndex="popover"
                    borderWidth={2}
                    bg={useColorModeValue("gray.50", "gray.600")}
                  >
                    <br />
                    <Center>
                      <Avatar
                        size={"2xl"}
                        name={name}
                        src={""}
                        bg={useColorModeValue("gray.800", "whiteAlpha.900")}
                        color={useColorModeValue("whiteAlpha.900", "gray.700")}
                      />
                    </Center>
                    <br />
                    <Center>
                      <p>{name}</p>
                    </Center>
                    <br />
                    <MenuDivider />
                    <Link to="/about">
                      <MenuItem>About Us</MenuItem>
                    </Link>
                    <Link to="/settings">
                      <MenuItem>Settings</MenuItem>
                    </Link>
                    {isLoggedIn ? (
                      <Link to="/">
                        <MenuItem
                          onClick={() => {
                            supabase.auth.signOut();
                          }}
                        >
                          Logout
                        </MenuItem>
                      </Link>
                    ) : (
                      <></>
                    )}
                  </MenuList>
                </Portal>
              </Menu>
            </Box>
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
}
