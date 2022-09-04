import React from "react";
import { useState, useRef } from "react";
import Webcam from "react-webcam";
import { Box, Button, CircularProgress, Text, VStack } from "@chakra-ui/react";
import axios from "axios";

const Cam = (props) => {
  const camera = useRef(null);
  const [image, setImage] = useState(null);
  const { setAllText, modalLoading, setModalLoading, value } = props;
  async function handleSubmit(img) {
    try {
      setModalLoading(true);
      const body = { img };
      const { data } = await axios.post("/", body);
      if (data.fullTextAnnotation) {
        setAllText(data.fullTextAnnotation);
      } else {
        alert(
          `there has been an error. likely this means no text could
  be deciphered from your photo. please try again with a new
  photo. if that doesn't work we are likely experiencing a
  server error! we appologize for the inconvenience if so`
        );
        setModalLoading(false);
      }
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
      <Box maxW="450px" mx={10} align="center">
        <Text
          pb="10px"
          ml="8px"
          fontSize="32px"
          fontStyle="italic"
          align="start"
        >
          snap a pic of your journal!
        </Text>
        {image === null ? (
          <>
            <Webcam
              ref={camera}
              forceScreenshotSourceSize
              videoConstraints={{
                facingMode: "environment",
              }}
            />
            <br />
            <Button
              onClick={() => setImage(camera.current.getScreenshot())}
              colorScheme="teal"
              aria-label="take photo button"
            >
              <Text>take photo</Text>
            </Button>
          </>
        ) : (
          <VStack align="center">
            <img src={image} alt="Taken" />
            <br />
            <Button
              onClick={() => {
                setImage(null);
              }}
              colorScheme={"teal"}
              mr={10}
              variant="outline"
              aria-label="take another photo button"
            >
              <Text>take another photo</Text>
            </Button>
            {modalLoading ? (
              <CircularProgress isIndeterminate size="1.75rem" color="tomato" />
            ) : (
              <Button
                onClick={() => handleSubmit(image)}
                colorScheme={"teal"}
                aria-label="convert to text button"
              >
                <Text>{value ? "add to entry" : "convert to text"}</Text>{" "}
              </Button>
            )}
          </VStack>
        )}
      </Box>
    </div>
  );
};

export default Cam;
