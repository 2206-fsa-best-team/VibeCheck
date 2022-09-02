import {
  Button,
  Flex,
  Container,
  useColorModeValue,
  Tooltip,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import React from "react";
import { Link } from "react-router-dom";

const AddMomentButton = () => {
  return (
    <Container pt={4}>
      <Flex alignItems="flex-end" direction="row">
        <Link to={`/addamoment`}>
          <Tooltip
            label={`add a new moment`}
            placement="right"
            aria-label={`tooltip for adding a new moment`}
          >
            <Button
              leftIcon={<AddIcon />}
              aria-label={`add a new moment`}
              size="md"
              bg={useColorModeValue("gray.300", "tomato")}
              pl={4}
              pr={12}
              py={4}
            >
              moment
            </Button>
          </Tooltip>
        </Link>
      </Flex>
    </Container>
  );
};

export default AddMomentButton;
