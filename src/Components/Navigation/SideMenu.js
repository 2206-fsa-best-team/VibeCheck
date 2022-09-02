import { useState } from "react";
import {
  Box,
  useColorModeValue,
  Icon,
  Container,
  VStack,
  StackDivider,
} from "@chakra-ui/react";
import { BiLineChart } from "react-icons/bi";
import { BsFillJournalBookmarkFill } from "react-icons/bs";
import { MdFormatListBulleted } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import AddMomentButton from "../Buttons/AddMomentButton";
import AddJournalEntryButton from "../Buttons/AddJournalEntryButton";

function SideMenu() {
  const location = useLocation();

  return (
    <Container>
      <Box
        bg={useColorModeValue("gray.300", "#0a0f1c")}
        px={4}
        py={2}
        pb={5}
        pos={"fixed"}
        left={0}
        h={"100%"}
        w={"20%"}
        flexDirection="column"
      >
        <VStack
          align={"space-between"}
          divider={<StackDivider borderColor="gray.200" />}
        >
          <Box
            bg={location.pathname === "/moments" ? "teal" : ""}
            borderRadius=".5rem"
          >
            <Link to="/moments">
              <Icon
                variant="ghost"
                color={"tomato"}
                aria-label="All Moments Page"
                w={8}
                h={8}
                as={MdFormatListBulleted}
              />
              <Box
                display={"inline"}
                pl={5}
                pr={"7.75ch"}
                pt={1}
                pb={2}
                pos={"absolute"}
              >
                moments
              </Box>
            </Link>
          </Box>
          <Box
            bg={location.pathname === "/journals" ? "teal" : ""}
            borderRadius=".5rem"
          >
            <Link to="/journals">
              <Icon
                variant="ghost"
                color={"tomato"}
                aria-label="All Journal Entries Page"
                pt={1}
                w={8}
                h={8}
                as={BsFillJournalBookmarkFill}
              />
              <Box
                display={"inline"}
                pl={5}
                pr={"12vh"}
                pt={1.5}
                pb={2}
                pos={"absolute"}
              >
                journal
              </Box>
            </Link>
          </Box>
          <Box
            bg={location.pathname === "/vibes" ? "teal" : ""}
            borderRadius=".5rem"
          >
            <Link to="/vibes">
              <Icon
                variant="ghost"
                color={"tomato"}
                aria-label="Vibe graphs"
                pt={0.5}
                w={8}
                h={8}
                as={BiLineChart}
              />
              <Box
                display={"inline"}
                pl={5}
                pr={"8.5vh"}
                pt={1.5}
                pb={2}
                pos={"absolute"}
              >
                dashboard
              </Box>
            </Link>
          </Box>
          <VStack>
            <AddMomentButton />
            <AddJournalEntryButton />
          </VStack>
        </VStack>
      </Box>
    </Container>
  );
}

export default SideMenu;
