import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  MdPerson,
  MdEmail,
  MdLock,
  MdVisibility,
  MdVisibilityOff,
  MdHome,
} from "react-icons/md";
import "../styles/Signup.css";


function Signup() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "renter",
  });

  const [loading, setLoading] = useState(false);
const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

  if (!formData.name.trim()) {
    toast.error("Name is required");
    return;
  }

  if (!formData.email.trim()) {
    toast.error("Email is required");
    return;
  }

  if (!formData.password.trim()) {
    toast.error("Password is required");
    return;
  }

  if (formData.password.length < 6) {
  toast.error("Password must be at least 6 characters");
  return;
}
    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
       toast.error(data.message);
setLoading(false);
        return;
      }

     toast.success("Account Created Successfully!");
setLoading(false);

      navigate("/login");

    } catch (error) {
      console.log(error);
      setLoading(false);
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

      <h1>Create Account</h1>

      <p className="auth-subtitle">
        Join RoomRent and start your journey
      </p>

      <form onSubmit={handleSubmit}>

        <div className="input-group">
          <label>Name</label>

          <div className="input-box">
            <MdPerson className="input-icon" />

            <input
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
            />
          </div>
        </div>

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
              placeholder="Create password"
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
              onClick={() =>
                setShowPassword(!showPassword)
              }
            >
              {showPassword ? (
                <MdVisibilityOff />
              ) : (
                <MdVisibility />
              )}
            </button>

          </div>
        </div>

        <div className="input-group">
  <label>I want to join as</label>

  <div className="role-selector">

    <div
      className={`role-card ${
        formData.role === "renter" ? "active-role" : ""
      }`}
      onClick={() =>
        setFormData({
          ...formData,
          role: "renter",
        })
      }
    >
     <MdPerson className="role-icon" />

      <h3>Renter</h3>

      <p>Find rooms and roommates</p>
    </div>

    <div
      className={`role-card ${
        formData.role === "owner" ? "active-role" : ""
      }`}
      onClick={() =>
        setFormData({
          ...formData,
          role: "owner",
        })
      }
    >
      <MdHome className="role-icon" />

      <h3>Owner</h3>

      <p>List and manage rooms</p>
    </div>

  </div>
</div>

        <button
          className="login-btn"
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Creating Account..."
            : "Create Account"}
        </button>

      </form>

      <p className="auth-footer">
        Already have an account?

        <span
          onClick={() =>
            navigate("/login")
          }
        >
          {" "}
          Sign In
        </span>

      </p>

    </div>

  </div>
);
}

export default Signup;