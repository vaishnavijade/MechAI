import React, { useState, useEffect } from "react";
import "./ProfilePage.css";
import { fetchProfile, updateProfile, resetPassword } from "../utils/api";

const ProfilePage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [connectedSince, setConnectedSince] = useState("");
  const [showProfileUpdate, setShowProfileUpdate] = useState(false);
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    // Fetch user profile data on component load
    const loadProfile = async () => {
      try {
        const result = await fetchProfile(); // Use API to fetch profile
        if (result.success) {
          setUsername(result.user.username);
          setEmail(result.user.email);
          setConnectedSince(new Date(result.user.createdAt).toLocaleDateString());
        } else {
          alert(result.message || "Failed to fetch profile.");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        alert("An error occurred while fetching profile.");
      }
    };

    loadProfile();
  }, []);

  // Handle profile update via API
  const handleUsernameUpdate = async () => {
    if (newUsername.trim() === "") {
      alert("Please enter a valid username!");
      return;
    }

    try {
      const result = await updateProfile(newUsername); // Only pass newUsername to update
      if (result.success) {
        setUsername(newUsername);  // Update username in frontend
        setShowProfileUpdate(false);
      } else {
        alert(result.message || "Profile update failed.");
      }
    } catch (error) {
      console.error("Profile update error:", error);
      alert("An error occurred while updating the profile.");
    }
  };

  // Handle password reset via API
  const handlePasswordReset = async () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const result = await resetPassword(email, newPassword); // Use email for resetting password
      if (result.success) {
        alert("Password reset successful.");
        setShowPasswordReset(false);
      } else {
        alert(result.message || "Password reset failed.");
      }
    } catch (error) {
      console.error("Password reset error:", error);
      alert("An error occurred while resetting the password.");
    }
  };

  return (
    <div className="container">
      <div className="profileSection">
        <div id="profileCard" className="profileCard">
          <div className="avatar">
            <span className="avatarText">{username[0]}</span>
          </div>
          {showProfileUpdate ? (
            <div>
              <h3 className="sectionTitle">Profile Update</h3>
              <input
                className="input"
                type="text"
                placeholder="New Username"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
              />
              <div className="updateButtonGroup">
                <button className="primaryButton" onClick={handleUsernameUpdate}>
                  Save Profile
                </button>
                <button className="cancelButton" onClick={() => setShowProfileUpdate(false)}>
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="username">{username}</h2>
              <p className="details">Email: {email}</p>
              <p className="details">Connected Since: {connectedSince}</p>
              <div className="buttonGroup">
                <button className="secondaryButton" onClick={() => setShowProfileUpdate(true)}>
                  Update Profile
                </button>
                <button className="secondaryButton" onClick={() => setShowPasswordReset(true)}>
                  Reset Password
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {showPasswordReset && (
        <div className="formSection">
          <div id="formCard" className="formCard">
            <h3 className="sectionTitle">Reset Password</h3>
            <input
              className="input"
              type="password"
              placeholder="Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <input
              className="input"
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              className="input"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button className="primaryButton" onClick={handlePasswordReset}>
              Change Password
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
