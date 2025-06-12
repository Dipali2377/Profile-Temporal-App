// src/components/Profile.jsx
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return <p>Loading...</p>;
  if (!isAuthenticated) return null;

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Welcome, {user.name}</h2>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
};

export default Profile;
