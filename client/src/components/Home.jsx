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
          Keep your personal data up-to-date, effortlessly. <br /> Smart
          automation and secure access in one place.
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
    </div>
  );
};

export default Home;
