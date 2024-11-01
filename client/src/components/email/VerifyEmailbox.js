import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import './VerifyEmailBox.css'; // Assuming you have a CSS file for styling

const VerifyEmailBox = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState(''); // Store the email if needed
    const [verificationCode, setVerificationCode] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setIsLoading(true);

        try {
            const response = await fetch('/verifyemail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, code: verificationCode }),
            });

            const data = await response.json();

            if (data.success) {
                alert('Successfully verified!'); // Show success alert
                navigate('/login'); // Redirect to login page
            } else {
                alert(data.message); // Show error message from server
            }
        } catch (error) {
            setErrorMessage('Something went wrong! Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="verification-container">
            <h2>Verify Your Email</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter verification code"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    required
                />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Verifying...' : 'Verify'}
                </button>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
            </form>
        </div>
    );
};

export default VerifyEmailBox;
