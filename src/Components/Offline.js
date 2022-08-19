import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ChakraProvider, Flex, Heading, Box, Image, Text } from "@chakra-ui/react";

const root = ReactDOM.createRoot(document.getElementById("offline"));
root.render(
  <ChakraProvider>
    <React.StrictMode>
      <Flex height="100vh" alignItems="center" justifyContent='center'>
        <Flex direction='column' background='gray.100' p={12}>
          <Heading mb={6}>Offline</Heading>
          <Text fontSize='lg' fontWeight='bold'>
            Looks like you're offline. Please check your internet connection and/or refresh the screen.
          </Text>
          <Box boxSize='md'>
            <Image src='https://www.pngfind.com/pngs/m/299-2991041_memes-para-stickers-png-png-download-surprised-pikachu.png'/>
          </Box>
        </Flex>
      </Flex>
    </React.StrictMode>
  </ChakraProvider>
);
