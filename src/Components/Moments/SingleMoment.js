import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../server/supabaseClient";
import { VStack } from "@chakra-ui/react";
import FloatingDelete from "../Buttons/FloatingDelete";
import MomentCard from "./MomentCard";

const SingleMoment = (props) => {
  const { momentId } = useParams();
  const [moment, setMoment] = useState({
    id: momentId,
    content: "",
    vibe: null,
    created_at: Date(),
  });
  const [loading, setLoading] = useState(true);
  const location = "moment";

  useEffect(() => {
    // i don't know if there will ever be props?
    if (props.moment) {
      let { content, vibe, created_at } = props.moment;
      initializeMoment(content, vibe, created_at);
    } else {
      fetchMoment();
    }
  }, []);

  function initializeMoment(content, vibe, created_at) {
    setMoment({
      ...moment,
      content,
      vibe,
      created_at,
    });
  }

  async function fetchMoment() {
    try {
      const { data, error } = await supabase
        .from("moments")
        .select()
        .eq("id", momentId)
        .single();
      if (error) throw error;
      let { content, vibe, created_at } = data;
      initializeMoment(content, vibe, created_at);
    } catch (error) {
      console.error(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <VStack
      p="5"
      m="16px"
      spacing={"16px"}
      borderRadius="lg"
      alignItems="stretch"
      maxW="700px"
    >
      <MomentCard
        loading={loading}
        moment={moment}
        setMoment={setMoment}
        setLoading={setLoading}
        location={location}
      />
      <FloatingDelete location={location} momentId={moment.id} />
      <br />
      <br />
      <br />
    </VStack>
  );
};

export default SingleMoment;
