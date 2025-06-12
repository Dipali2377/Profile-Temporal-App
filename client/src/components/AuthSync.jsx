import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import axios from "axios";

const AuthSync = () => {
  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (isAuthenticated && user?.email) {
      console.log("Sending user to backend:", user);

      const syncUser = async () => {
        try {
          await axios.post("http://localhost:5000/users/login", {
            email: user.email,
            firstName: user.given_name,
            lastName: user.family_name,
          });
        } catch (error) {
          console.error("User sync failed:", error.message);
        }
      };

      syncUser();
    }
  }, [isAuthenticated, user]);

  return null;
};

export default AuthSync;
