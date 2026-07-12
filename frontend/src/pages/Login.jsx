import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { removeToken, removeUser } from "../utils/storage";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  useEffect(()=>{
    removeToken();
    removeUser();
  },[])
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const validateField = (name, value) => {
    let error = "";
    switch (name) {
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

    setServerError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      email: validateField("email", formData.email),
      password: validateField("password", formData.password),
    };
    setErrors(newErrors);
    if (Object.values(newErrors).some((error) => error !== "")) {
      return;
    }
    try {
      setLoading(true);
      const response = await loginUser(formData);
      setFormData({email:'',password:''})
      login(response.data.token, response.data.user);
      navigate("/dashboard");
    } catch (err) {
      setServerError(err.response?.data?.message || "Login Failed");
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

          <p className="text-center px-5">Securely manage your notes.</p>
        </div>

        <div className="col-lg-7 d-flex justify-content-center align-items-center">
          <div
            className="card shadow-lg p-4"
            style={{
              width: "420px",
              borderRadius: "18px",
            }}
          >
            <h3 className="text-center mb-4">Login</h3>

            {serverError && (
              <div className="alert alert-danger">{serverError}</div>
            )}

            <form onSubmit={handleSubmit} autoComplete="off">
              <div className="mb-3">
                <input
                  type="email"
                  name="email"
                  autoComplete="off"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                />

                <div className="invalid-feedback">{errors.email}</div>
              </div>

              <div className="mb-4">
                <input
                  type="password"
                  name="password"
                  autoComplete="off"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`form-control ${errors.password ? "is-invalid" : ""}`}
                />

                <div className="invalid-feedback">{errors.password}</div>
              </div>

              <button className="btn btn-primary w-100" disabled={loading}>
                {loading ? "Signing In..." : "Login"}
              </button>
            </form>

            <p className="text-center mt-3">
              Don't have an account?
              <Link to="/register" className="ms-2">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
