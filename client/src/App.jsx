import { useState } from "react";

import "./App.css";
import Navbar from "./components/navbar";
import Home from "./components/Home";
import Profile from "./components/Profile";

function App() {
  return (
    <>
      <Navbar />
      <Home />
      <Profile />
    </>
  );
}

export default App;
