import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../../server/supabaseClient";
import { VStack, Skeleton } from "@chakra-ui/react";
import FloatingDelete from "../Buttons/FloatingDelete";
import JournalEntryCard from "./JournalEntryCard";
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
        .from("moments")
        .delete()
        .match({ id: journalEntry.id });
      if (error) throw error;
      navigate("/moments");
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
    <VStack
      p="5"
      m="16px"
      spacing={"16px"}
      borderRadius="lg"
      alignItems="stretch"
      maxW="700px"
    >
      <JournalEntryDetails
        loading={loading}
        journalEntry={journalEntry}
        setJournalEntry={setJournalEntry}
        setLoading={setLoading}
        location={location}
      />
      <FloatingDelete
        location={location}
        id={journalEntry.id}
        onClick={handleDelete}
      />
      <br />
      <br />
      <br />
    </VStack>
  );
};

export default SingleJournal;
