import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../server/supabaseClient";
import {
  VStack,
  HStack,
  Text,
  Box,
  Skeleton,
  Stack,
  Icon,
} from "@chakra-ui/react";
import FloatingAdd from "../Buttons/FloatingAdd";

const Moments = () => {
  const [moments, setMoments] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
    switch (true) {
      case vibe <= 20:
        return "blue.500";
      case vibe <= 40 && vibe > 20:
        return "blue.100";
      case vibe <= 60 && vibe > 40:
        return "purple.100";
      case vibe <= 80 && vibe > 60:
        return "red.300";
      case vibe <= 100 && vibe > 80:
        return "red.600";
      default:
        return "green.600";
    }
  };

  const navToMoment = (id) => {
    navigate(`/moments/${id}`);
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
                  onClick={() => navToMoment(moment.id)}
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
