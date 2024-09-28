import React, { useState } from 'react';
import { validateForm } from './Validation'; // Import the validation function
import './Login.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [rightPanelActive, setRightPanelActive] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setName] = useState('');
  const [errors, setErrors] = useState({}); // State to hold errors
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State to check authentication status
  
  const handleSignUp = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(username, email, password);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5000/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }), // Include email in signup
      });
  
      const data = await response.json();
      if (response.ok) {
        console.log('User signed up:', data);
        localStorage.setItem('token', data.token); // Store the JWT in localStorage
        setIsAuthenticated(true);
        setErrors({}); // Clear errors on successful sign-up
        console.log('Navigating to dashboard...');
        navigate('/dashboard'); // Redirect to dashboard after successful signup
      } else {
        setErrors({ server: data.message }); // Set server error message
      }
    } catch (error) {
      console.error('Error signing up:', error);
      setErrors({ server: 'An error occurred. Please try again later.' });
    }
  };
  
  const handleSignIn = async (e) => {
    e.preventDefault();
    console.log('Sign In button clicked');
    const validationErrors = validateForm('', email, password); // Username is not needed for sign-in
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // Include email in login
      });
  
      const data = await response.json();
      if (response.ok) {
        console.log('User signed in:', data);
        localStorage.setItem('token', data.token); // Store the JWT in localStorage
        setIsAuthenticated(true); // Update authentication state
        navigate('/dashboard'); // Redirect to dashboard
      } else {
        setErrors({ server: data.message }); // Set server error message
      }
    } catch (error) {
      console.error('Error signing in:', error);
      setErrors({ server: 'An error occurred. Please try again later.' });
    }
  };
  
  return (
    <div className="login-page">
      <div>
        <img
          src="media/LoginImage_1.svg" // Replace with your image URL or import
          alt="Login Illustration"
          className="login-image"
        /> <br/>
        <h4 style={{color:'white'}} className="login-image">Manage your expenses with ease. Split bills, track payments, and stay organized—all in one place.</h4>
      </div>

      {isAuthenticated ? (
        <h2>Welcome! You are successfully logged in.</h2>
      ) : (
        <div className={`container ${rightPanelActive ? 'right-panel-active' : ''}`} id="container">
          {/* Sign Up Form */}
          <div className="form-container sign-up-container">
            <form onSubmit={handleSignUp}>
              <h1>Create Account</h1>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setName(e.target.value)}
                required
              />
              {errors.name && <p className="error">{errors.name}</p>}
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {errors.email && <p className="error">{errors.email}</p>}
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {errors.password && <p className="error">{errors.password}</p>}
              <button type="submit">Sign Up</button>
              {errors.server && <p className="error">{errors.server}</p>} {/* Server error display */}
            </form>
          </div>

          {/* Sign In Form */}
          <div className="form-container sign-in-container">
            <form onSubmit={handleSignIn}>
              <h1>Sign in</h1>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {errors.email && <p className="error">{errors.email}</p>}
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {errors.password && <p className="error">{errors.password}</p>}
              <button type="submit">Sign In</button>
              {errors.server && <p className="error">{errors.server}</p>} {/* Server error display */}
            </form>
          </div>

          {/* Overlay */}
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Welcome Back to BillSplit!</h1>
                <p>To keep connected with us please login with your personal info</p>
                <button className="ghost" id="signIn" onClick={() => setRightPanelActive(false)}>Sign In</button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Hello, Friend!</h1>
                <p>Enter your personal details and start your journey with us</p>
                <button className="ghost" id="signUp" onClick={() => setRightPanelActive(true)}>Sign Up</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
