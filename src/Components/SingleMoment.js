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
  EditablePreview,
  useColorModeValue,
  IconButton,
  Input,
  useDisclosure,
  useEditableControls,
  ButtonGroup,
  SlideFade,
  Editable,
  Tooltip,
  EditableInput,
  Flex,
} from "@chakra-ui/react";
import DateObject from "react-date-object";
import FloatingEdit from "./FloatingEdit";
import FloatingDelete from "./FloatingDelete";
import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";

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

  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent="end" size="sm" w="full" spacing={2} mt={2}>
        <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
        <IconButton
          icon={<CloseIcon boxSize={3} />}
          {...getCancelButtonProps()}
        />
      </ButtonGroup>
    ) : null;
    // <FloatingEdit location={location} {...getEditButtonProps()} />
    // <Flex justifyContent="center">
    //   <IconButton size="sm" icon={<EditIcon />} {...getEditButtonProps()} />
    // </Flex>
  }

  const editBackgroundColor = useColorModeValue("gray.100", "gray.700");
  let startingContent = moment.content;

  async function fetchMoment() {
    try {
      const { data, error } = await supabase
        .from("moments")
        .select()
        .eq("id", momentId)
        .single();

      if (error) throw error;
      console.log("data:", data);
      setMoment({
        content: data.content,
        vibe: data.vibe,
        created_at: data.created_at,
      });
      startingContent = data.content;
    } catch (error) {
      console.error(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  }

  async function editMomentContent(e) {
    try {
      const { error } = await supabase
        .from("moments")
        .update({ content: e })
        .eq("id", momentId);

      if (error) throw error;
      // setMoment(data);
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
  console.log("created_at", moment.created_at);
  // debugger;
  let modifiedDate = `${moment.created_at.slice(
    0,
    10
  )} ${moment.created_at.slice(11, 16)}`;
  let date = new DateObject(modifiedDate);
  date._format = "MMM D, YYYY - h:mm a";
  const dateFormatted = date.format();

  const handleEdit = (e) => {
    console.log("event -->", e);
    setMoment({ ...moment, content: e });
    startingContent = e;
    editMomentContent(e);
  };

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
              <Editable
                defaultValue={
                  startingContent ? startingContent : "moment is empty"
                }
                isPreviewFocusable={true}
                selectAllOnFocus={false}
                onSubmit={(e) => handleEdit(e)}
              >
                <Tooltip label="Click to edit">
                  <EditablePreview
                    py={2}
                    px={4}
                    _hover={{
                      background: { editBackgroundColor },
                    }}
                  />
                </Tooltip>
                <Input py={2} px={4} as={EditableInput} />
                <EditableControls />
              </Editable>
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
      {/* <FloatingEdit location={location}/> */}
      <FloatingDelete location={location} momentId={moment.id} />
      <br />
      <br />
      <br />
    </>
  );
};

export default SingleMoment;
