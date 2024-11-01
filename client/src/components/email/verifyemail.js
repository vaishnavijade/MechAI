export const handleVerifyEmail = async (code, email) => {
  try {
    const res = await fetch("/verifyemail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, email }),
    });

    const data = await res.json();
    return data; // Return the response back to the component
  } catch (error) {
    console.error("Error verifying email:", error);
    return { success: false, message: "Something went wrong. Try again." };
  }
};
