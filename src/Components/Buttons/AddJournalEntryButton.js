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

const AddJournalEntryButton = () => {
  return (
    <Container pt={4}>
      <Flex alignItems="flex-end" direction="row">
        <Link to={`/addajournal`}>
          <Tooltip
            label={`add a new journal entry`}
            placement="right"
            aria-label={`tooltip for adding a new journal entry`}
          >
            <Button
              leftIcon={<AddIcon />}
              aria-label={`add a new journal entry`}
              size="md"
              // bg={useColorModeValue("gray.300", "tomato")}
              px={4}
              py={4}
            >
              journal entry
            </Button>
          </Tooltip>
        </Link>
      </Flex>
    </Container>
  );
};

export default AddJournalEntryButton;
