import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../server/supabaseClient";
import {
  VStack,
  HStack,
  Text,
  Box,
  Skeleton,
  Stack,
  EditablePreview,
  IconButton,
  ButtonGroup,
  useEditableControls,
  Editable,
  EditableInput,
  EditableTextarea,
  Textarea,
} from "@chakra-ui/react";
import DateObject from "react-date-object";
import FloatingEdit from "../Buttons/FloatingEdit";
import FloatingDelete from "../Buttons/FloatingDelete";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";

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
    ) : (
      <FloatingEdit location={location} {...getEditButtonProps()} />
    );
  }

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
  // console.log("created_at", moment.created_at);
  let modifiedDate = `${moment.created_at.slice(
    0,
    10
  )} ${moment.created_at.slice(11, 16)}`;
  let date = new DateObject(modifiedDate);
  date._format = "MMM D, YYYY - h:mm a";
  const dateFormatted = date.format();

  const handleEdit = (e) => {
    // may want to rename 'e' to 'newContent' or something
    setMoment({ ...moment, content: e });
    startingContent = e;
    editMomentContent(e);
  };

  // const onEnterPress = (e) => {
  //   if (e.keyCode === 13 && e.shiftKey === false) {
  //     e.preventDefault();
  //     console.log("we are here");
  //     handleEdit(e);
  //   }
  // };

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
              <Editable
                // borderColor="white"
                // borderWidth={1}
                w="100%"
                align="left"
                defaultValue={
                  startingContent ? startingContent : "moment is empty"
                }
                isPreviewFocusable={false}
                selectAllOnFocus={false}
                onSubmit={(e) => handleEdit(e)}
              >
                <EditablePreview py={2} px={4} />
                <EditableTextarea
                  w="100%"
                  py={2}
                  px={4}
                  resize="none"
                  rows={8}
                  maxLength={260}
                  isInvalid
                  // onKeyDown={onEnterPress}
                  // overflowWrap="break-word"
                  // as={Textarea}
                />
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
      <FloatingDelete location={location} momentId={moment.id} />
      <br />
      <br />
      <br />
    </>
  );
};

export default SingleMoment;
