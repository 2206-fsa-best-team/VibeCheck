import {
  IconButton,
  Flex,
  Container,
  useColorModeValue,
  Tooltip,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import React from "react";

const FloatingDelete = (props) => {
  const { location } = props;

  return (
    <Container>
      <Flex alignItems="flex-end" direction="row">
        <Tooltip
          label={`delete your moment`}
          placement="left"
          aria-label={`tooltip for deleting a ${location}`}
        >
          <IconButton
            icon={<DeleteIcon />}
            isRound="true"
            aria-label={`delete your ${location}`}
            alignSelf="flex-end"
            size="lg"
            // bg={useColorModeValue("gray.300", "tomato")}
            variant="solid"
            pos="fixed"
            px={4}
            py={4}
            bottom={24}
            right={28}
          />
        </Tooltip>
      </Flex>
    </Container>
  );
};

export default FloatingDelete;
