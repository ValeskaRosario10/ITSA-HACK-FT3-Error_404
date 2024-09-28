// Validation.js
const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  
  const validatePassword = (password) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return re.test(password);
  };
  
  const validateForm = (name, email, password) => {
    const errors = {};
  
    if (!name) {
      errors.name = 'Name is required.';
    }
    if (!email) {
      errors.email = 'Email is required.';
    } else if (!validateEmail(email)) {
      errors.email = 'Email is invalid.';
    }
    if (!password) {
      errors.password = 'Password is required.';
    } else if (!validatePassword(password)) {
      errors.password = 'Password must be at least 8 characters long and contain an uppercase letter, a lowercase letter, and a number.';
    }
  
    return errors;
  };
  
  export { validateForm };
  