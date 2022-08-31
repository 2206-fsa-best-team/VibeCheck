import { useEffect, useState } from "react";
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
} from "@chakra-ui/react";
import DateObject from "react-date-object";
import FloatingEdit from "../Buttons/FloatingEdit";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { vibeMsgSelector } from "../Helpers/vibeMsgSelector";
import wordsCount from "words-count";

let startingContent = "";

const JournalEntryDetails = ({
  journalEntry,
  setJournalEntry,
  setLoading,
  location,
}) => {
  const [count, setCount] = useState(journalEntry.content.length);
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
  // console.log("created_at", journalEntry.created_at);
  let modifiedDate = `${journalEntry.created_at.slice(
    0,
    10
  )} ${journalEntry.created_at.slice(11, 16)}`;
  let date = new DateObject(modifiedDate);
  date._format = "MMM D, YYYY - h:mm a";
  const dateFormatted = date.format();

  const handleEdit = (newValue) => {
    setJournalEntry({ ...journalEntry, content: newValue });
    startingContent = newValue;
    editJournalEntryContent(newValue);
  };

  const handleCancel = () => {
    setCount(startingContent.length);
    setJournalEntry({ ...journalEntry, content: startingContent });
  };

  const handleChange = (e) => {
    setCount(e.target.value.length);
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
        <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
        <IconButton
          icon={<CloseIcon boxSize={3} />}
          {...getCancelButtonProps()}
        />
      </ButtonGroup>
    ) : journalEntryId ? (
      <FloatingEdit location={location} {...getEditButtonProps()} />
    ) : (
      <></>
    );
  }

  return (
    <>
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
          pt={2}
          px={4}
          overflowWrap="anywhere"
          noOfLines={[8]}
        />
        <EditableTextarea
          // style this so the border isn't so huge
          w="100%"
          py={2}
          px={4}
          resize="none"
          onChange={(e) => handleChange(e)}
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
    </>
  );
};

export default JournalEntryDetails;
