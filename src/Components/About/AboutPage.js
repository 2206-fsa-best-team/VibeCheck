import React from "react";
import { aboutDetails } from "../Helpers/aboutDetails";
import AboutSingle from "./AboutSingle";

const AboutPage = () => {
  return (
    <>
      {aboutDetails.map((person) => (
        <AboutSingle key={person.id} person={person} />
      ))}
    </>
  );
};

export default AboutPage;
