import { useState, useEffect } from "react";
import { supabase } from "../server/supabaseClient";
import { VStack, HStack, Text, StackDivider, Box } from "@chakra-ui/react";

const Moments = () => {
  const [moments, setMoments] = useState([]);
  useEffect(() => {
    fetchMoments();
  }, []);

  async function fetchMoments() {
    const { data } = await supabase.from("moments").select();
    setMoments(data);
  }

  return (
    <Box p={4}>
      <VStack
        divider={<StackDivider />}
        borderColor="gray.100"
        borderWidth="2px"
        p="5"
        borderRadius="lg"
        w="100%"
        maxW={{ base: "90vw", sm: "80vw", lg: "50vw", xl: "30vw" }}
        alignItems="stretch"
      >
        {moments.map((moment) => (
          <HStack key={moment.id}>
            <Text w="100%" p="8px" borderRadius="lg">
              {moment.content}
            </Text>
          </HStack>
        ))}
      </VStack>
    </Box>
  );
};

export default Moments;
