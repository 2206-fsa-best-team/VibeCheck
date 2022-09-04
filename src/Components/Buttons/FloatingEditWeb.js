import { IconButton, Flex, Container, Tooltip } from "@chakra-ui/react";
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
            pos="fixed"
            px={4}
            py={4}
            top={24}
            right={location === "moment" ? "22vw" : "5vw"}
            {...props}
          />
        </Tooltip>
      </Flex>
    </Container>
  );
};

export default FloatingEditWeb;
