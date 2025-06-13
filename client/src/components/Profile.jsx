import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css";
import avatar from "../assets/avatar.png";
import { toast } from "react-toastify";

// Import icons from react-icons/fa
import {
  FaUser,
  FaPhone,
  FaCity,
  FaMapPin,
  FaEnvelope,
  FaEdit,
  FaSave,
} from "react-icons/fa";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();

  // State for displaying the profile data (updates only on save or initial fetch)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    city: "",
    pincode: "",
  });

  // State for the editable form fields (updates dynamically as user types)
  const [editFormData, setEditFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    city: "",
    pincode: "",
  });

  const [loading, setLoading] = useState(true);

  // useEffect to fetch user data and initialize both formData and editFormData
  useEffect(() => {
    const fetchUser = async () => {
      if (isAuthenticated && user?.email) {
        try {
          const res = await axios.get(
            `http://localhost:5000/users/${user.email}`
          );
          const userData = res.data.user;

          // Set both display and edit states with fetched data
          setFormData({
            firstName: userData.firstName || "",
            lastName: userData.lastName || "",
            phoneNumber: userData.phoneNumber || "",
            city: userData.city || "",
            pincode: userData.pincode || "",
          });
          setEditFormData({
            firstName: userData.firstName || "",
            lastName: userData.lastName || "",
            phoneNumber: userData.phoneNumber || "",
            city: userData.city || "",
            pincode: userData.pincode || "",
          });
          setLoading(false);
        } catch (error) {
          console.error("Failed to fetch user data:", error.message);
          setLoading(false);
          // Optionally, set initial form data to empty if fetch fails
          setFormData({
            firstName: "",
            lastName: "",
            phoneNumber: "",
            city: "",
            pincode: "",
          });
          setEditFormData({
            firstName: "",
            lastName: "",
            phoneNumber: "",
            city: "",
            pincode: "",
          });
        }
      } else {
        setLoading(false); // If not authenticated or no email, stop loading
        // Clear data if not authenticated
        setFormData({
          firstName: "",
          lastName: "",
          phoneNumber: "",
          city: "",
          pincode: "",
        });
        setEditFormData({
          firstName: "",
          lastName: "",
          phoneNumber: "",
          city: "",
          pincode: "",
        });
      }
    };

    fetchUser();
  }, [isAuthenticated, user]); // Depend on isAuthenticated and user object for re-fetch

  // Handler for input changes - updates only editFormData
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handler for saving changes - updates backend and then formData
  const handleSave = async () => {
    try {
      // Send the editFormData to the backend
      await axios.put(
        `http://localhost:5000/users/${user.email}`,
        editFormData
      );

      // ONLY after successful backend update, update the displayed formData
      setFormData(editFormData);

      // --- Integrate React Toastify for success here ---
      // For example: toast.success("Profile updated successfully!");

      toast.success("Profile updated successfully");
      // Placeholder for toast
    } catch (error) {
      console.error("Update failed:", error.message);
      // --- Integrate React Toastify for error here ---
      // For example: toast.error("Failed to update profile. Please try again.");
      console.error("Failed to update profile."); // Placeholder for toast
    }
  };

  if (loading) return <p className="loading">Loading profile...</p>;

  // Ensure user data is available before rendering the main profile content
  if (!isAuthenticated || !user) {
    return (
      <div className="profile-container animated-fade-in">
        <p className="not-logged-in-message">
          Please log in to view your profile.
        </p>
      </div>
    );
  }

  return (
    <div className="profile-container animated-fade-in">
      <div className="profile-left">
        <img src={user?.picture || avatar} alt="Profile" />
        <h2>{user?.name || "Guest User"}</h2>
        <p>
          <FaEnvelope className="icon" /> {user?.email}
        </p>
        <div className="profile-info">
          <div>
            <strong>
              <FaUser className="icon" /> First Name:
            </strong>{" "}
            {formData.firstName}
          </div>
          <div>
            <strong>
              <FaUser className="icon" /> Last Name:
            </strong>{" "}
            {formData.lastName}
          </div>
          <div>
            <strong>
              <FaPhone className="icon" /> Phone:
            </strong>{" "}
            {formData.phoneNumber}
          </div>
          <div>
            <strong>
              <FaCity className="icon" /> City:
            </strong>{" "}
            {formData.city}
          </div>
          <div>
            <strong>
              <FaMapPin className="icon" /> Pincode:
            </strong>{" "}
            {formData.pincode}
          </div>
        </div>
      </div>
      <div className="profile-right">
        <h3>
          <FaEdit className="icon" /> Edit Profile
        </h3>
        <form className="profile-form">
          <div className="input-group">
            <FaUser className="input-icon" />
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={editFormData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <FaUser className="input-icon" />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={editFormData.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <FaPhone className="input-icon" />
            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              value={editFormData.phoneNumber}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <FaCity className="input-icon" />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={editFormData.city}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <FaMapPin className="input-icon" />
            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              value={editFormData.pincode}
              onChange={handleChange}
            />
          </div>
          <button type="button" onClick={handleSave}>
            <FaSave className="button-icon" /> Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
