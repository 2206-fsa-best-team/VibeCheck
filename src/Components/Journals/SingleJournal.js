import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../../server/supabaseClient";
import { useToast, VStack, Skeleton, Show, useDisclosure } from "@chakra-ui/react";
import FloatingDeleteMobile from "../Buttons/FloatingDeleteMobile";
import FloatingDeleteWeb from "../Buttons/FloatingDeleteWeb";
import JournalEntryDetails from "./JournalEntryDetails";
import { DeletedJournal } from "../ToastAlerts/DeleteAlerts";
import DeleteModal from "../Buttons/DeleteModal";

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
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

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
        navigate("/error");
        console.error(error.error_description || error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchJournalEntry();
  }, []);

  async function handleDelete() {
    try {
      const { error } = await supabase
        .from("journals")
        .delete()
        .match({ id: journalEntry.id });
      if (error) throw error;
      navigate("/journals");
      toast(DeletedJournal());
    } catch (error) {
      console.error(error.error_description || error.message);
    }
  }

  return loading ? (
    <VStack
      p="5"
      m="16px"
      spacing={"16px"}
      alignItems="stretch"
      w={["vw", "70vw"]}
    >
      <Skeleton height="50vh" borderRadius="lg" />
    </VStack>
  ) : (
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
        <FloatingDeleteWeb
          location={location}
          id={journalEntry.id}
          onClick={onOpen}
        />
      </Show>
      <Show below="lg">
        <FloatingDeleteMobile
          location={location}
          id={journalEntry.id}
          onClick={onOpen}
        />
      </Show>
      <DeleteModal location={location} onClose={onClose} isOpen={isOpen} handleDelete={handleDelete}/>
      <br />
      <br />
      <br />
    </VStack>
  );
};

export default SingleJournal;
