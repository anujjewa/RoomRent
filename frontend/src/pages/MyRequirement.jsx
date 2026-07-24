import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import {
  FiMapPin,
  FiCalendar,
  FiEye,
  FiEdit2,
  FiTrash2,
  FiUser,
  FiCheckCircle,
} from "react-icons/fi";

import "../styles/MyRequirement.css";
import toast from "react-hot-toast";

function MyRequirement() {
  const navigate = useNavigate();

  const [partner, setPartner] = useState(null);

  useEffect(() => {
    fetchMyListing();
  }, []);

  const fetchMyListing = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/partners/my-listing`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        return;
      }

      const data = await response.json();

      setPartner(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your profile?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/partners/my-listing`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast,error(data.message);
        return;
      }

      toast.success("Profile Deleted Successfully");

      navigate("/post-requirement");
    } catch (error) {
      console.log(error);
    }
  };

  if (!partner) {
    return (
      <div className="empty-listing">
        <div className="empty-card">

          <div className="empty-icon">
            👤
          </div>

          <h2>Profile Not Created</h2>

          <p>
            Create your partner profile so students and
            professionals can discover and contact you.
          </p>

          <Link to="/post-requirement">

            <button className="create-listing-btn">

              + Create Profile

            </button>

          </Link>

        </div>
      </div>
    );
  }

  return (
    <main className="my-requirement-page">

      {/* HEADER */}

      <section className="listing-header">

        <div>

          <h1>My Partner Profile</h1>

          <p className="listing-subtitle">
            Manage your profile and track engagement from
            interested room partners.
          </p>

        </div>

      </section>

      {/* STATS */}

      <section className="profile-stats">

        <div className="stat-card">

          <FiEye />

          <div>

            <span>Profile Views</span>

            <strong>{partner.views || 0}</strong>

          </div>

        </div>

        <div className="stat-card">

          <FiCalendar />

          <div>

            <span>Joined</span>

            <strong>
              {new Date(
                partner.createdAt
              ).toLocaleDateString()}
            </strong>

          </div>

        </div>

        <div className="stat-card">

          <FiMapPin />

          <div>

            <span>Location</span>

            <strong>{partner.location}</strong>

          </div>

        </div>

      </section>

      {/* PROFILE CARD */}

      <section className="partner-card">

        {/* LEFT */}

        <div className="partner-image-section">

          <div className="partner-image">

            <img
              src={partner.image}
              alt={partner.name}
            />

            <span className="verified-badge">

              <FiCheckCircle />

              Verified

            </span>

          </div>

        </div>

        {/* RIGHT */}

        <div className="partner-info">

          <div className="profile-title">

            <h2>{partner.name}</h2>

            <FiCheckCircle />

          </div>

          <p className="profile-meta">

            {partner.age}

            <span>•</span>

            {partner.occupation}

            <span>•</span>

            {partner.genderPreference}

          </p>

          <div className="profile-grid">

            <div>

              <span>Name</span>

              <strong>{partner.name}</strong>

            </div>

            <div>

              <span>Age</span>

              <strong>{partner.age}</strong>

            </div>

            <div>

              <span>Location</span>

              <strong>{partner.location}</strong>

            </div>

            <div>

              <span>Occupation</span>

              <strong>{partner.occupation}</strong>

            </div>

            <div>

              <span>Looking For</span>

              <strong>
                {partner.genderPreference}
              </strong>

            </div>

            <div>

              <span>Contact</span>

              <strong>{partner.contact}</strong>

            </div>

          </div>

          {/* ABOUT */}

          <div className="description-box">

            <h3>About Me</h3>

            <p>{partner.description}</p>

          </div>

          {/* ACTIONS */}

          <div className="listing-buttons">

            <Link to="/post-requirement">

              <button className="edit-btn">

                <FiEdit2 />

                Edit Profile

              </button>

            </Link>

            <button
              className="delete-btn"
              onClick={handleDelete}
            >

              <FiTrash2 />

              Delete Profile

            </button>

          </div>

        </div>

      </section>

    </main>
  );
}

export default MyRequirement;