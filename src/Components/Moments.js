import { useState, useEffect } from "react";
import { supabase } from "../server/supabaseClient";
import {
  VStack,
  HStack,
  Text,
  StackDivider,
  Box,
  Icon,
} from "@chakra-ui/react";

const Moments = () => {
  const [moments, setMoments] = useState([]);
  useEffect(() => {
    fetchMoments();
  }, []);

  async function fetchMoments() {
    const { data } = await supabase.from("moments").select();
    setMoments(data);
  }

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
        return "red.600"
    }
  };

  return (
    <Box>
      <VStack
        divider={<StackDivider />}
        borderColor="gray.100"
        borderWidth="2px"
        p="5"
        borderRadius="lg"
        w="100%"
        alignItems="stretch"
        maxW="700px"
      >
        {moments.map((moment) => (
          <HStack key={moment.id}>
            <Icon viewBox="0 0 200 200" color={() => colorSelector(moment.vibe)}>
              <path
                fill="currentColor"
                d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
              />
            </Icon>
            <Text w="100%" p="8px" borderRadius="lg">
              {moment.content}
            </Text>
            <Text fontSize='10px'
            color='gray.400'

            >{moment.created_at.slice(0, 9)}</Text>
          </HStack>
        ))}
      </VStack>
    </Box>
  );
};

export default Moments;
