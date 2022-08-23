import React from "react";
import { useState, useRef } from "react";
import { Camera } from "react-camera-pro";
import { Box, Button, Text } from "@chakra-ui/react";

const Cam = () => {
  const camera = useRef(null);
  const [image, setImage] = useState(null);

  return (
    <div>
      <Box maxW={"500px"} mx={10}>
        {image === null ? (
          <>
            <Camera ref={camera} aspectRatio={8.5 / 11} zIndex={-1} />
            <Button
              onClick={() => setImage(camera.current.takePhoto())}
              colorScheme={"teal"}
            >
              <Text color="black">take photo</Text>
            </Button>{" "}
          </>
        ) : (
          <>
            <img src={image} alt="Taken" />
            <Button onClick={() => setImage(null)} colorScheme={"teal"}>
              <Text color="black">take another photo</Text>
            </Button>
          </>
        )}
      </Box>
    </div>
  );
};

export default Cam;
