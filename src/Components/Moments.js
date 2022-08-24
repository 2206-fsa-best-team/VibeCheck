import { useState, useEffect } from "react";
import { supabase } from "../server/supabaseClient";
import {
  VStack,
  HStack,
  Text,
  Box,
  Skeleton,
  Stack,
  Icon,
} from "@chakra-ui/react";
import FloatingAdd from "./FloatingAdd";

const Moments = () => {
  const [moments, setMoments] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchMoments();
  }, []);

  async function fetchMoments() {
    setLoading(true);
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
            All Moments
          </Text>
          {!moments.length ? (
            <Text ml="24px" fontSize={"16"} pl="24px" pt="24px">
              Add a moment using the plus button!
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
              {moments.map((moment) => (
                <Box
                  maxW="sm"
                  // display='flex'
                  align="stretch"
                  borderWidth="1px"
                  borderRadius="lg"
                  key={moment.id}
                >
                  <HStack h={["60px", "100px"]}>
                    <Icon
                      viewBox="0 0 200 200"
                      color={() => colorSelector(moment.vibe)}
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
                      {moment.content.length < 140
                        ? moment.content
                        : `${moment.content.slice(0, 140)}...`}
                    </Text>
                    <Text
                      fontSize="10px"
                      color="gray"
                      w="100%"
                      align="right"
                      p="16px"
                    >
                      Created: <br />
                      {moment.created_at.slice(0, 10)}
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
    </>
  );
};

export default Moments;
