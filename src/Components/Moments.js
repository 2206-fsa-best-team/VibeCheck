import { useState, useEffect } from "react";
import { supabase } from "../server/supabaseClient";
import FloatingAdd from "./FloatingAdd";

const Moments = (props) => {
  const [moments, setMoments] = useState([]);
  const [moment, setMoment] = useState([{ content: "", vibe: 0 }]);
  const { content, vibe } = moment;
  useEffect(() => {
    fetchMoments();
  }, []);
  const location = 'moment'

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
      <div className="App">
        <div>
          {moments.map((moment) => (
            <div key={moment.id}>
              <p>{moment.content}</p>
            </div>
          ))}
        </div>
      </div>
      <input
        value={content}
        onChange={(evt) => setMoment({ ...moment, content: evt.target.value })}
      />
      <input
        value={vibe}
        onChange={(evt) => setMoment({ ...moment, vibe: evt.target.value })}
      />
      <button onClick={createMoment}>Submit</button>
      <FloatingAdd location={location}/>
    </div>
  );
};

export default Moments;
