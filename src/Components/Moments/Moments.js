import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../server/supabaseClient";
import { VStack, Text, Skeleton, Show, Container } from "@chakra-ui/react";
import MomentCard from "./MomentCard";
import FloatingAdd from "../Buttons/FloatingAdd";
import SidePhoto from "../Navigation/SidePhoto";

const Moments = () => {
  const [moments, setMoments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = "moment";

  useEffect(() => {
    fetchMoments();
  }, []);

  async function fetchMoments() {
    try {
      const { data, error } = await supabase
        .from("moments")
        .select()
        .order("created_at", { ascending: false });
      if (error) throw error;
      setMoments(data);
    } catch (error) {
      console.error(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  }

  const navToMoment = (id) => {
    navigate(`/moments/${id}`);
  };

  return (
    <>
      <SidePhoto />
      <Container alignItems="center" pt='5'>
        {loading ? (
          <VStack
            p="1rem"
            m="16px"
            spacing="1rem"
            alignItems="stretch"
            maxW="xl"
          >
            <Skeleton height="8rem" borderRadius="lg" />
            <Skeleton height="8rem" borderRadius="lg" />
            <Skeleton height="8rem" borderRadius="lg" />
            <Skeleton height="8rem" borderRadius="lg" />
          </VStack>
        ) : (
          <>
            {!moments.length ? (
              <Text ml="1rem" fontSize={"1rem"} pl="1rem" pt="1rem">
                add a moment using the plus button.
              </Text>
            ) : (
              <VStack p="1rem" spacing="1rem" alignItems="stretch">
                {moments.map((moment) => (
                  <MomentCard
                    key={moment.id}
                    loading={loading}
                    moment={moment}
                    onClick={() => navToMoment(moment.id)}
                  />
                ))}
              </VStack>
            )}
            <Show below="lg">
              <FloatingAdd location={location} />
            </Show>
          </>
        )}
      </Container>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </>
  );
};

export default Moments;
