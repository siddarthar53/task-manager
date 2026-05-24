export const validateEmail = (email) => {
  return /\S+@\S+\.\S+/.test(email);
};

export const validatePassword = (password) => {
  return password && password.length >= 6;
};

export const validateTaskTitle = (title) => {
  return title.trim().length > 0 && title.length <= 100;
};