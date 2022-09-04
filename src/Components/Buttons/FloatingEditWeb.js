import {
  IconButton,
  Flex,
  Container,
  useColorModeValue,
  Tooltip,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import React from "react";

const FloatingEditWeb = (props) => {
  const { location } = props;

  return (
    <Container>
      <Flex alignItems="flex-end" direction="row">
        <Tooltip
          label={`edit your ${location}`}
          placement="left"
          aria-label={`tooltip for editing a ${location}`}
        >
          <IconButton
            icon={<EditIcon />}
            isRound="true"
            aria-label={`edit your ${location}`}
            alignSelf="flex-end"
            size="lg"
            bg={useColorModeValue("gray.300", "tomato")}
            pos="fixed"
            px={4}
            py={4}
            top={40}
            right={location === "moment" ? "22vw" : "5vw"}
            {...props}
          />
        </Tooltip>
      </Flex>
    </Container>
  );
};

export default FloatingEditWeb;
