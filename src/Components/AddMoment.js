import React from "react";
import { useState } from "react";
import { supabase } from "../server/supabaseClient";
import { useNavigate } from "react-router-dom";

const AddMoment = () => {
  const [moment, setMoment] = useState([{ content: "", vibe: "" }]);
  const { content, vibe } = moment;
  let navigate = useNavigate()

  async function createMoment() {
    await supabase.from("moments").insert([{ content, vibe }]).single();
    setMoment({ content: "", vibe: 0 });
    navigate("/moments")
  }

  return (
    <div>
      <input
        value={content || ''}
        onChange={(evt) => setMoment({ ...moment, content: evt.target.value })}
      />
      <input
        value={vibe || ''}
        onChange={(evt) => setMoment({ ...moment, vibe: evt.target.value })}
      />
      <button onClick={createMoment}>Submit</button>
    </div>
  );
};
export default AddMoment;
