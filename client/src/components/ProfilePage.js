import React, { useState } from "react";

const ProfilePage = () => {
  const [username, setUsername] = useState("John Doe");  // Fetch from DB
  const [email, setEmail] = useState("johndoe@example.com");  // Fetch from DB
  const [connectedSince, setConnectedSince] = useState("2020");
  const [showProfileUpdate, setShowProfileUpdate] = useState(false);
  const [newEmail, setNewEmail] = useState(email);  // Pre-fill with current email
  const [newUsername, setNewUsername] = useState(username);  // Pre-fill with current username

  const handleUsernameUpdate = () => {
    if (newUsername.trim() === "") {
      alert("Please enter a valid username!");
      return;
    }
    setUsername(newUsername);
    alert(`Username updated to: ${newUsername}`);
  };

  const handleEmailUpdate = () => {
    if (newEmail.trim() === "") {
      alert("Please enter a valid email!");
      return;
    }
    setEmail(newEmail);
    alert(`Email updated to: ${newEmail}`);
  };

  const handleShowProfileUpdate = () => {
    setShowProfileUpdate(true);
  };

  const handleCancelProfileUpdate = () => {
    setShowProfileUpdate(false);
    setNewUsername(username);  // Reset to original username
    setNewEmail(email);  // Reset to original email
  };

  return (
    <div style={styles.container}>
      {/* Profile Section */}
      <div style={styles.profileSection}>
        <div style={styles.profileCard}>
          <div style={styles.avatar}>
            <span style={styles.avatarText}>{username[0]}</span>
          </div>
          {showProfileUpdate ? (
            <div>
              {/* Profile Update Heading */}
              <h3 style={styles.sectionTitle}>Profile Update</h3>
              <p style={styles.details}>Update your Name or Email Account</p>
              
              {/* Editable Fields for Username and Email */}
              <input
                style={styles.input}
                type="text"
                placeholder="New Username"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
              />
              <input
                style={styles.input}
                type="email"
                placeholder="New Email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
              <button style={styles.primaryButton} onClick={handleUsernameUpdate}>
                Save Profile
              </button>
              <button
                style={styles.secondaryButton}
                onClick={handleCancelProfileUpdate}
              >
                Cancel
              </button>
            </div>
          ) : (
            <div>
              {/* Display Profile Info */}
              <h2 style={styles.username}>{username}</h2>
              <p style={styles.details}>
                Email: <span style={styles.textHighlight}>{email}</span>
              </p>
              <p style={styles.details}>
                Connected Since: <span style={styles.textHighlight}>{connectedSince}</span>
              </p>
              <button
                style={styles.secondaryButton}
                onClick={handleShowProfileUpdate}
              >
                Update Profile
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Password Reset Section */}
      {!showProfileUpdate && (
        <div style={styles.formSection}>
          <div style={styles.formCard}>
            <h3 style={styles.sectionTitle}>Reset Password</h3>
            <input
              style={styles.input}
              type="password"
              placeholder="Old Password"
              // Add state handling for old password
            />
            <input
              style={styles.input}
              type="password"
              placeholder="New Password"
              // Add state handling for new password
            />
            <input
              style={styles.input}
              type="password"
              placeholder="Confirm Password"
              // Add state handling for confirming password
            />
            <button style={styles.primaryButton}>
              Change Password
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "60px",
    color: "#f0f0f0",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#121212",
    marginTop: "80px",
  },
  profileSection: {
    flex: "1",
    maxWidth: "32%",
    marginRight: "30px",
  },
  profileCard: {
    backgroundColor: "#1e1e1e",
    borderRadius: "12px",
    padding: "30px",
    textAlign: "center",
    boxShadow: "0 6px 15px rgba(0, 0, 0, 0.6)",
  },
  avatar: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    backgroundColor: "#555",
    margin: "0 auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: "48px",
    color: "#f0f0f0",
  },
  username: {
    fontSize: "22px",
    margin: "15px 0",
    color: "#f0f0f0",
  },
  details: {
    fontSize: "18px",
    margin: "10px 0",
    color: "#bbb",
  },
  textHighlight: {
    color: "#007BFF",
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: "20px",
    marginBottom: "25px",
    color: "#f0f0f0",
  },
  secondaryButton: {
    padding: "12px 25px",
    backgroundColor: "#333",
    color: "#fff",
    border: "1px solid #444",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "15px",
    transition: "background-color 0.3s ease",
  },
  input: {
    width: "100%",
    padding: "12px",
    margin: "12px 0",
    borderRadius: "5px",
    border: "1px solid #555",
    backgroundColor: "#333",
    color: "#f0f0f0",
    fontSize: "16px",
  },
  primaryButton: {
    padding: "12px 25px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "20px",
    transition: "background-color 0.3s ease",
  },
  formSection: {
    flex: "2",
    maxWidth: "65%",
  },
  formCard: {
    backgroundColor: "#1e1e1e",
    borderRadius: "12px",
    padding: "30px",
    boxShadow: "0 6px 15px rgba(0, 0, 0, 0.6)",
  },
};

export default ProfilePage;
