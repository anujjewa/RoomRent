import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  Link,
} from "react-router-dom";

import {
  FiArrowLeft,
  FiMapPin,
  FiBriefcase,
  FiPhone,
  FiEye,
  FiCheckCircle,
  FiUser,
  FiHeart,
  FiX,
  FiMaximize2,
} from "react-icons/fi";

import "../styles/PartnerDetails.css";


function PartnerDetails() {

  const { id } = useParams();


  const [partner, setPartner] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [isImageOpen, setIsImageOpen] =
    useState(false);


  /* =========================================================
     FETCH PARTNER PROFILE
  ========================================================= */

  useEffect(() => {

    const fetchPartner = async () => {

      try {

        setLoading(true);

        setError("");


        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/partners/${id}`
        );


        const data = await response.json();


        if (!response.ok) {

          throw new Error(
            data.message ||
            "Unable to load partner profile"
          );

        }


        setPartner(data);

      } catch (error) {

        console.log(
          "Partner details error:",
          error
        );


        setError(error.message);

        setPartner(null);

      } finally {

        setLoading(false);

      }

    };


    fetchPartner();

  }, [id]);


  /* =========================================================
     LIGHTBOX ESCAPE KEY + BODY SCROLL LOCK
  ========================================================= */

  useEffect(() => {

    if (!isImageOpen) {

      document.body.style.overflow = "";

      return;

    }


    document.body.style.overflow = "hidden";


    const handleEscape = (event) => {

      if (event.key === "Escape") {

        setIsImageOpen(false);

      }

    };


    window.addEventListener(
      "keydown",
      handleEscape
    );


    return () => {

      document.body.style.overflow = "";

      window.removeEventListener(
        "keydown",
        handleEscape
      );

    };

  }, [isImageOpen]);


  /* =========================================================
     LOADING STATE
  ========================================================= */

  if (loading) {

    return (

      <main className="partner-details-state">

        <div className="partner-details-loader" />

        <p>
          Loading partner profile...
        </p>

      </main>

    );

  }


  /* =========================================================
     ERROR / NOT FOUND STATE
  ========================================================= */

  if (!partner || error) {

    return (

      <main className="partner-details-state">

        <div className="partner-details-error-card">

          <div className="partner-details-error-icon">

            <FiUser />

          </div>


          <h2>
            Partner profile not found
          </h2>


          <p>

            {error ||
              "This partner profile is no longer available."}

          </p>


          <Link
            to="/partners"
            className="partner-details-error-link"
          >

            <FiArrowLeft />

            Back to Partners

          </Link>

        </div>

      </main>

    );

  }


  const genderLabel =
    partner.gender ||
    partner.genderPreference ||
    "Not specified";


  const joinedDate = partner.createdAt
    ? new Date(
        partner.createdAt
      ).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Not available";


  return (

    <main className="partner-details-page">

      <div className="partner-details-shell">


        {/* =====================================================
            BACK NAVIGATION
        ===================================================== */}

        <Link
          to="/partners"
          className="partner-details-back"
        >

          <FiArrowLeft />

          Back to Partners

        </Link>


        {/* =====================================================
            PROFILE CARD
        ===================================================== */}

        <section className="partner-details-card">


          {/* ===================================================
              PROFILE IMAGE
          =================================================== */}

          <div className="partner-details-image-section">

            <button
              type="button"
              className="partner-details-image-button"
              onClick={() =>
                setIsImageOpen(true)
              }
              aria-label={`View ${partner.name} profile photo`}
            >

              <img
                src={partner.image}
                alt={partner.name}
              />


              <span className="partner-details-image-overlay">

                <FiMaximize2 />

                View Photo

              </span>

            </button>


            <span className="partner-details-available">

              <span />

              Available

            </span>


            <div className="partner-details-image-hint">

              Click photo to view full size

            </div>

          </div>


          {/* ===================================================
              PROFILE CONTENT
          =================================================== */}

          <div className="partner-details-content">


            {/* PROFILE HEADER */}

            <header className="partner-details-header">

              <div>

                <div className="partner-details-name">

                  <h1>
                    {partner.name}
                  </h1>

                  <FiCheckCircle />

                </div>


                <div className="partner-details-meta">

                  <span>
                    {partner.age || "N/A"} years
                  </span>

                  <i />

                  <span>
                    {genderLabel}
                  </span>

                  <i />

                  <span>
                    {partner.occupation ||
                      "Not specified"}
                  </span>

                </div>

              </div>


              <div className="partner-details-views">

                <FiEye />

                <div>

                  <strong>
                    {partner.views || 0}
                  </strong>

                  <span>
                    Profile Views
                  </span>

                </div>

              </div>

            </header>


            {/* =================================================
                QUICK DETAILS
            ================================================= */}

            <div className="partner-details-quick-grid">

              <div className="partner-details-quick-card">

                <span>

                  <FiMapPin />

                </span>


                <div>

                  <small>
                    Location
                  </small>

                  <strong>

                    {partner.location ||
                      "Not specified"}

                  </strong>

                </div>

              </div>


              <div className="partner-details-quick-card">

                <span>

                  <FiBriefcase />

                </span>


                <div>

                  <small>
                    Occupation
                  </small>

                  <strong>

                    {partner.occupation ||
                      "Not specified"}

                  </strong>

                </div>

              </div>


              <div className="partner-details-quick-card">

                <span>

                  <FiUser />

                </span>


                <div>

                  <small>
                    Looking For
                  </small>

                  <strong>

                    {partner.genderPreference ||
                      "Compatible Partner"}

                  </strong>

                </div>

              </div>

            </div>


            {/* =================================================
                ABOUT SECTION
            ================================================= */}

            <section className="partner-details-about">

              <div className="partner-details-section-title">

                <h2>
                  About Me
                </h2>

                <span>
                  Partner Introduction
                </span>

              </div>


              <p>

                {partner.description ||
                  "No description provided."}

              </p>

            </section>


            {/* =================================================
                PROFILE FOOTER
            ================================================= */}

            <footer className="partner-details-footer">

              <div className="partner-details-profile-info">

                <span>
                  Profile active
                </span>

                <p>
                  Joined {joinedDate}
                </p>

              </div>


              <div className="partner-details-actions">

                <button
                  type="button"
                  className="partner-details-save-button"
                  aria-label="Save partner profile"
                >

                  <FiHeart />

                </button>


                {partner.contact ? (

                  <a
                    href={`tel:${partner.contact}`}
                    className="partner-details-contact"
                  >

                    <FiPhone />

                    Contact {partner.name}

                  </a>

                ) : (

                  <button
                    type="button"
                    className="partner-details-contact"
                    disabled
                  >

                    <FiPhone />

                    Contact unavailable

                  </button>

                )}

              </div>

            </footer>


          </div>

        </section>

      </div>


      {/* =======================================================
          IMAGE LIGHTBOX
      ======================================================= */}

      {isImageOpen && (

        <div
          className="partner-image-lightbox"
          onClick={() =>
            setIsImageOpen(false)
          }
          role="presentation"
        >

          <button
            type="button"
            className="partner-lightbox-close"
            onClick={() =>
              setIsImageOpen(false)
            }
            aria-label="Close profile photo"
          >

            <FiX />

          </button>


          <div
            className="partner-lightbox-content"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <img
              src={partner.image}
              alt={`${partner.name} profile`}
            />


            <div className="partner-lightbox-caption">

              <div>

                <strong>
                  {partner.name}
                </strong>

                <span>
                  Profile Photo
                </span>

              </div>


              <span className="partner-lightbox-status">

                <i />

                Available

              </span>

            </div>

          </div>

        </div>

      )}

    </main>

  );

}


export default PartnerDetails;