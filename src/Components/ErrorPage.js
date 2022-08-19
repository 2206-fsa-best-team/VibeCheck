import React from "react";
import {Flex, Heading, Text, Box, Image} from '@chakra-ui/react'

const ErrorPage=()=> {
  return (
    <Flex alignItems="center" justifyContent='center'>
        <Flex direction='column' background='gray.100' p={12}>
          <Heading mb={6}>Offline</Heading>
          <Text fontSize='lg' fontWeight='bold'>
            Looks like you're offline. Please check your internet connection and/or refresh the screen.
          </Text>
            <Image src='https://www.pngfind.com/pngs/m/299-2991041_memes-para-stickers-png-png-download-surprised-pikachu.png'/>
          </Flex>
        </Flex>
  )
}
export default ErrorPage
