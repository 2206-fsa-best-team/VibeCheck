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
    <Box px={4} maxW={"320px"}>
      <Flex direction={"column"}>
        {moments.map((moment) => (
          <div key={moment.id}>
            <Box py={2} borderBottom="1px" borderColor={"gray.100"}>
              {moment.content}
            </Box>
          </div>
        ))}
      </Flex>
    </Box>
  );
};

export default Moments;
