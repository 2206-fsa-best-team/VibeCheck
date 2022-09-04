import React from "react";
import {
  Box,
  Container,
  Text,
  Image,
  HStack,
  Icon,
  Link,
} from "@chakra-ui/react";
import { AiFillLinkedin, AiOutlineMail, AiFillGithub } from "react-icons/ai";

const AboutSingle = ({ person }) => {
  return (
    <Container px={"16px"} id={person.id} py={"12px"} align="center">
      <Box
        maxW="sm"
        borderWidth="1px"
        borderRadius="lg"
        px="16px"
        py="8px"
        flex={"wrap"}
        align={"center"}
      >
        {person.image.length ? (
          <Image
            align="center"
            justify="center"
            py="4px"
            borderRadius="full"
            boxSize="100px"
            objectFit="cover"
            alt={person.name}
            src={person.image}
          />
        ) : (
          <></>
        )}
        <Text fontSize={"xl"} fontStyle="bold">
          {person.name}
        </Text>
        <HStack justify={"center"} pt="8px">
          <Link href={person.linkedIn} isExternal>
            <Icon
              variant="ghost"
              aria-label="LinkedIn"
              w={8}
              h={8}
              mr="6px"
              ml="6px"
              as={AiFillLinkedin}
            />
          </Link>
          <a href={`mailto:${person.email}`}>
            <Icon
              variant="ghost"
              aria-label="email"
              w={8}
              h={8}
              mr="6px"
              ml="6px"
              as={AiOutlineMail}
            />
          </a>
          <Link href={person.github} isExternal>
            <Icon
              variant="ghost"
              aria-label="github"
              w={8}
              h={8}
              mr="6px"
              ml="6px"
              as={AiFillGithub}
            />
          </Link>
        </HStack>
      </Box>
    </Container>
  );
};

export default AboutSingle;
