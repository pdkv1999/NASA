// Function to validate email format
export const validateEmail = (email) => {
  // Regular expression to match valid email addresses
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  // Testing email against the regex and returning true or false
  return re.test(String(email).toLowerCase());
};

// Function to validate password strength
export const validatePassword = (password) => {
  // Regular expression to ensure:
  // - At least one digit
  // - At least one special character
  // - At least one lowercase letter
  // - At least one uppercase letter
  // - Minimum length of 8 characters
  const re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  // Testing password against the regex and returning true or false
  return re.test(String(password));
};
