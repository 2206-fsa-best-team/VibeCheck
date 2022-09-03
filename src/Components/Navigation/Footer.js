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
  const highlightColor = useColorModeValue("whiteAlpha.900", "gray.700");

  return (
    <Box
      bg={useColorModeValue("gray.400", "gray.800")}
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
            borderRadius="0.5rem"
            variant="ghost"
            color={location.pathname === "/moments" ? "" : highlightColor}
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
            borderRadius="0.5rem"
            py={1}
            variant="ghost"
            color={location.pathname === "/journals" ? "" : highlightColor}
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
            borderRadius="0.5rem"
            variant="ghost"
            color={location.pathname === "/vibes" ? "" : highlightColor}
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
