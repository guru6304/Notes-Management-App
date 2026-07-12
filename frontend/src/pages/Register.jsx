import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [serverError, setServerError] = useState("");

  const [loading, setLoading] = useState(false);

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "name":
        if (!value.trim()) {
          error = "Name is required";
        }
        break;
      case "email":
        if (!value.trim()) {
          error = "Email is required";
        } else {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) {
            error = "Enter a valid email";
          }
        }
        break;
      case "password":
        if (!value) {
          error = "Password is required";
        } else if (value.length < 8) {
          error = "Minimum 8 characters required";
        }
        break;
      case "confirmPassword":
        if (!value) {
          error = "Confirm your password";
        } else if (value !== formData.password) {
          error = "Passwords do not match";
        }
        break;
      default:
        break;
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,

      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,

      [name]: validateField(name, value),
    }));

    if (name === "password" && formData.confirmPassword) {
      setErrors((prev) => ({
        ...prev,

        confirmPassword:
          value !== formData.confirmPassword ? "Passwords do not match" : "",
      }));
    }

    setServerError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      name: validateField("name", formData.name),

      email: validateField("email", formData.email),

      password: validateField("password", formData.password),

      confirmPassword: validateField(
        "confirmPassword",
        formData.confirmPassword,
      ),
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error !== "")) {
      return;
    }

    try {
      setLoading(true);

      await registerUser({
        name: formData.name,

        email: formData.email,

        password: formData.password,
      });

      alert("Registration Successful");

      navigate("/");
    } catch (err) {
      setServerError(err.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        <div className="col-lg-5 d-none d-lg-flex bg-primary text-white flex-column justify-content-center align-items-center">
          <i className="bi bi-journal-text display-1"></i>

          <h1 className="fw-bold mt-3">Notes Management</h1>

          <p className="text-center px-5">Organize your notes securely.</p>
        </div>

        <div className="col-lg-7 d-flex justify-content-center align-items-center">
          <div
            className="card shadow-lg p-4"
            style={{
              width: "420px",
              borderRadius: "18px",
            }}
          >
            <h3 className="text-center mb-4">Create Account</h3>

            {serverError && (
              <div className="alert alert-danger">{serverError}</div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  value={formData.name}
                  onChange={handleChange}
                />

                <div className="invalid-feedback">{errors.name}</div>
              </div>

              <div className="mb-3">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  value={formData.email}
                  onChange={handleChange}
                />

                <div className="invalid-feedback">{errors.email}</div>
              </div>

              <div className="mb-3">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className={`form-control ${errors.password ? "is-invalid" : ""}`}
                  value={formData.password}
                  onChange={handleChange}
                />

                <div className="invalid-feedback">{errors.password}</div>
              </div>

              <div className="mb-4">
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />

                <div className="invalid-feedback">{errors.confirmPassword}</div>
              </div>

              <button className="btn btn-primary w-100" disabled={loading}>
                {loading ? "Creating..." : "Create Account"}
              </button>
            </form>

            <p className="text-center mt-3">
              Already have an account?
              <Link to="/" className="ms-2">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
