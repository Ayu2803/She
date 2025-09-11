import React, { useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// Main App component for the login page
const RetailerLogin = () => {
  // State to hold the username, password, and any login error
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle form submission
  const handleLogin = async (e) => {
    // Prevent the default form submission behavior
    e.preventDefault();
    setIsLoading(true);

    // Check credentials for the retailer role
    if (username === 'retailer' && password === 'retailer123') {
      try {
        // Add a document to the "retailer_logins" collection
        await addDoc(collection(db, "retailer_logins"), {
          username: username,
          timestamp: serverTimestamp(),
          status: "success",
          role: "retailer"
        });
        
        setIsLoggedIn(true);
        setError(''); // Clear any previous errors
      } catch (err) {
        setError('Failed to log login attempt. Please try again.');
        console.error("Error adding document: ", err);
      }
    } else {
      try {
        // Log failed login attempts too
        await addDoc(collection(db, "retailer_logins"), {
          username: username,
          timestamp: serverTimestamp(),
          status: "failed",
          role: "retailer"
        });
      } catch (err) {
        console.error("Error adding failed login document: ", err);
      }
      
      setError('Invalid username or password.');
      setIsLoggedIn(false);
    }
    
    setIsLoading(false);
  };

  // The main container for the entire page, centered and with a background color
  return (
    <div className="login-container">
      <style>
        {`
          .login-container {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            background-color: #121E2C;
            font-family: sans-serif;
          }
          .login-card {
            background-color: #0D1117;
            padding: 2.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
            width: 100%;
            max-width: 24rem;
          }
          .login-title {
            font-size: 2rem;
            font-weight: 700;
            text-align: center;
            margin-bottom: 2rem;
            color: #80d0ff;
          }
          .form-group {
            margin-bottom: 1.5rem;
          }
          .form-label {
            display: block;
            color: #80d0ff;
            font-size: 0.875rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
          }
          .form-input {
            width: 100%;
            padding: 0.75rem 1rem;
            border: 1px solid #3d4653;
            border-radius: 0.5rem;
            background-color: #1a232f;
            color: white;
            transition-property: all;
            transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
            transition-duration: 200ms;
          }
          .form-input:focus {
            outline: none;
            box-shadow: 0 0 0 2px #80d0ff;
          }
          .error-message {
            font-size: 0.875rem;
            color: #F87171;
            font-weight: 500;
            text-align: center;
            margin-top: 0.5rem;
          }
          .login-button {
            width: 100%;
            background-color: #80d0ff;
            color: #000;
            padding: 0.75rem;
            border-radius: 0.5rem;
            font-weight: 600;
            transition-property: all;
            transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
            transition-duration: 200ms;
            cursor: pointer;
            border: none;
          }
          .login-button:hover {
            background-color: #61c4ff;
          }
          .login-button:disabled {
            background-color: #3d4653;
            cursor: not-allowed;
          }
          .welcome-message-container {
            text-align: center;
          }
          .welcome-message-title {
            font-size: 1.25rem;
            color: #80d0ff;
            font-weight: 600;
            margin-bottom: 1rem;
          }
          .welcome-message-text {
            color: #cbd5e1;
          }
          .loading-spinner {
            display: inline-block;
            width: 1rem;
            height: 1rem;
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            border-top-color: #000;
            animation: spin 1s ease-in-out infinite;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>
      <div className="login-card">
        <h2 className="login-title">Retailer Login</h2>

        {/* Conditional rendering based on login status */}
        {isLoggedIn ? (
          <div className="welcome-message-container">
            <h3 className="welcome-message-title">Welcome, Retailer!</h3>
            <p className="welcome-message-text">You have successfully logged in.</p>
            <p className="welcome-message-text">Your login has been recorded in the database.</p>
          </div>
        ) : (
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label" htmlFor="username">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-input"
                placeholder="Enter your username"
                aria-label="Username"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                placeholder="Enter your password"
                aria-label="Password"
                required
              />
            </div>

            {/* Display error message if there is one */}
            {error && (
              <p className="error-message">{error}</p>
            )}

            <button
              type="submit"
              className="login-button"
              disabled={isLoading}
            >
              {isLoading ? <span className="loading-spinner"></span> : 'Log In'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default RetailerLogin;