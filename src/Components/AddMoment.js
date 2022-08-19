import React from "react";
import { useState, useEffect } from "react";
import { supabase } from "../server/supabaseClient";

const AddMoment = () => {
  const [moments, setMoments] = useState([]);
  const [moment, setMoment] = useState([{ content: "", vibe: 0 }]);
  const { content, vibe } = moment;
  useEffect(() => {
    fetchMoments();
  }, []);

  async function fetchMoments() {
    const { data } = await supabase.from("moments").select();
    setMoments(data);
  }

  async function createMoment() {
    await supabase.from("moments").insert([{ content, vibe }]).single();
    setMoment({ content: "", vibe: 0 });
    fetchMoments();
  }

  return (
    <div>
      <input
        value={content}
        onChange={(evt) => setMoment({ ...moment, content: evt.target.value })}
      />
      <input
        value={vibe}
        onChange={(evt) => setMoment({ ...moment, vibe: evt.target.value })}
      />
      <button onClick={createMoment}>Submit</button>
    </div>
  );
};
export default AddMoment;
