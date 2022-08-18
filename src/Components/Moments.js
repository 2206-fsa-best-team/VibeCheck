import { useState, useEffect } from "react";
import { supabase } from "../server/supabaseClient";

const Moments = () => {
  const [moments, setMoments] = useState([]);
  useEffect(() => {
    fetchMoments();
  }, []);

  async function fetchMoments() {
    const { data } = await supabase.from("moments").select();
    setMoments(data);
    console.log("data:", data);
  }

  return (
    <div className="App">
      <div>
        {moments.map((moment) => (
          <div key={moment.id}>
            <p>{moment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Moments;
