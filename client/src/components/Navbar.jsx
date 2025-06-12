// src/components/Navbar.jsx
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  return (
    <nav style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
      {!isAuthenticated ? (
        <button onClick={() => loginWithRedirect()}>Login</button>
      ) : (
        <button onClick={() => logout({ returnTo: window.location.origin })}>
          Logout
        </button>
      )}
    </nav>
  );
};

export default Navbar;
