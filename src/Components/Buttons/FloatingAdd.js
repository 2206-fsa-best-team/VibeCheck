import {
  IconButton,
  Flex,
  Container,
  useColorModeValue,
  Tooltip,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import React from "react";
import { Link } from "react-router-dom";

const FloatingAdd = (props) => {
  const { location } = props;

  return (
    <Container>
      <Flex alignItems="flex-end" direction="row">
        <Link to={`/adda${location}`}>
          <Tooltip
            label={`Add a new ${location}`}
            placement="left"
            aria-label={`tooltip for adding a new ${location}`}
          >
            <IconButton
              icon={<AddIcon />}
              isRound="true"
              aria-label={`Add a new ${location}`}
              alignSelf="flex-end"
              size="lg"
              bg={useColorModeValue("gray.300", "tomato")}
              pos="fixed"
              px={4}
              py={4}
              bottom={24}
              right={12}
            />
          </Tooltip>
        </Link>
      </Flex>
    </Container>
  );
};

export default FloatingAdd;
