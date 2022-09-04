import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  ChakraProvider,
  Flex,
  Heading,
  HStack,
  Icon,
  Text
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import {TbLetterB, TbLetterE, TbLetterI, TbLetterV} from 'react-icons/tb'

const root = ReactDOM.createRoot(document.getElementById("offline"));
root.render(
  <ChakraProvider>
    <React.StrictMode>
      <Flex alignItems="center" justifyContent="center">
        <Flex direction="column" background="gray.100" p={12}>
          <Heading mb={6}>Offline</Heading>
          <Text fontSize="lg" fontWeight="bold">
            Looks like you are offline. Try refreshing the page to continue.
          </Text>
          <Link to="/">
            <HStack align="center" justify="center">
              <Icon
                variant="ghost"
                color={'tomato'}
                aria-label="V"
                w={16}
                h={16}
                as={TbLetterV}
              />
              <Icon
                variant="ghost"
                color={'tomato'}
                aria-label="V"
                w={16}
                h={16}
                as={TbLetterI}
              />
              <Icon
                variant="ghost"
                color={'tomato'}
                aria-label="V"
                w={16}
                h={16}
                as={TbLetterB}
              />
              <Icon
                variant="ghost"
                color={'tomato'}
                aria-label="V"
                w={16}
                h={16}
                as={TbLetterE}
              />
            </HStack>
          </Link>
        </Flex>
      </Flex>
    </React.StrictMode>
  </ChakraProvider>
);
