import React from "react";
import { useState } from "react";
import { supabase } from "../server/supabaseClient";
import { useNavigate } from "react-router-dom";
import { Button, Input, Textarea } from "@chakra-ui/react";
import MoodSlider from "./Slider";

const AddJournal = () => {
  const [sliderValue, setSliderValue] = useState(50);
  const [journal, setJournal] = useState({
    content: "",
    date: "",
  });
  const { content, vibe, date } = journal;
  let navigate = useNavigate();
  const user = supabase.auth.user();
  
  async function createJournal() {
    try {
      await supabase
        .from("journals")
        .insert({ content, vibe: sliderValue, date, user_id: user.id })
        .single();
      setJournal({ content: "", vibe: 0, date: new Date() });
      // navigate("/journals");
      console.log(journal);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  return (
    <div>
      {/* content input */}
      <Textarea
        value={content}
        onChange={(evt) =>
          setJournal({ ...journal, content: evt.target.value })
        }
        resize="vertical"
        placeholder="write your journal here!"
      />
      {/* date input */}
      <Input
        type="date"
        value={date}
        onChange={(evt) => setJournal({ ...journal, date: evt.target.value })}
      />
      {/* vibe input */}
      <MoodSlider
        sliderValue={sliderValue}
        setSliderValue={setSliderValue}
      />
      <Button
        onClick={() => {
          console.log(journal);
          createJournal();
        }}
        colorScheme="teal"
      >
        submit
      </Button>
    </div>
  );
};

export default AddJournal;
