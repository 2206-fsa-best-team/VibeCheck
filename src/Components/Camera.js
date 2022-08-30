import React from "react";
import { useState, useRef } from "react";
import Webcam from "react-webcam";
import { Box, Button, CircularProgress, Text } from "@chakra-ui/react";
import axios from "axios";

const Cam = (props) => {
  const camera = useRef(null);
  const [image, setImage] = useState(null);
  const { setAllText, modalLoading, setModalLoading } = props;
  async function handleSubmit(img) {
    try {
      setModalLoading(true);
      const body = { img };
      const { data } = await axios.post("/", body);
      setAllText(data.fullTextAnnotation);
    } catch (e) {
      console.error(e);
      alert(
        `there has been an error. likely this means no text could 
be deciphered from your photo. please try again with a new 
photo. if that doesn't work we are likely experiencing a 
server error! we appologize for the inconvenience if so`
      );
      setModalLoading(false);
    }
  }

  return (
    <div>
      <Box maxW="450px" mx={10}>
        <Text pb="10px" ml="8px" fontSize="32px" fontStyle="italic">
          snap a pic of your journal!
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
            <Button
              onClick={() => {
                setImage(null);
              }}
              colorScheme={"teal"}
              mr={10}
            >
              <Text color="black">retake photo</Text>
            </Button>
            {modalLoading ? (
              <CircularProgress isIndeterminate size="1.75rem" color="tomato" />
            ) : (
              <Button onClick={() => handleSubmit(image)} colorScheme={"teal"}>
                <Text color="black">convert to text</Text>{" "}
              </Button>
            )}
          </>
        )}
      </Box>
    </div>
  );
};

export default Cam;
