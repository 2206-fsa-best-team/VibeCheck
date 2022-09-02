import { ChevronDownIcon } from "@chakra-ui/icons";
import { Menu, MenuButton, MenuItem, MenuList, Button } from "@chakra-ui/react";
import React, { useState } from "react";

const ChartFilter = (props) => {
  const { setFilter, setEntryId } = props;
  const [readable, setReadable] = useState("all");

  const handleClick = (val) => {
    setEntryId(0);
    setFilter(val);
    switch (val) {
      case "lastSeven":
        setReadable("last 7 days");
        break;
      case "lastThirty":
        setReadable("last 30 days");
        break;
      case "lastYear":
        setReadable("last year");
        break;
      default:
        setReadable("all");
        break;
    }
  };

  return (
    <>
      <Menu>
        <MenuButton
          rightIcon={<ChevronDownIcon />}
          as={Button}
          px={4}
          py={2}
          transition="all 0.1s"
          borderRadius="md"
          borderWidth="1px"
          _hover={{ bg: "gray.400" }}
          _expanded={{ bg: "blue.400" }}
          _focus={{ boxShadow: "outline" }}
        >
          {readable}
        </MenuButton>
        <MenuList>
          <MenuItem
            onClick={(e) => {
              e.preventDefault();
              handleClick("all");
            }}
          >
            all
          </MenuItem>
          <MenuItem
            onClick={(e) => {
              e.preventDefault();
              handleClick("lastSeven");
            }}
          >
            last 7 days
          </MenuItem>
          <MenuItem
            onClick={(e) => {
              e.preventDefault();
              handleClick("lastThirty");
            }}
          >
            last 30 days
          </MenuItem>
          <MenuItem
            onClick={(e) => {
              e.preventDefault();
              handleClick("lastYear");
            }}
          >
            last year
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};
export default ChartFilter;
