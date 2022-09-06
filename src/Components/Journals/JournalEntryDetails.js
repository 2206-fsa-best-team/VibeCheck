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
  Tooltip,
  Show,
  Hide,
  useColorModeValue,
  useBreakpointValue,
} from "@chakra-ui/react";
import { colorSelector } from "../Helpers/colorChanger";
import DateObject from "react-date-object";
import FloatingEditMobile from "../Buttons/FloatingEditMobile";
import FloatingEditWeb from "../Buttons/FloatingEditWeb";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { vibeMsgSelector } from "../Helpers/vibeMsgSelector";
import wordsCount from "words-count";
import TextareaAutosize from "react-textarea-autosize";
import { InfoOutlineIcon } from "@chakra-ui/icons";

let startingContent = "";

const JournalEntryDetails = ({
  journalEntry,
  setJournalEntry,
  setLoading,
  location,
}) => {
  const { journalEntryId } = useParams();

  useEffect(() => {
    startingContent = journalEntry.content;
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
    editJournalEntryContent(newValue);
  };

  const handleCancel = () => {
    setJournalEntry({ ...journalEntry, content: startingContent });
  };

  const handleChange = (e) => {
    setJournalEntry({ ...journalEntry, content: e.target.value });
  };

  // component for word count
  const wordCountAlign = useBreakpointValue({
    base: "left",
    lg: "right",
  });

  function WordCount() {
    return (
      <Flex flexGrow={1}>
        <Text
          fontSize="0.75rem"
          color={useColorModeValue("gray", "lightgray")}
          w="100%"
          align={wordCountAlign}
          p="16px"
        >
          word count: {wordsCount(journalEntry.content)}
        </Text>
      </Flex>
    );
  }

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
    ) : journalEntryId ? (
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

      <HStack
        justifyContent="space-between"
        borderLeft={journalEntryId ? "solid" : ""}
        borderLeftWidth={journalEntryId ? 4 : 0}
        borderLeftColor={() => colorSelector(journalEntry.vibe).border}
      >
        <Flex flexGrow={2} direction="column">
          <HStack justifyContent={"flex-start"}>
            <Text
              fontSize="0.75rem"
              fontStyle="italic"
              color={useColorModeValue("gray", "lightgray")}
              align="left"
              pl="16px"
            >
              you were {vibeMsgSelector(journalEntry.vibe)}: {journalEntry.vibe}
            </Text>
            <Tooltip
              hasArrow
              label="the feeling you reported when you wrote your entry"
              fontSize="sm"
              placement="top"
            >
              <InfoOutlineIcon fontSize={"0.75rem"} />
            </Tooltip>
          </HStack>
          <HStack justifyContent={"flex-start"}>
            <Text
              fontSize="0.75rem"
              fontStyle="italic"
              color={useColorModeValue("gray", "lightgray")}
              align="left"
              pl="16px"
            >
              senitment analysis: {journalEntry.sentiment}
            </Text>
            <Tooltip
              hasArrow
              label="ai-generated analysis of your jounral entry content"
              fontSize="sm"
              placement="top"
            >
              <InfoOutlineIcon fontSize={"0.75rem"} />
            </Tooltip>
          </HStack>
          <Show below={"lg"}>
            <WordCount />
          </Show>
        </Flex>
        <Hide below={"lg"}>
          <Flex flexGrow={1}>
            <WordCount />
          </Flex>
        </Hide>
      </HStack>
    </Box>
  );
};

export default JournalEntryDetails;
