import {
  Box,
  Flex,
  useColorModeValue,
  Icon,
  Spacer,
  Divider,
} from "@chakra-ui/react";
import { BsFillJournalBookmarkFill } from "react-icons/bs";
import { MdFormatListBulleted } from "react-icons/md";
import { BiLineChart } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";

function Footer() {
  const location = useLocation();
  return (
    <Box
      bg={useColorModeValue("gray.300", "#0a0f1c")}
      px={4}
      py={2}
      pb={5}
      pos={"fixed"}
      bottom={0}
      w={"100%"}
      zIndex={999}
    >
      <Flex align={"space-between"} h={10}>
        <Spacer />
        <Link to="/moments">
          <Icon
            bg={location.pathname === "/moments" ? "teal" : ""}
            borderRadius="0.5rem"
            variant="ghost"
            color={"tomato"}
            aria-label="All Moments Page"
            w={10}
            h={10}
            as={MdFormatListBulleted}
          />
        </Link>
        <Spacer />
        <Divider orientation={"vertical"} />
        <Spacer />
        <Link to="/journals">
          <Icon
            bg={location.pathname === "/journals" ? "teal" : ""}
            borderRadius="0.5rem"
            py={1}
            variant="ghost"
            color={"tomato"}
            aria-label="All Journals Page"
            w={10}
            h={10}
            as={BsFillJournalBookmarkFill}
          />
        </Link>
        <Spacer />
        <Divider orientation={"vertical"} />
        <Spacer />
        <Link to="/vibes">
          <Icon
            bg={location.pathname === "/vibes" ? "teal" : ""}
            borderRadius="0.5rem"
            variant="ghost"
            color={"tomato"}
            aria-label="Vibe graphs"
            w={10}
            h={10}
            as={BiLineChart}
          />
        </Link>
        <Spacer />
      </Flex>
    </Box>
  );
}

export default Footer;
