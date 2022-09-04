import { IconButton, Flex, Container, Tooltip } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import React from "react";

const FloatingEditMobile = (props) => {
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
            bottom={40}
            right={12}
            {...props}
          />
        </Tooltip>
      </Flex>
    </Container>
  );
};

export default FloatingEditMobile;
