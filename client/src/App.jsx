import { useState } from "react";

import "./App.css";
import Navbar from "./components/navbar";
import Home from "./components/Home";
import Profile from "./components/Profile";
import AuthSync from "./components/AuthSync";
import { Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
function App() {
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate(); // 👈 get navigate from hook

  // 👇 redirect to profile after successful login
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/profile");
    }
  }, [isAuthenticated, navigate]);
  return (
    <>
      <AuthSync />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {isAuthenticated && <Route path="/profile" element={<Profile />} />}
      </Routes>
    </>
  );
}

export default App;
