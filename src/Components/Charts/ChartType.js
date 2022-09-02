import React, { useState } from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

const ChartType = (props) => {
  const { type, setType, setEntryId } = props;
  const [active, setActive] = useState("moments");
  const [readable, setReadable] = useState("moments");

  const handleClick = (val) => {
    setEntryId(0);
    if (val === "moments") {
      setType("moments");
      setActive("moments");
      setReadable("moments");
    } else {
      setType("journals");
      setActive("journals");
      setReadable("journals");
    }
  };

  return (
    <>
      <Menu>
        <MenuButton
          px={4}
          py={2}
          transition="all 0.1s"
          borderRadius="md"
          borderWidth="1px"
          _hover={{ bg: "gray.400" }}
          _expanded={{ bg: "blue.400" }}
          _focus={{ boxShadow: "outline" }}
        >
          {readable} <ChevronDownIcon />
        </MenuButton>
        <MenuList>
          <MenuItem
            onClick={() => {
              handleClick("moments");
            }}
          >
            moments
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClick("journals");
            }}
          >
            journal entries
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};
export default ChartType;
