import React from "react";
import { useState } from "react";
import { supabase } from "../server/supabaseClient";
import { useNavigate } from "react-router-dom";
import MoodSlider from "./Slider";

const AddMoment = () => {
  const [moment, setMoment] = useState({ content: "", vibe: 0 });
  const { content, vibe } = moment;
  let navigate = useNavigate();
  const user = supabase.auth.user();

  async function createMoment() {
    try {
      await supabase
        .from("moments")
        .insert({ content, vibe, user_id: user.id })
        .single();
      setMoment({ content: "", vibe: 0 });
      navigate("/moments");
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  return (
    <div>
      <input
        value={content || ""}
        onChange={(evt) => setMoment({ ...moment, content: evt.target.value })}
      />
      <input
        value={vibe || 0}
        onChange={(evt) => setMoment({ ...moment, vibe: evt.target.value })}
      />
      <MoodSlider />
      <button onClick={createMoment}>Submit</button>
    </div>
  );
};
export default AddMoment;
