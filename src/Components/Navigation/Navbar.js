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
import LightDarkButton from '../Buttons/LightDarkButton'

export default function Navbar(props) {
  const { onOpen, onClose } = useDisclosure();
  const { isLoggedIn } = props;

  return (
    <Box
      bg={useColorModeValue("tomato", "black")}
      px={4}
      pos={"fixed"}
      w={"100%"}
      top={0}
    >
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Box fontSize={["36px", "48px"]}>vibe☑</Box>
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
                >
                  <Avatar
                    size={"sm"}
                    name={/*username goes here */ "Evan Barden"}
                    src={/*user profile pic could go here */ ""}
                  />
                </MenuButton>
                <Portal>
                  <MenuList
                    alignItems={"center"}
                    onClose={onClose}
                    m={0}
                    zIndex="popover"
                  >
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
