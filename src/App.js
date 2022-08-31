import React, { useState, useEffect } from "react";
// import logo from "./logo.svg";
import "./App.css";
import Navbar from "./Components/Navigation/Navbar";
import { supabase } from "./server/supabaseClient";
import Auth from "./Components/Login/Auth";
import Moments from "./Components/Moments/Moments";
import Footer from "./Components/Navigation/Footer";
import { Routes, Route, Navigate } from "react-router-dom";
import ErrorPage from "./Components/ErrorPages/ErrorPage";
import AddMoment from "./Components/Moments/AddMoment";
import { Box, Show } from "@chakra-ui/react";
import WelcomeProfile from "./Components/Login/WelcomeProfile";
import SideMenu from "./Components/Navigation/SideMenu";
import SettingsScreen from "./Components/Settings/SettingsScreen";
import Cam from "./Components/Camera";
import Journals from "./Components/Journals/Journals";
import AddJournal from "./Components/Journals/AddJournal";
import VibeCharts from "./Components/Charts/VibeCharts.js";
import SingleMoment from "./Components/Moments/SingleMoment";
import AboutPage from "./Components/About/AboutPage";
import SingleJournal from "./Components/Journals/SingleJournal";

function App() {
  const [session, setSession] = useState("");

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const isLoggedIn = !!session;

  return (
    <div className="App">
      {!session ? (
        <Routes>
          <Route path="/" element={<Auth />} />
        </Routes>
      ) : (
        <>
          <Navbar isLoggedIn={isLoggedIn} />
          <Show above="lg">
            <SideMenu />
          </Show>
          <Box mt={16} ml={{ base: "0", lg: "20%" }} mb={20} zIndex={-1}>
            <Routes>
              <Route path="/" element={<Navigate to="/moments" />} />
              <Route path="/moments/:momentId" element={<SingleMoment />} />
              <Route path="/moments" element={<Moments />} />
              <Route
                path="/journals/:journalEntryId"
                element={<SingleJournal />}
              />
              <Route path="/journals" element={<Journals />} />
              <Route path="/vibes" element={<VibeCharts />} />
              <Route path="/addamoment" element={<AddMoment />} />
              <Route path="/addajournal" element={<AddJournal />} />
              <Route path="/settings" element={<SettingsScreen />} />
              <Route path="/about" element={<AboutPage />} />

              <Route
                path="/welcome"
                element={
                  <WelcomeProfile key={session.user.id} session={session} />
                }
              />
              <Route path="/camera" element={<Cam />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </Box>
          <Show below="lg">
            <Footer />
          </Show>
        </>
      )}
    </div>
  );
}

export default App;
