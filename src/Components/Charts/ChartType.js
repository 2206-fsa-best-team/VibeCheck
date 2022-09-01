import React, { useState } from "react";
import {
  Button,
  ButtonGroup,
  Container,
  HStack,
  Switch,
  Text,
} from "@chakra-ui/react";

const ChartType = (props) => {
  const { type, setType, setEntryId } = props;
  const [active, setActive] = useState("moments");

  const handleClick = (e, val) => {
    // e.preventDefault();
    setEntryId(0);
    if (val === "moments") {
      setType("moments");
      setActive("moments");
    } else {
      setType("journals");
      setActive("journals");
    }
  };

  return (
    <>
      <Container align="center">
        <ButtonGroup isAttached>
          <Button
            variant={active === "moments" ? "solid" : "outline"}
            onClick={(e) => handleClick(e, "moments")}
          >
            moments
          </Button>
          <Button
            variant={active === "journals" ? "solid" : "outline"}
            onClick={(e) => handleClick(e, "journals")}
          >
            journals
          </Button>
        </ButtonGroup>
      </Container>
    </>
  );
};
export default ChartType;
