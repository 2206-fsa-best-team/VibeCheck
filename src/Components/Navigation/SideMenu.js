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
import { Link } from "react-router-dom";

function SideMenu() {
  return (
    <Container >
      <Box
        bg={useColorModeValue("gray.300", "black")}
        px={4}
        py={2}
        pb={5}
        pos={"fixed"}
        left={0}
        h={"100%"}
        w={"20%"}
      >
        <VStack
          align={"space-between"}
          h={10}
          divider={<StackDivider borderColor="gray.200" />}
        >
          <Link to="/moments">
            <Icon
              variant="ghost"
              color={"tomato"}
              aria-label="All Moments Page"
              w={10}
              h={10}
              as={MdFormatListBulleted}
            />
            <Box display={"inline"} px={5} pt={2} pos={"absolute"}>
              All Moments
            </Box>
          </Link>
          <Link to="/journals">
            <Icon
              variant="ghost"
              color={"tomato"}
              aria-label="All Journals Page"
              w={10}
              h={10}
              as={BsFillJournalBookmarkFill}
            />
            <Box display={"inline"} px={5} pt={2} pos={"absolute"}>
              All Journals
            </Box>
          </Link>
          <Link to="/vibes">
            <Icon
              variant="ghost"
              color={"tomato"}
              aria-label="Vibe graphs"
              w={10}
              h={10}
              as={BiLineChart}
            />
            <Box display={"inline"} px={5} pt={2} pos={"absolute"}>
              Vibes
            </Box>
          </Link>
        </VStack>
      </Box>
    </Container>
  );
}

export default SideMenu;
