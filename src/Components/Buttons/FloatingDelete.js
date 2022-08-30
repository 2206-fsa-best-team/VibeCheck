import { IconButton, Flex, Container, Tooltip } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import React from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../server/supabaseClient";

const FloatingDelete = (props) => {
  const { location, id } = props;
  const navigate = useNavigate();

  async function handleDelete() {
    try {
      const { error } = await supabase
        .from("moments")
        .delete()
        .match({ id: id });
      if (error) throw error;
      navigate("/moments");
    } catch (error) {
      console.error(error.error_description || error.message);
    }
  }

  return (
    <Container>
      <Flex alignItems="flex-end" direction="row">
        <Tooltip
          label={`delete your moment`}
          placement="left"
          aria-label={`tooltip for deleting a ${location}`}
        >
          <IconButton
            icon={<DeleteIcon />}
            isRound="true"
            aria-label={`delete your ${location}`}
            alignSelf="flex-end"
            size="lg"
            variant="solid"
            pos="fixed"
            px={4}
            py={4}
            bottom={24}
            right={12}
            onClick={handleDelete}
          />
        </Tooltip>
      </Flex>
    </Container>
  );
};

export default FloatingDelete;
