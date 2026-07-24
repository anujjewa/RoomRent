import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Login.css";
import { MdEmail, MdLock, MdVisibility, MdVisibilityOff,  MdHome  } from "react-icons/md";
import toast from "react-hot-toast";


function Login() {

  const navigate = useNavigate();

  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

     if (!formData.email.trim()) {
    toast.error("Email is required");
    return;
  }

  if (!formData.password.trim()) {
    toast.error("Password is required");
    return;
  }

    setLoading(true);

    try {

      const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(formData),
      });

     const data = await response.json();

          if (!response.ok) {
           toast.error(data.message);
           return;
         }

         // JWT Token Save
        localStorage.setItem("token", data.token);

await login();

setLoading(false);
toast.success("Login Successful!");

navigate("/");

    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
  <div className="auth-page">

    <div className="auth-card">

    <div className="brand-logo">
  <MdHome />
</div>

  <h2 className="brand-name">
    RoomRent
  </h2>

  <h1>Welcome Back</h1>

<p className="auth-subtitle">
Access your dashboard and manage your listings
</p>

      <form onSubmit={handleSubmit}>

        <div className="input-group">
  <label>Email</label>

  <div className="input-box">
    <MdEmail className="input-icon" />

    <input
      type="email"
      placeholder="Enter your email"
      value={formData.email}
      onChange={(e) =>
        setFormData({
          ...formData,
          email: e.target.value,
        })
      }
    />
  </div>
</div>

       <div className="input-group">
  <label>Password</label>

  <div className="input-box">
    <MdLock className="input-icon" />

    <input
      type={showPassword ? "text" : "password"}
      placeholder="Enter your password"
      value={formData.password}
      onChange={(e) =>
        setFormData({
          ...formData,
          password: e.target.value,
        })
      }
    />

    <button
      type="button"
      className="eye-btn"
      onClick={() => setShowPassword(!showPassword)}
    >
      {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
    </button>
  </div>
</div>

       <button
  type="submit"
  className="login-btn"
  disabled={loading}
>
  {loading ? "Signing In..." : "Sign In"}
</button>


<div className="forgot-password">
  <a href="#">Forgot Password?</a>
</div>

      </form>

      <p className="auth-footer">
        Don't have an account?
        <span onClick={() => navigate("/signup")}>
          {" "}Sign Up
        </span>
      </p>

    </div>

  </div>
);
}

export default Login;