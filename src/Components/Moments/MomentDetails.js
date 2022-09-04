import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../server/supabaseClient";
import {
  HStack,
  Text,
  EditablePreview,
  IconButton,
  ButtonGroup,
  useEditableControls,
  Editable,
  EditableTextarea,
  Flex,
  Tooltip,
  Show,
  useColorModeValue,
} from "@chakra-ui/react";
import DateObject from "react-date-object";
import FloatingEditMobile from "../Buttons/FloatingEditMobile";
import FloatingEditWeb from "../Buttons/FloatingEditWeb";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { vibeMsgSelector } from "../Helpers/vibeMsgSelector";
import TextareaAutosize from "react-textarea-autosize";

let startingContent = "";

const MomentDetails = ({ moment, setMoment, setLoading, location }) => {
  const [count, setCount] = useState(moment.content.length);
  const { momentId } = useParams();
  const subtextColor = useColorModeValue("gray.700", "gray.300");

  useEffect(() => {
    startingContent = moment.content;
  }, []);

  async function editMomentContent(e) {
    try {
      const { error } = await supabase
        .from("moments")
        .update({ content: e })
        .eq("id", moment.id);

      if (error) throw error;
    } catch (error) {
      console.error(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  }

  // format date from the db for how we want it displayed
  let modifiedDate = `${moment.created_at.slice(
    0,
    10
  )} ${moment.created_at.slice(11, 16)}`;
  let date = new DateObject(modifiedDate);
  date._format = "MMM D, YYYY - h:mm a";
  const dateFormatted = date.format();

  const handleEdit = (newValue) => {
    setMoment({ ...moment, content: newValue });
    startingContent = newValue;
    editMomentContent(newValue);
  };

  const handleCancel = () => {
    setCount(startingContent.length);
    setMoment({ ...moment, content: startingContent });
  };

  const handleChange = (e) => {
    setCount(e.target.value.length);
    setMoment({ ...moment, content: e.target.value });
  };

  //// additional elements for editing
  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent="end" size="sm" w="full" spacing={2} mt={2}>
        <Tooltip
          label="submit your edits"
          placement="left"
          aria-label="tooltip for submitting an edit"
        >
          <IconButton
            icon={<CheckIcon />}
            {...getSubmitButtonProps()}
            aria-label="button to submit edits"
          />
        </Tooltip>
        <Tooltip
          label="cancel your edits"
          placement="right"
          aria-label="tooltip for canceling an edit"
        >
          <IconButton
            icon={<CloseIcon boxSize={3} />}
            {...getCancelButtonProps()}
            aria-label="button to cancel edits"
          />
        </Tooltip>
      </ButtonGroup>
    ) : momentId ? (
      <>
        <Show above="lg">
          <FloatingEditWeb location={location} {...getEditButtonProps()} />
        </Show>
        <Show below="lg">
          <FloatingEditMobile location={location} {...getEditButtonProps()} />
        </Show>
      </>
    ) : null;
  }

  return (
    <>
      <Editable
        w="100%"
        align="left"
        defaultValue={moment.content}
        placeholder="moment is empty"
        value={moment.content}
        isPreviewFocusable={false}
        selectAllOnFocus={false}
        onSubmit={(newvalue) => handleEdit(newvalue)}
        onCancel={() => handleCancel()}
      >
        <EditablePreview
          py={2}
          px={4}
          resize="none"
          overflowWrap="anywhere"
          whiteSpace="pre-wrap"
        />
        <EditableTextarea
          w="100%"
          py={2}
          px={4}
          resize="none"
          transition="height none"
          maxLength={260}
          onChange={(e) => handleChange(e)}
          as={TextareaAutosize}
        />
        <EditableControls />
      </Editable>
      <Text
        fontSize="0.75rem"
        fontStyle="italic"
        w="100%"
        align="left"
        px="16px"
        pt={2}
        color={subtextColor}
      >
        you were {vibeMsgSelector(moment.vibe)}
      </Text>
      <HStack justifyContent="space-between" px="16px" pb={2}>
        <Flex flexGrow={2}>
          <Text fontSize="0.75rem" w="100%" align="left" color={subtextColor}>
            {dateFormatted.toLowerCase()}
          </Text>
        </Flex>
        <Flex flexGrow={1}>
          {momentId ? (
            <Text
              fontSize="0.75rem"
              w="100%"
              align="right"
              color={subtextColor}
            >
              {count}/260
            </Text>
          ) : null}
        </Flex>
      </HStack>
    </>
  );
};

export default MomentDetails;
