
const validateRegister = (req, res, next) => {
  const name = req.body.name?.trim();
  const email = req.body.email?.trim().toLowerCase();
  const password = req.body.password;
  if (!name || !email || !password) {
    const error = new Error("All Fields are Required");
    error.statusCode = 400;
    return next(error);
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    const error = new Error("Invalid Email Address");
    error.statusCode = 400;
    return next(error);
  }
  if (password.length < 8) {
    const error = new Error("Password must contain at least 8 characters");
    error.statusCode = 400;
    return next(error);
  }
  req.body.name = name;
  req.body.email = email;
  next();
};
const validateLogin = (req, res, next) => {
    const email = req.body.email?.trim().toLowerCase();
    const password = req.body.password;
    if (!email || !password) {
        const error = new Error(
            "Email and Password are Required"
        );
        error.statusCode = 400;
        return next(error);
    }
    const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        const error = new Error(
            "Invalid Email Address"
        );
        error.statusCode = 400;
        return next(error);
    }
    req.body.email = email;
    next();
};
module.exports = { validateRegister ,validateLogin};
