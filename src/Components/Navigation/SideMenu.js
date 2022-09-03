import React from "react";
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
  const highlightColor = useColorModeValue("whiteAlpha.900", "gray.700");

  return (
    <Container>
      <Box
        bg={useColorModeValue("gray.400", "gray.800")}
        px={4}
        py={4}
        pos={"fixed"}
        left={0}
        h={"100%"}
        w={"20%"}
        flexDirection="column"
      >
        <VStack align={"space-between"} divider={<StackDivider />}>
          <Box
            bg={location.pathname === "/moments" ? highlightColor : ""}
            borderRadius="lg"
          >
            <Link to="/moments">
              <Icon
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
            bg={location.pathname === "/journals" ? highlightColor : ""}
            borderRadius=".5rem"
          >
            <Link to="/journals">
              <Icon
                variant="ghost"
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
            bg={location.pathname === "/vibes" ? highlightColor : ""}
            borderRadius=".5rem"
          >
            <Link to="/vibes">
              <Icon
                variant="ghost"
                aria-label="dashboard"
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
