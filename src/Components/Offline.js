import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ChakraProvider, Flex, Heading, Image, Text } from "@chakra-ui/react";

const root = ReactDOM.createRoot(document.getElementById("offline"));
root.render(
  <ChakraProvider>
    <React.StrictMode>
    <Flex alignItems="center" justifyContent='center'>
        <Flex direction='column' background='gray.100' p={12}>
          <Heading mb={6}>Offline</Heading>
          <Text fontSize='lg' fontWeight='bold'>
            Looks like you are offline. Try refreshing the page to continue.
          </Text>
            <Image src='https://www.pngfind.com/pngs/m/299-2991041_memes-para-stickers-png-png-download-surprised-pikachu.png'/>
          </Flex>
        </Flex>
    </React.StrictMode>
  </ChakraProvider>
);
