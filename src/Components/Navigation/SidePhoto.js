import React, { useState } from "react";
import { Container, Image, Box } from "@chakra-ui/react";
const slicedURL = document.location.href.split("/");
let sidebarVar = false
if (slicedURL.includes("addamoment" || "addajournal")) sidebarVar = true;

const SidePhoto = () => {
  // const [slicedURL] = useState(document.location.href.split("/"))
  // const [noSidebar, setNoSidebar] = useState(Boolean(sidebarVar))
  // useEffect(() => {
  //   // for (let i = 0; i < slicedURL.length; i++) {
  //   //   let char = slicedURL[i];
  //   //   if (Number(char)) noSidebar = true;
  //   // }
  // }, []);

  return (
    // <>
    //   {noSidebar ? (
    //     <></>
    //   ) : (
        <Container>
          <Box
            mt='0'
            right={0}
            pos={"fixed"}
            borderLeft={"1px"}
            borderColor={"gray.700"}
          >
            <Image src="https://i.ibb.co/FqbjLw6/dark-banner-2.png"></Image>
          </Box>
        </Container>
  //     )}
  //   </>
  );
};

export default SidePhoto;
