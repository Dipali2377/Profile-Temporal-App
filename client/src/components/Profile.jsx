import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css";
import avatar from "../assets/avatar.png";

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

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    city: "",
    pincode: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (isAuthenticated && user?.email) {
        try {
          const res = await axios.get(
            `http://localhost:5000/users/${user.email}`
          );
          setFormData({
            firstName: res.data.user.firstName || "",
            lastName: res.data.user.lastName || "",
            phoneNumber: res.data.user.phoneNumber || "",
            city: res.data.user.city || "",
            pincode: res.data.user.pincode || "",
          });
          setLoading(false);
        } catch (error) {
          console.error("Failed to fetch user data", error.message);
          setLoading(false);
        }
      } else {
        setLoading(false); // If not authenticated or no email, stop loading
      }
    };

    fetchUser();
  }, [isAuthenticated, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5000/users/${user.email}`, formData);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Update failed:", error.message);
      alert("Failed to update profile.");
    }
  };

  if (loading) return <p className="loading">Loading profile...</p>;

  return (
    <div className="profile-container animated-fade-in">
      {" "}
      {/* Added animation class */}
      <div className="profile-left">
        <img src={user?.picture || avatar} alt="Profile" />{" "}
        {/* Use user's Auth0 picture if available */}
        <h2>{user?.name || "Guest User"}</h2>
        <p>
          <FaEnvelope className="icon" /> {user?.email}
        </p>{" "}
        {/* Email with icon */}
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
        </h3>{" "}
        {/* Edit icon for heading */}
        <form className="profile-form">
          <div className="input-group">
            {" "}
            {/* Wrapper for icon + input */}
            <FaUser className="input-icon" />
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <FaUser className="input-icon" />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <FaPhone className="input-icon" />
            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <FaCity className="input-icon" />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <FaMapPin className="input-icon" />
            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              value={formData.pincode}
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
