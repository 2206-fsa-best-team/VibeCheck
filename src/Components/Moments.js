import { useState, useEffect } from "react";
import { supabase } from "../server/supabaseClient";
import AddMoment from "./AddMoment";

const Moments = () => {
  const [moments, setMoments] = useState([]);
  useEffect(() => {
    fetchMoments();
  }, []);

  async function fetchMoments() {
    const { data } = await supabase.from("moments").select();
    setMoments(data);
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
        <AddMoment />
      </div>
    </div>
  );
};

export default Moments;
