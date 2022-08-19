import React from "react";
import {Flex, Heading, Text, Image} from '@chakra-ui/react'
import { Link } from "react-router-dom";

const ErrorPage=()=> {
  return (
    <Flex alignItems="center" justifyContent='center'>
        <Flex direction='column' background='gray.100' p={12}>
          <Heading mb={6}>404 Not Found</Heading>
          <Text fontSize='lg' fontWeight='bold'>
            Looks like we can't find what you're looking for. Please click the Pikachu to head home.
          </Text>
          <Link to='/home'>
            <Image src='https://www.pngfind.com/pngs/m/299-2991041_memes-para-stickers-png-png-download-surprised-pikachu.png'/>
            </Link>
          </Flex>
        </Flex>
  )
}
export default ErrorPage
