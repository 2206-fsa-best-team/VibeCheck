import React,{ useState, useEffect} from "react";
import { supabase } from "../server/supabaseClient";
import { useNavigate } from "react-router-dom";
import MoodSlider from "./Slider";
import { Container, VStack, Button, Skeleton } from "@chakra-ui/react";

const AddMoment = () => {
  const [moment, setMoment] = useState({ content: "", vibe: 0 });
  const { content, vibe } = moment;
  const [pageLoading, setPageLoading] = useState(false);
  let navigate = useNavigate();
  const user = supabase.auth.user();
  const SliderValue = 50

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

  useEffect(() => {
    setPageLoading(true);
    console.log(moment)
    setPageLoading(false);
  }, [moment]);

  return (
    <Container align='center' display={'flex'}bg='blue' pt='36px'>
      {pageLoading ? (
        <>
          <Skeleton h="20px" />
          <Skeleton h="20px" />
        </>
      ) : (
        <VStack  w='36rem' bg='red'>
          <input
            value={content || ""}
            onChange={(evt) =>
              setMoment({ ...moment, content: evt.target.value })
            }
          />
          {/* <input
            value={vibe || 0}
            onChange={(evt) => setMoment({ ...moment, vibe: evt.target.value })}
          /> */}
          <MoodSlider SliderValue={SliderValue} onChange={(evt) => setMoment({ ...moment, vibe: evt.target.value })} />
          <Button onClick={createMoment} >Submit</Button>
        </VStack>
      )}
    </Container>
  );
};
export default AddMoment;

// redux for getting the slider state
