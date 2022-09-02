import React from "react";
import { VStack, Box, Skeleton } from "@chakra-ui/react";
import JournalEntryDetails from "./JournalEntryDetails";
import { colorSelector } from "../Helpers/colorChanger";

const JournalEntryCard = (props) => {
  const { loading, journalEntry, onClick } = props;

  return loading ? (
    <VStack p="5" m="16px" spacing={"16px"} alignItems="stretch" maxW="xl">
      <Skeleton height="10rem" borderRadius="lg" />
    </VStack>
  ) : (
    <Box
      onClick={onClick}
      maxW="xl"
      align="stretch"
      borderWidth="1px"
      borderRadius="lg"
      borderTopWidth=".25rem"
      borderTopColor={() => colorSelector(journalEntry.vibe).border}
    >
      <JournalEntryDetails {...props} />
    </Box>
  );
};

export default JournalEntryCard;
