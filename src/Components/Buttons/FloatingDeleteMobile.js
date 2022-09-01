import { IconButton, Flex, Container, Tooltip } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import React from "react";

const FloatingDeleteMobile = (props) => {
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
            variant="solid"
            pos="fixed"
            px={4}
            py={4}
            bottom={24}
            right={12}
            {...props}
          />
        </Tooltip>
      </Flex>
    </Container>
  );
};

export default FloatingDeleteMobile;
