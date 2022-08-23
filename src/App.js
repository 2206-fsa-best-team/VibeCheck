import React, { useState, useEffect } from "react";
// import logo from "./logo.svg";
import "./App.css";
import Navbar from "./Components/Navbar";
import { supabase } from "./server/supabaseClient";
import Auth from "./Components/Auth";
import Moments from "./Components/Moments";
import Footer from "./Components/Footer";
import { Routes, Route, Navigate } from "react-router-dom";
import ErrorPage from "./Components/ErrorPage";
import AddMoment from "./Components/AddMoment";
import { Box, Show } from "@chakra-ui/react";
import WelcomeProfile from "./Components/WelcomeProfile";
import SideMenu from "./Components/SideMenu";
import SettingsScreen from "./Components/Settings/SettingsScreen";

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
          <Box mt={16} ml={{ base: "0", lg: "20%" }}>
            <Routes>
              {/* to do: if logged in, take the user to home or display home component, if not, display auth and don't allow any other navigation*/}
              <Route path="/" element={<Navigate to="/moments" />} />
              <Route path="/moments" element={<Moments />} />
              <Route path="/addamoment" element={<AddMoment />} />
              <Route path="/settings" element={<SettingsScreen />} />
              <Route
                path="/welcome"
                element={
                  <WelcomeProfile key={session.user.id} session={session} />
                }
              />
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

/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

    </div>
  );
}

export default App;*/
