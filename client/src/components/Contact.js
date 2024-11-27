// Contact.jsx
import React, { useEffect, useState } from "react";
import "./Contact.css";

const Contact = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  // Fetch user data
  const getUserData = async () => {
    try {
      const res = await fetch("/getdata", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"  // Important for cookies
      });

      const data = await res.json();
      console.log("Fetched data:", data); // Debug log
      
      if (data.name && data.email) {
        setFormData(prev => ({
          ...prev,
          name: data.name,
          email: data.email
        }));
      }
    } catch (err) {
      console.log("Error fetching user data:", err);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { message, phone } = formData;

    if (!message || !phone) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch("/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message, phone })
      });

      const data = await res.json();
      
      if (data.success) {
        alert("Message sent successfully!");
        // Clear message and phone
        setFormData(prev => ({
          ...prev,
          message: "",
          phone: ""
        }));
      } else {
        alert(data.message || "Failed to send message");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to send message. Please try again!");
    }
  };

  return (
    <>
      <div className="contact_info">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <div className="contact_info_container d-flex flex-lg-row flex-column justify-content-between align-items-between">
                {/* You can add contact info boxes here if needed */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="contact_form">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <div className="contact_form_container py-5">
                <div className="contact_form_title mb-4">
                  Get in Touch
                </div>
                <form id="contact_form" onSubmit={handleSubmit}>
                  <div className="contact_form_inputs d-flex flex-md-row flex-column justify-content-between align-items-between">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="contact_form_name input_field"
                      placeholder="Your name"
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="contact_form_email input_field"
                      placeholder="Your email"
                    />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="contact_form_phone input_field"
                      placeholder="Your phone number"
                    />
                  </div>

                  <div className="contact_form_text mt-5">
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="text_field contact_form_message"
                      placeholder="Message"
                      rows="4"
                      cols="50"
                    ></textarea>
                  </div>

                  <div className="contact_form_button">
                    <button type="submit" className="button contact_submit_button">
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;