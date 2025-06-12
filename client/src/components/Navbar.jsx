// src/components/Navbar.jsx
import { useAuth0 } from "@auth0/auth0-react";
import "./Navbar.css"; // Ensure this import is there

const Navbar = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  return (
    // Add a class for styling
    <nav className="navbar">
      {!isAuthenticated ? (
        <button
          onClick={() => loginWithRedirect()}
          className="navbar-button login-button"
        >
          Login
        </button>
      ) : (
        <button
          onClick={() => logout({ returnTo: window.location.origin })}
          className="navbar-button logout-button"
        >
          Logout
        </button>
      )}
    </nav>
  );
};

export default Navbar;
