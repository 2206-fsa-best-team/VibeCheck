import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import Navbar from "./Components/Navbar";
import Auth from "./Components/Auth";
import Moments from "./Components/Moments";
import Footer from "./Components/Footer";
import { Routes, Route } from "react-router-dom";
import ErrorPage from "./Components/ErrorPage";
import AddMoment from "./Components/AddMoment";
import { Show } from "@chakra-ui/react";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        {/* to do: if logged in, take the user to home or display home component, if not, display auth and don't allow any other navigation*/}
        <Route path="/" element={<Auth />} />
        <Route path="/moments" element={<Moments />} />
        <Route path="/addamoment" element={<AddMoment />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Show below="lg">
        <Footer />
      </Show>
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
