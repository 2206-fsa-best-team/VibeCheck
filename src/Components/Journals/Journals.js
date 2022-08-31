import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../server/supabaseClient";
import {
  VStack,
  HStack,
  Box,
  Text,
  Skeleton,
  Stack,
  Icon,
} from "@chakra-ui/react";
import FloatingAdd from "../Buttons/FloatingAdd";
import { colorSelector } from "../Helpers/colorChanger";

const Journals = () => {
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = "journal";

  useEffect(() => {
    fetchJournals();
  }, []);

  async function fetchJournals() {
    setLoading(true);
    const { data } = await supabase
      .from("journals")
      .select()
      .order("date", { ascending: false });
    setJournals(data);
    setLoading(false);
  }

  const navToJournalEntry = (id) => {
    navigate(`/journals/${id}`);
  };

  return (
    <>
      {loading ? (
        <Stack padding={4} spacing={4} maxW="700px">
          <Skeleton height="60px" />
          <Skeleton height="60px" />
          <Skeleton height="60px" />
          <Skeleton height="60px" />
          <Skeleton height="60px" />
          <Skeleton height="60px" />
        </Stack>
      ) : (
        <>
          <Text ml="24px" fontSize={"24"} pl="24px" pt="24px">
            your journal entries
          </Text>
          {!journals.length ? (
            <Text ml="24px" fontSize={"16"} pl="24px" pt="24px">
              add a new entry using the plus button.
            </Text>
          ) : (
            <VStack
              p="5"
              m="16px"
              spacing={"16px"}
              borderRadius="lg"
              alignItems="stretch"
              maxW="700px"
            >
              {journals.map((journal) => (
                <Box
                  maxW="sm"
                  // display='flex'
                  align="stretch"
                  borderWidth="1px"
                  borderRadius="lg"
                  key={journal.id}
                  onClick={() => navToJournalEntry(journal.id)}
                >
                  <HStack h={["100px", "140px"]}>
                    <Icon
                      viewBox="0 0 200 200"
                      color={() => colorSelector(journal.vibe)}
                      ml="16px"
                    >
                      <path
                        fill="currentColor"
                        d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
                      />
                    </Icon>
                    <Text
                      lineHeight={"tight"}
                      noOfLines={[3, 4, 5]}
                      minW="180px"
                    >
                      {journal.content.length < 140
                        ? journal.content
                        : `${journal.content.slice(0, 140)}...`}
                    </Text>
                    <Text
                      fontSize="10px"
                      color="gray"
                      w="100%"
                      align="right"
                      p="16px"
                    >
                      Created: <br />
                      {journal.date.slice(0, 10)}
                    </Text>
                  </HStack>
                </Box>
              ))}
            </VStack>
          )}
          <FloatingAdd location={location} />
        </>
      )}
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </>
  );
};

export default Journals;
