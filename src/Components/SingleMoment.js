import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../server/supabaseClient";
import {
  VStack,
  HStack,
  Text,
  Box,
  Skeleton,
  Stack,
  Icon,
  Container,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import DateObject from "react-date-object";
import FloatingAdd from "./FloatingAdd";
import FloatingEdit from "./FloatingEdit";
import FloatingDelete from "./FloatingDelete";

const SingleMoment = (props) => {
  const [moment, setMoment] = useState({
    content: "",
    vibe: 0,
    created_at: Date(),
  });
  const [loading, setLoading] = useState(true);
  const { momentId } = useParams();

  useEffect(() => {
    fetchMoment();
  }, []);

  async function fetchMoment() {
    // setLoading(true);
    const { data } = await supabase
      .from("moments")
      .select()
      .eq("id", momentId)
      .single();
    setMoment(data);
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

  const vibeSelector = (vibe) => {
    switch (true) {
      case vibe <= 20:
        return "having a tough time";
      case vibe <= 40 && vibe > 20:
        return "not at your best";
      case vibe <= 60 && vibe > 40:
        return "floating in the middle";
      case vibe <= 80 && vibe > 60:
        return "feeling pretty good";
      case vibe <= 100 && vibe > 80:
        return "absolutely vibin'";
      default:
        return "inconclusive";
    }
  };

  let date = new DateObject();
  // console.log("moment.created_at", moment.created_at);
  // console.log(typeof moment.created_at);
  date._format = "YYYY-MM-DDTHH:mm";
  date.parse(moment.created_at);
  const dateFormatted = date.format("MMMM DD, YYYY - hh:mm a");
  // console.log("dateFormatted", dateFormatted);

  return (
    <>
      {/* <Text ml="24px" fontSize={"24"} pl="24px" pt="24px">
        your moment
      </Text> */}

      {loading ? (
        <Stack
          p="5"
          m="16px"
          spacing={"16px"}
          borderRadius="lg"
          alignItems="stretch"
          maxW="700px"
        >
          <Skeleton height="60px" />
        </Stack>
      ) : (
        <>
          <VStack
            p="5"
            m="16px"
            spacing={"16px"}
            borderRadius="lg"
            alignItems="stretch"
            maxW="700px"
          >
            <Box
              maxW="sm"
              // display='flex'
              align="stretch"
              borderWidth="1px"
              borderRadius="lg"
              borderTopWidth="4px"
              borderTopColor={() => colorSelector(moment.vibe)}
            >
              <Text w="100%" align="left" p="16px">
                {moment.content}
              </Text>
              <Text
                fontSize="0.75rem"
                fontStyle="italic"
                w="100%"
                align="left"
                px="16px"
              >
                you were {vibeSelector(moment.vibe)}
              </Text>
              <HStack>
                <Text
                  fontSize="0.75rem"
                  color="gray"
                  w="100%"
                  align="left"
                  p="16px"
                >
                  {dateFormatted.toLowerCase()}
                </Text>
              </HStack>
            </Box>
          </VStack>
        </>
      )}
      <FloatingEdit location={location} />
      <FloatingDelete location={location} />

      <br />
      <br />
      <br />
    </>
  );
};

export default SingleMoment;
