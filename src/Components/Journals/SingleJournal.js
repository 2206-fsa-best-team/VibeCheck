import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../../server/supabaseClient";
import {
  VStack,
  HStack,
  Skeleton,
  Button,
  ButtonGroup,
  Show,
  Box,
  Flex,
  useEditableControls,
  Editable,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import FloatingDelete from "../Buttons/FloatingDelete";
import FloatingDeleteLarge from "../Buttons/FloatingDeleteLarge";
import JournalEntryDetails from "./JournalEntryDetails";

const SingleJournal = (props) => {
  const { journalEntryId } = useParams();
  const [journalEntry, setJournalEntry] = useState({
    id: journalEntryId,
    content: "",
    vibe: null,
    date: Date(),
  });
  const [loading, setLoading] = useState(true);
  const location = "journal entry";
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchJournalEntry() {
      try {
        const { data, error } = await supabase
          .from("journals")
          .select()
          .eq("id", journalEntryId)
          .single();
        if (error) throw error;
        let { content, vibe, date } = data;
        setJournalEntry({
          ...journalEntry,
          content,
          vibe,
          date,
        });
      } catch (error) {
        console.error(error.error_description || error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchJournalEntry().then(console.log("journalEntry", journalEntry));
  }, []);

  async function handleDelete() {
    try {
      const { error } = await supabase
        .from("journals")
        .delete()
        .match({ id: journalEntry.id });
      if (error) throw error;
      navigate("/journals");
    } catch (error) {
      console.error(error.error_description || error.message);
    }
  }

  return loading ? (
    <VStack
      p="5"
      m="16px"
      spacing={"16px"}
      borderRadius="lg"
      alignItems="stretch"
      maxW="700px"
    >
      <Skeleton height="100px" />
    </VStack>
  ) : (
    // <HStack alignItems="stretch" flexDirection="row">
    <VStack
      p="5"
      m="16px"
      spacing={"16px"}
      borderRadius="lg"
      alignItems="stretch"
      w={["vw", "70vw"]}
    >
      <JournalEntryDetails
        loading={loading}
        journalEntry={journalEntry}
        setJournalEntry={setJournalEntry}
        setLoading={setLoading}
        location={location}
      />
      <Show above="lg">
        <FloatingDeleteLarge
          location={location}
          id={journalEntry.id}
          onClick={handleDelete}
        />
      </Show>
      <Show below="lg">
        <FloatingDelete
          location={location}
          id={journalEntry.id}
          onClick={handleDelete}
        />
      </Show>
      <br />
      <br />
      <br />
    </VStack>
    // {/* <Show above="lg">
    // <VStack p="5" m="16px" alignItems="stretch">
    // <Button leftIcon={<EditIcon />}>edit</Button>
    // <Button leftIcon={<DeleteIcon />} onClick={handleDelete}>
    // delete
    // </Button>
    // </VStack>
    // </Show> */}
    // {/* </HStack> */}
  );
};

export default SingleJournal;
