import { useState, useEffect } from "react";
import { supabase } from "../server/supabaseClient";
import {
  VStack,
  HStack,
  Text,
  StackDivider,
  Skeleton,
  Stack,
  Icon,
} from "@chakra-ui/react";
import FloatingAdd from "./FloatingAdd";

const Moments = () => {
  const [moments, setMoments] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchMoments();
  }, []);

  async function fetchMoments() {
    const { data } = await supabase.from("moments").select();
    setMoments(data);
    setLoading(false);
  }

  const location = "moment";

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

  if (loading)
    return (
      <Stack padding={4} spacing={1} maxW="700px">
        <Skeleton height="60px" />
        <Skeleton height="60px" />
        <Skeleton height="60px" />
        <Skeleton height="60px" />
        <Skeleton height="60px" />
        <Skeleton height="60px" />
      </Stack>
    );

  return (
    <VStack
      divider={<StackDivider />}
      borderColor="gray.100"
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
          <Text fontSize="10px" color="gray.400" w="100%" align="right">
            {moment.created_at.slice(0, 9)}
          </Text>
        </HStack>
      ))}
      <FloatingAdd location={location} />
    </VStack>
  );
};

export default Moments;
