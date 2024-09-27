import React, { useState } from 'react';
import { validateForm } from './Validation'; // Import the validation function
import './Login.css';

function Login() {
  const [rightPanelActive, setRightPanelActive] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errors, setErrors] = useState({}); // State to hold errors
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State to check authentication status

  const handleSignUp = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(name, email, password);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Simulate a successful sign-up
    console.log('User signed up:', { name, email, password });
    setIsAuthenticated(true);
    setErrors({}); // Clear errors on successful sign-up
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    const validationErrors = validateForm('', email, password); // Name is not needed for sign-in
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Simulate successful sign-in (for example purposes)
    console.log('User signed in:', { email, password });
    setIsAuthenticated(true);
    setErrors({}); // Clear errors on successful sign-in
  };

  return (
    <div className="login-page">
        <div>
      <img
        src="media/LoginImage.svg" // Replace with your image URL or import
        alt="Login Illustration"
        className="login-image"
      /> <br/>
      <h4 style={{color:'white'}} className="login-image">Manage your expenses with ease. Split bills, track payments, and stay organized—all in one place.
      </h4>
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
                placeholder="Name"
                value={name}
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
              <a href="#">Forgot your password?</a>
              <button type="submit">Sign In</button>
              {errors.server && <p className="error">{errors.server}</p>} {/* Server error display */}
            </form>
          </div>

          {/* Overlay */}
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Welcome Back  to BillSplit!</h1>
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
