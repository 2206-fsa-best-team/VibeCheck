import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../server/supabaseClient";
import {
  HStack,
  Text,
  Heading,
  EditablePreview,
  IconButton,
  ButtonGroup,
  useEditableControls,
  Editable,
  EditableTextarea,
  Flex,
  Box,
} from "@chakra-ui/react";
import DateObject from "react-date-object";
import FloatingEdit from "../Buttons/FloatingEdit";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { vibeMsgSelector } from "../Helpers/vibeMsgSelector";
import wordsCount from "words-count";
import TextareaAutosize from "react-textarea-autosize";

let startingContent = "";

const JournalEntryDetails = ({
  journalEntry,
  setJournalEntry,
  setLoading,
  location,
}) => {
  const { journalEntryId } = useParams();
  console.log("startingContent TOP -->", startingContent);
  console.log("journalEntry TOP -->", journalEntry);

  useEffect(() => {
    console.log("startingContent useEffect before -->", startingContent);
    startingContent = journalEntry.content;
    console.log("startingContent useEffect after -->", startingContent);
  }, []);

  async function editJournalEntryContent(e) {
    try {
      const { error } = await supabase
        .from("journals")
        .update({ content: e })
        .eq("id", journalEntry.id);

      if (error) throw error;
    } catch (error) {
      console.error(error.error_description || error.message);
    } finally {
      // do we need this?
      setLoading(false);
    }
  }

  // format date from the db for how we want it displayed
  let date = new DateObject(journalEntry.date);
  date._format = "MMM D, YYYY";
  const dateFormatted = date.format();

  const handleEdit = (newValue) => {
    setJournalEntry({ ...journalEntry, content: newValue });
    startingContent = newValue;
    console.log("startingContent handleEdit -->", startingContent);
    editJournalEntryContent(newValue);
  };

  const handleCancel = () => {
    console.log("startingContent handleCancel -->", startingContent);
    setJournalEntry({ ...journalEntry, content: startingContent });
  };

  const handleChange = (e) => {
    setJournalEntry({ ...journalEntry, content: e.target.value });
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
        <IconButton
          icon={<CheckIcon />}
          {...getSubmitButtonProps()}
          onClick={window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
          })}
        />
        <IconButton
          icon={<CloseIcon boxSize={3} />}
          {...getCancelButtonProps()}
        />
      </ButtonGroup>
    ) : journalEntryId ? (
      <FloatingEdit location={location} {...getEditButtonProps()} />
    ) : null;
  }

  return (
    <Box>
      <Heading fontSize="1rem" w="100%" align="left" p="16px">
        {dateFormatted.toLowerCase()}
      </Heading>
      <Editable
        w="100%"
        align="left"
        defaultValue={journalEntry.content}
        placeholder="journalEntry is empty"
        value={journalEntry.content}
        isPreviewFocusable={false}
        selectAllOnFocus={false}
        onSubmit={(newvalue) => handleEdit(newvalue)}
        onCancel={() => handleCancel()}
      >
        <EditablePreview
          w="100%"
          pt={2}
          px={4}
          resize="none"
          overflowWrap="anywhere"
          whiteSpace="pre-wrap"
          noOfLines={journalEntryId ? undefined : [8]}
        />
        <EditableTextarea
          w="100%"
          py={2}
          px={4}
          resize="none"
          transition="height none"
          onChange={(e) => handleChange(e)}
          as={TextareaAutosize}
        />
        <EditableControls />
      </Editable>

      <HStack justifyContent="space-between">
        <Flex flexGrow={2}>
          <Text
            fontSize="0.75rem"
            fontStyle="italic"
            w="100%"
            align="left"
            px="16px"
          >
            you were {vibeMsgSelector(journalEntry.vibe)}
          </Text>
        </Flex>
        <Flex flexGrow={1}>
          <Text fontSize="0.75rem" color="gray" w="100%" align="right" p="16px">
            word count: {wordsCount(journalEntry.content)}
          </Text>
        </Flex>
      </HStack>
    </Box>
  );
};

export default JournalEntryDetails;
