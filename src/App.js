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
import { Show } from "@chakra-ui/react";
import MoodSlider from "./Components/Slider";
import SettingsScreen from "./Components/Settings/SettingsScreen";
import WelcomeProfile from "./Components/WelcomeProfile";

function App() {
  const [session, setSession] = useState("");

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const isLoggedIn = true;

  return (
    <div className="App">
<<<<<<< HEAD
      <Navbar isLoggedIn={isLoggedIn} />
      <Routes>
        {/* to do: if logged in, take the user to home or display home component, if not, display auth and don't allow any other navigation*/}
        <Route path="/" element={<Auth />} />
        <Route path="/moments" element={<Moments />} />
        <Route path="/addamoment" element={<AddMoment />} />
        <Route path="/settings" element={<SettingsScreen/>} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <MoodSlider />
      <Show below="lg">
        <Footer />
      </Show>
=======
      {!session ? (
        <Routes>
          <Route path="/" element={<Auth />} />
        </Routes>
      ) : (
        <>
          <Navbar isLoggedIn={isLoggedIn} />
          <Routes>
            {/* to do: if logged in, take the user to home or display home component, if not, display auth and don't allow any other navigation*/}
            <Route path="/" element={<Navigate to="/moments" />} />
            <Route path="/moments" element={<Moments />} />
            <Route path="/addamoment" element={<AddMoment />} />
            <Route
              path="/welcome"
              element={
                <WelcomeProfile key={session.user.id} session={session} />
              }
            />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
          <MoodSlider />
          <Show below="lg">
            <Footer />
          </Show>
        </>
      )}
>>>>>>> main
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
