import React, { useState } from "react";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
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
      setReadable("journal entries");
    }
  };

  return (
    <>
      <Menu>
        <MenuButton
          rightIcon={<ChevronDownIcon />}
          as={Button}
          mr={"1em"}
          py={2}
          transition="all 0.1s"
          borderRadius="md"
          borderWidth="1px"
          _hover={{ bg: "gray.400" }}
          _expanded={{ bg: "blue.400" }}
          _focus={{ boxShadow: "outline" }}
          justifyItems="left"
        >
          {readable}
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
