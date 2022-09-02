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
import { Link } from "react-router-dom";
import AddMomentButton from "../Buttons/AddMomentButton";
import AddJournalEntryButton from "../Buttons/AddJournalEntryButton";

function SideMenu() {
  const [lastClicked, setLastClicked] = useState("moment");

  const handleClick = (location) => {
    setLastClicked(location);
    console.log("lastClicked", lastClicked);
  };

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
              onClick={() => handleClick("moment")}
              as={MdFormatListBulleted}
            />
            <Box
              display={"inline"}
              px={5}
              pt={2}
              pos={"absolute"}
              onClick={() => handleClick("moment")}
            >
              moments
            </Box>
          </Link>
          <Link to="/journals">
            <Icon
              variant="ghost"
              color={"tomato"}
              aria-label="All Journal Entries Page"
              w={10}
              h={10}
              as={BsFillJournalBookmarkFill}
              onClick={() => handleClick("journal entry")}
            />
            <Box
              display={"inline"}
              px={5}
              pt={2}
              pos={"absolute"}
              onClick={() => handleClick("journal entry")}
            >
              journal
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
              vibes
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
