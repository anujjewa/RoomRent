import { useState } from "react";

import { useAuth } from "../context/AuthContext";

import DashboardLayout from "../layouts/DashboardLayout";

import {
  FiMail,
  FiPhone,
  FiCalendar,
  FiMapPin,
  FiBriefcase,
  FiClock,
  FiCheckCircle,
} from "react-icons/fi";

import "../styles/Dashboard.css";


function Dashboard({ user }) {

  const { setUser } = useAuth();


  /* =========================================================
     PROFILE EDIT STATE
  ========================================================= */

  const [isEditing, setIsEditing] =
    useState(false);

  const [isSaving, setIsSaving] =
    useState(false);

  const [profileMessage, setProfileMessage] =
    useState("");


  const [profileData, setProfileData] =
    useState({

      phone: user?.phone || "",

      dateOfBirth:
        user?.dateOfBirth || "",

      address:
        user?.address || "",

      occupation:
        user?.occupation || "",

    });


  /* =========================================================
     PROFILE COMPLETION
  ========================================================= */

  const profileFields = [

    user?.name,

    user?.email,

    user?.phone,

    user?.dateOfBirth,

    user?.address,

    user?.occupation,

  ];


  const completedFields =
    profileFields.filter(Boolean).length;


  const profileCompletion = Math.round(

    (
      completedFields /
      profileFields.length
    ) * 100

  );


  const missingProfileFields = [

    !user?.phone &&
      "phone number",

    !user?.dateOfBirth &&
      "date of birth",

    !user?.address &&
      "address",

    !user?.occupation &&
      "occupation",

  ].filter(Boolean);


  const memberSince = user?.createdAt

    ? new Date(
        user.createdAt
      ).getFullYear()

    : "N/A";


  /* =========================================================
     OPEN PROFILE EDITOR
  ========================================================= */

  const openProfileEditor = () => {

    setProfileData({

      phone:
        user?.phone || "",

      dateOfBirth:
        user?.dateOfBirth || "",

      address:
        user?.address || "",

      occupation:
        user?.occupation || "",

    });


    setProfileMessage("");

    setIsEditing(true);

  };


  /* =========================================================
     UPDATE PROFILE
  ========================================================= */

  const handleProfileUpdate = async () => {

    try {

      setIsSaving(true);

      setProfileMessage("");


      const token =
        localStorage.getItem("token");


      const response = await fetch(

        `${import.meta.env.VITE_API_URL}/profile`,

        {

          method: "PATCH",

          headers: {

            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`,

          },

          body: JSON.stringify(
            profileData
          ),

        }

      );


      const data =
        await response.json();


      if (!response.ok) {

        throw new Error(

          data.message ||
          "Failed to update profile"

        );

      }


      setUser(data.user);


      setProfileData({

        phone:
          data.user.phone || "",

        dateOfBirth:
          data.user.dateOfBirth || "",

        address:
          data.user.address || "",

        occupation:
          data.user.occupation || "",

      });


      setProfileMessage(
        "Profile updated successfully"
      );


      setTimeout(() => {

        setIsEditing(false);

        setProfileMessage("");

      }, 700);


    } catch (error) {

      setProfileMessage(
        error.message
      );


    } finally {

      setIsSaving(false);

    }

  };


  return (

    <DashboardLayout user={user}>

      <main className="dashboard-container">

        <div className="dashboard-shell">


          {/* =================================================
              PAGE HEADER
          ================================================= */}

          <section className="dashboard-page-header">

            <div>

              <span className="dashboard-eyebrow">

                {user?.role === "owner"
                  ? "Owner Dashboard"
                  : "Renter Dashboard"}

              </span>


              <h1>

                Welcome back,{" "}

                <span>
                  {user?.name}
                </span>

              </h1>


              <p>

                Manage your RoomRent account and
                keep your personal information up to
                date.

              </p>

            </div>


            <div className="dashboard-account-status">

              <FiCheckCircle />


              <div>

                <span>
                  Account Status
                </span>

                <strong>
                  Verified
                </strong>

              </div>

            </div>

          </section>


          {/* =================================================
              DASHBOARD CONTENT
          ================================================= */}

          <section className="dashboard-content">

            <div className="dashboard-main">


              {/* =============================================
                  PROFILE CARD
              ============================================= */}

              <section className="profile-widget">

                <div className="profile-top">

                  <div className="profile-avatar">

                    {user?.name
                      ?.charAt(0)
                      .toUpperCase()}

                  </div>


                  <div className="profile-heading">

                    <h2>
                      {user?.name}
                    </h2>


                    <div className="profile-chips">

                      <span className="role-chip">

                        {user?.role}

                      </span>


                      <span className="verified-chip">

                        <FiCheckCircle />

                        Verified Account

                      </span>

                    </div>

                  </div>

                </div>


                <div className="profile-divider" />


                <div className="profile-section-title">

                  <div>

                    <h3>
                      Personal Information
                    </h3>


                    <p>

                      Your account and personal
                      details.

                    </p>

                  </div>


                  <button

                    type="button"

                    className="small-edit-btn"

                    onClick={
                      openProfileEditor
                    }

                  >

                    Edit Profile

                  </button>

                </div>


                <div className="profile-info">


                  <div className="profile-row">

                    <FiMail />

                    <span>
                      Email
                    </span>

                    <p>
                      {user?.email}
                    </p>

                  </div>


                  <div className="profile-row">

                    <FiPhone />

                    <span>
                      Phone
                    </span>

                    <p>

                      {user?.phone ||
                        "Not Added"}

                    </p>

                  </div>


                  <div className="profile-row">

                    <FiCalendar />

                    <span>
                      Date of Birth
                    </span>

                    <p>

                      {user?.dateOfBirth

                        ? new Date(
                            user.dateOfBirth
                          ).toLocaleDateString(
                            "en-IN"
                          )

                        : "Not Added"}

                    </p>

                  </div>


                  <div className="profile-row">

                    <FiMapPin />

                    <span>
                      Address
                    </span>

                    <p>

                      {user?.address ||
                        "Not Added"}

                    </p>

                  </div>


                  <div className="profile-row">

                    <FiBriefcase />

                    <span>
                      Occupation
                    </span>

                    <p>

                      {user?.occupation ||
                        "Not Added"}

                    </p>

                  </div>


                  <div className="profile-row">

                    <FiClock />

                    <span>
                      Member Since
                    </span>

                    <p>
                      {memberSince}
                    </p>

                  </div>

                </div>

              </section>

            </div>


            {/* ===============================================
                DASHBOARD SIDEBAR CONTENT
            =============================================== */}

            <aside className="dashboard-sidebar">


              {/* =============================================
                  ACCOUNT SUMMARY
              ============================================= */}

              <section className="account-summary-card">

                <div className="account-summary-header">

                  <h2>
                    Account Summary
                  </h2>


                  <p>

                    Your account information and
                    profile status.

                  </p>

                </div>


                <div className="summary-grid">


                  <div className="summary-item">

                    <span>
                      Account Status
                    </span>

                    <h3 className="summary-verified">

                      Verified

                    </h3>

                  </div>


                  <div className="summary-item">

                    <span>
                      Role
                    </span>

                    <h3>
                      {user?.role}
                    </h3>

                  </div>


                  <div className="summary-item">

                    <span>
                      Profile Completion
                    </span>

                    <h3>

                      {profileCompletion}%

                    </h3>

                  </div>


                  <div className="summary-item">

                    <span>
                      Member Since
                    </span>

                    <h3>
                      {memberSince}
                    </h3>

                  </div>

                </div>

              </section>


              {/* =============================================
                  COMPLETE PROFILE CARD
              ============================================= */}

              {profileCompletion < 100 && (

                <section className="complete-profile-card">

                  <h2>
                    Complete Your Profile
                  </h2>


                  <p>

                    Add your{" "}

                    {missingProfileFields.join(
                      ", "
                    )}{" "}

                    to make your profile more
                    complete.

                  </p>


                  <div className="profile-progress">

                    <div

                      className="profile-progress-fill"

                      style={{

                        width:
                          `${profileCompletion}%`,

                      }}

                    />

                  </div>


                  <span className="profile-completion-label">

                    {profileCompletion}% Completed

                  </span>


                  <button

                    type="button"

                    className="edit-profile-btn"

                    onClick={
                      openProfileEditor
                    }

                  >

                    Complete Profile

                  </button>

                </section>

              )}

            </aside>

          </section>

        </div>

      </main>


      {/* =====================================================
          EDIT PROFILE MODAL
      ===================================================== */}

      {isEditing && (

        <div className="profile-modal-overlay">

          <div className="profile-modal">

            <div className="profile-modal-header">

              <div>

                <h2>
                  Edit Profile
                </h2>


                <p>

                  Update your personal information.

                </p>

              </div>


              <button

                type="button"

                className="profile-modal-close"

                onClick={() =>
                  setIsEditing(false)
                }

                aria-label="Close edit profile"

              >

                ×

              </button>

            </div>


            <div className="profile-form">


              <div className="profile-form-group">

                <label>
                  Phone Number
                </label>


                <input

                  type="tel"

                  placeholder="Enter phone number"

                  value={
                    profileData.phone
                  }

                  onChange={(event) =>

                    setProfileData({

                      ...profileData,

                      phone:
                        event.target.value,

                    })

                  }

                />

              </div>


              <div className="profile-form-group">

                <label>
                  Date of Birth
                </label>


                <input

                  type="date"

                  value={

                    profileData.dateOfBirth

                      ? profileData
                          .dateOfBirth
                          .split("T")[0]

                      : ""

                  }

                  onChange={(event) =>

                    setProfileData({

                      ...profileData,

                      dateOfBirth:
                        event.target.value,

                    })

                  }

                />

              </div>


              <div className="profile-form-group profile-form-full">

                <label>
                  Address
                </label>


                <input

                  type="text"

                  placeholder="Enter your address"

                  value={
                    profileData.address
                  }

                  onChange={(event) =>

                    setProfileData({

                      ...profileData,

                      address:
                        event.target.value,

                    })

                  }

                />

              </div>


              <div className="profile-form-group profile-form-full">

                <label>
                  Occupation
                </label>


                <select

                  value={
                    profileData.occupation
                  }

                  onChange={(event) =>

                    setProfileData({

                      ...profileData,

                      occupation:
                        event.target.value,

                    })

                  }

                >

                  <option value="">
                    Select occupation
                  </option>

                  <option value="Student">
                    Student
                  </option>

                  <option value="Professional">
                    Professional
                  </option>

                  <option value="Other">
                    Other
                  </option>

                </select>

              </div>

            </div>


            {profileMessage && (

              <p className="profile-update-message">

                {profileMessage}

              </p>

            )}


            <div className="profile-modal-actions">

              <button

                type="button"

                className="profile-cancel-btn"

                onClick={() =>
                  setIsEditing(false)
                }

                disabled={isSaving}

              >

                Cancel

              </button>


              <button

                type="button"

                className="profile-save-btn"

                onClick={
                  handleProfileUpdate
                }

                disabled={isSaving}

              >

                {isSaving
                  ? "Saving..."
                  : "Save Changes"}

              </button>

            </div>

          </div>

        </div>

      )}

    </DashboardLayout>

  );

}


export default Dashboard;