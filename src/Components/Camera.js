import React from "react";
import { useState, useRef } from "react";
import Webcam from "react-webcam";
import { Box, Button, Text } from "@chakra-ui/react";
import axios from "axios";

const Cam = () => {
  const camera = useRef(null);
  const [image, setImage] = useState(null);

  async function handleSubmit(img) {
    try {
      const body = { img };
      const { data } = await axios.post("/", body);
      console.log(data.fullTextAnnotation.text);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div>
      <Box maxW="450px" mx={10}>
        <Text py="10px" ml="8px" fontSize="32px" fontStyle="italic">
          snap a pic!
        </Text>
        {image === null ? (
          <>
            <Webcam ref={camera} screenshotQuality={1} />
            <Button
              onClick={() => setImage(camera.current.getScreenshot())}
              colorScheme="teal"
            >
              <Text color="black">take photo</Text>
            </Button>
          </>
        ) : (
          <>
            <img src={image} alt="Taken" />
            <Button onClick={() => setImage(null)} colorScheme={"teal"}>
              <Text color="black">take another photo</Text>
            </Button>
            <Button onClick={() => handleSubmit(image)} colorScheme={"teal"}>
              <Text color="black">convert to text</Text>
            </Button>
          </>
        )}
      </Box>
    </div>
  );
};

export default Cam;
