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
        bg={useColorModeValue("gray.300", "gray.800")}
        px={4}
        py={4}
        pos={"fixed"}
        left={0}
        h={"100%"}
        w={"20%"}
        flexDirection="column"
      >
        <VStack align={"space-between"} divider={<StackDivider />} as="ol">
          <Link to="/moments">
            <Box
              bg={location.pathname === "/moments" ? highlightColor : ""}
              borderRadius="lg"
              display="flex"
              alignItems="center"
              gap="1rem"
              padding=".25rem"
              as="li"
            >
              <Icon
                aria-label="All Moments Page"
                w={8}
                h={8}
                as={MdFormatListBulleted}
                display="block"
              />
              <Box as="p">moments</Box>
            </Box>
          </Link>
          <Link to="/journals">
            <Box
              bg={location.pathname === "/journals" ? highlightColor : ""}
              borderRadius="lg"
              display="flex"
              alignItems="center"
              gap="1rem"
              padding=".25rem"
              as="li"
            >
              <Icon
                variant="ghost"
                aria-label="All Journal Entries Page"
                w={8}
                h={8}
                as={BsFillJournalBookmarkFill}
              />
              <Box>journal</Box>
            </Box>
          </Link>
          <Link to="/vibes">
            <Box
              bg={location.pathname === "/vibes" ? highlightColor : ""}
              borderRadius="lg"
              display="flex"
              alignItems="center"
              gap="1rem"
              padding=".25rem"
              as="li"
            >
              <Icon aria-label="dashboard" w={8} h={8} as={BiLineChart} />
              <Box>dashboard</Box>
            </Box>
          </Link>
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
