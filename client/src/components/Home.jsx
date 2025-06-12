// src/pages/Home.jsx
import { useAuth0 } from "@auth0/auth0-react";
import "./Home.css";

const Home = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    <div className="home-container">
      <div className="home-content animated-fade-in">
        <h1>Your Digital Identity, Perfected.</h1>
        <p>
          Seamlessly manage your personal details, showcase your achievements,
          and connect with your network. Your profile, your control.
        </p>
        {!isAuthenticated && (
          <button onClick={() => loginWithRedirect()} className="home-button">
            Get Started
            <span className="home-button-icon">→</span> {/* Right arrow icon */}
          </button>
        )}
        {isAuthenticated && (
          <p className="home-logged-in-message">
            You are logged in! Explore your profile or use the navigation.
          </p>
        )}
      </div>
      {/* Optional: Add decorative background shapes here if desired via CSS pseudo-elements */}
    </div>
  );
};

export default Home;
