import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../../server/supabaseClient";
import { VStack, useToast, Skeleton, Show } from "@chakra-ui/react";
import FloatingDeleteMobile from "../Buttons/FloatingDeleteMobile";
import FloatingDeleteWeb from "../Buttons/FloatingDeleteWeb";
import MomentDetails from "./MomentDetails";
import { DeletedMoment } from "../ToastAlerts/DeleteAlerts";

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
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    async function fetchMoment() {
      try {
        const { data, error } = await supabase
          .from("moments")
          .select()
          .eq("id", momentId)
          .single();
        if (error) throw error;
        let { content, vibe, created_at } = data;
        setMoment({
          ...moment,
          content,
          vibe,
          created_at,
        });
      } catch (error) {
        navigate("/error");
        console.error(error.error_description || error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchMoment();
  }, []);

  async function handleDelete() {
    try {
      const { error } = await supabase
        .from("moments")
        .delete()
        .match({ id: moment.id });
      if (error) throw error;
      navigate("/moments");
      toast(DeletedMoment());
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
      <Skeleton height="60px" />
    </VStack>
  ) : (
    <VStack
      p="5"
      m="16px"
      spacing={"16px"}
      borderRadius="lg"
      alignItems="stretch"
      maxW="lg"
    >
      <MomentDetails
        loading={loading}
        moment={moment}
        setMoment={setMoment}
        setLoading={setLoading}
        location={location}
      />
      <Show above="lg">
        <FloatingDeleteWeb
          location={location}
          id={moment.id}
          onClick={handleDelete}
        />
      </Show>
      <Show below="lg">
        <FloatingDeleteMobile
          location={location}
          id={moment.id}
          onClick={handleDelete}
        />
      </Show>
      <br />
      <br />
      <br />
    </VStack>
  );
};

export default SingleMoment;
