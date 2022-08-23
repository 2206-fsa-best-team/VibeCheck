import React, { useState, useEffect } from "react";
import { supabase } from "../server/supabaseClient";
import {
  VStack,
  HStack,
  Text,
  StackDivider,
  Box,
  Skeleton,
  Stack,
  Icon,
  SimpleGrid,
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
      case 5:
        return "blue.500";
      case 4:
        return "blue.100";
      case 3:
        return "purple.100";
      case 2:
        return "red.300";
      case 1:
        return "red.600";
      default:
        return "red.600";
    }
  };

  return (
    <>
      {loading ? (
        <Stack padding={4} spacing={1} maxW="700px">
          <Skeleton height="60px" />
          <Skeleton height="60px" />
          <Skeleton height="60px" />
          <Skeleton height="60px" />
          <Skeleton height="60px" />
          <Skeleton height="60px" />
        </Stack>
      ) : (
        <>
          {/* <VStack
           divider={<StackDivider />}
           borderColor="gray.100"
           p="5"
           borderRadius="lg"
           w="100%"
           alignItems="stretch"
           maxW="700px"
         > */}
          <SimpleGrid
            columns={1}
            spacing={"40px"}
            maxW={"600px"}
            mt='24px'
          >
            {journals.map((journal) => (
              <Box border='2px' borderRadius={'lg'} borderColor={'grey.100'} key={journal.id}>
                <HStack>
                <Icon
                  viewBox="0 0 200 200"
                  color={() => colorSelector(journal.vibe)}
                >
                  <path
                    fill="currentColor"
                    d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
                  />
                </Icon>
                <Text w="100%" p="8px" borderRadius="lg">
                  {journal.content.slice(0, 140)}...
                </Text>
                <Text fontSize="10px" color="gray.400" w="100%" align="right">
                  {journal.created_at.slice(0, 9)}
                </Text>
                </HStack>
              </Box>
            ))}
            <FloatingAdd location={location} />
            {/* </VStack> */}
          </SimpleGrid>
        </>
      )}
    </>
  );
};

export default Journals;
