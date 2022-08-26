import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../server/supabaseClient";
import { VStack, HStack, Text, Box, Skeleton, Stack } from "@chakra-ui/react";
import DateObject from "react-date-object";
import FloatingEdit from "../Buttons/FloatingEdit";
import FloatingDelete from "../Buttons/FloatingDelete";

const SingleMoment = (props) => {
  const [moment, setMoment] = useState({
    content: "",
    vibe: null,
    created_at: Date(),
  });
  const [loading, setLoading] = useState(true);
  const { momentId } = useParams();

  useEffect(() => {
    fetchMoment();
  }, []);

  async function fetchMoment() {
    try {
      const { data, error } = await supabase
        .from("moments")
        .select()
        .eq("id", momentId)
        .single();

      if (error) throw error;
      setMoment(data);
    } catch (error) {
      console.error(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
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

  const vibeMsgSelector = (vibe) => {
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

  // format date from the db for how we want it displayed
  let modifiedDate = `${moment.created_at.slice(
    0,
    10
  )} ${moment.created_at.slice(11, 16)}`;
  let date = new DateObject(modifiedDate);
  date._format = "MMM D, YYYY - h:mm a";
  const dateFormatted = date.format();

  return (
    <>
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
                you were {vibeMsgSelector(moment.vibe)}
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
      <FloatingDelete location={location} momentId={moment.id} />
      <br />
      <br />
      <br />
    </>
  );
};

export default SingleMoment;
