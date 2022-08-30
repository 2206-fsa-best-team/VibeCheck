import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../server/supabaseClient";
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
  const [count, setCount] = useState();
  const [loading, setLoading] = useState(true);
  const location = "moment";

  useEffect(() => {
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
    setCount(content.length);
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
    <>
      <MomentCard
        loading={loading}
        moment={moment}
        setMoment={setMoment}
        count={count}
        setCount={setCount}
        setLoading={setLoading}
        location={location}
      />
      <FloatingDelete location={location} momentId={moment.id} />
      <br />
      <br />
      <br />
    </>
  );
};

export default SingleMoment;
