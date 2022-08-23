import React, { useState, useEffect } from "react";
import { supabase } from "../server/supabaseClient";
import {
  VStack,
  HStack,
  Box,
  Text,
  Skeleton,
  Stack,
  Icon,
} from "@chakra-ui/react";
import FloatingAdd from "./FloatingAdd";

const Journals = () => {
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchJournals();
  }, []);

  async function fetchJournals() {
    setLoading(true);
    const { data } = await supabase.from("journals").select();
    setJournals(data);
    setLoading(false);
  }

  const location = "journal";

  const colorSelector = (vibe) => {
    switch (vibe) {
      case 1:
        return "blue.500";
      case 2:
        return "blue.100";
      case 3:
        return "purple.100";
      case 4:
        return "red.300";
      case 5:
        return "red.600";
      default:
        return "red.600";
    }
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
            All Journals
          </Text>
          {!journals.length ? (
            <Text ml="24px" fontSize={"16"} pl="24px" pt="24px">Add a new Journal using the plus button!</Text>
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
                      {journal.created_at.slice(0, 10)}
                    </Text>
                  </HStack>
                </Box>
              ))}
              <FloatingAdd location={location} />
            </VStack>
          )}
        </>
      )}
      <br/>
      <br/>
      <br/>
    </>
  );
};

export default Journals;
