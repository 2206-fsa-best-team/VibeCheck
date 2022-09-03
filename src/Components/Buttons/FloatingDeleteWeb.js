import { IconButton, Flex, Container, Tooltip } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import React from "react";

const FloatingDeleteWeb = (props) => {
  const { location } = props;

  return (
    <Container>
      <Flex alignItems="flex-end" direction="row">
        <Tooltip
          label={`delete your ${location}`}
          placement="left"
          aria-label={`tooltip for deleting a ${location}`}
        >
          <IconButton
            icon={<DeleteIcon />}
            isRound="true"
            aria-label={`delete your ${location}`}
            alignSelf="flex-end"
            size="lg"
            variant="ghost"
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

export default FloatingDeleteWeb;
