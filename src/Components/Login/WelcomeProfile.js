import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../server/supabaseClient";
import Moments from "../Moments/Moments";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

export default function Account({ session }) {
  const [loading, setLoading] = useState(true);
  let { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  useEffect(() => {
    onOpen();
    getAndSetProfile();
  }, [session]);

  async function getAndSetProfile() {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      let { error, status } = await supabase
        .from("profiles")
        .select(`email`)
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      updateProfile();
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile() {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      const updates = {
        id: user.id,
        email: user.email,
        updated_at: new Date(),
      };

      let { error } = await supabase.from("profiles").upsert(updates, {
        returning: "minimal", // Don't return the value after inserting
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  function closeModal() {
    onClose();
    navigate("/moments");
  }

  return (
    <div>
      <Modal
        isCentered
        size="lg"
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        onClick={closeModal}
      >
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
        <ModalContent>
          <ModalHeader>welcome to moments</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            we can't wait for you to explore everything our app has to offer.
            close this popup to create your first moment!
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={closeModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Moments />
    </div>
  );
}
