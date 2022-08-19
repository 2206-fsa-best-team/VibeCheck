import {
  Box,
  Flex,
  useColorModeValue,
  IconButton,
  Spacer,
  Divider,
} from "@chakra-ui/react";
import { BsFillJournalBookmarkFill } from "react-icons/bs";
import { MdFormatListBulleted } from "react-icons/md";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <Box
      bg={useColorModeValue("gray.300", "black")}
      px={4}
      py={2}
      pos={"fixed"}
      bottom={0}
      w={"100%"}
    >
      <Flex align={"space-between"} h={10}>
        <Spacer />
        <Link to="/moments">
          <IconButton
            variant="ghost"
            color={"tomato"}
            aria-label="All Moments Page"
            as={MdFormatListBulleted}
          />
        </Link>
        <Spacer />
        <Divider orientation={"vertical"} />
        <Spacer />
        <Link to="/journal">
          <IconButton
            variant="ghost"
            color={"tomato"}
            aria-label="All Journals Page"
            as={BsFillJournalBookmarkFill}
          />
        </Link>
        <Spacer />
      </Flex>
    </Box>
  );
}

export default Footer;
