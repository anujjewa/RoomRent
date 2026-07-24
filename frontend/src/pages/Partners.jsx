import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import {
  FiSearch,
  FiMapPin,
  FiBriefcase,
  FiCalendar,
  FiUser,
  FiHeart,
  FiCheckCircle,
  FiBookOpen,
  FiPhone,
  FiArrowRight,
  FiEye,
  FiClock,
} from "react-icons/fi";

import "../styles/Partners.css";

function Partners({ partners = [] }) {

  const token = localStorage.getItem("token");

let currentUserId = null;

if (token) {
  try {
    const tokenPayload = JSON.parse(
      atob(token.split(".")[1])
    );

    currentUserId =
      tokenPayload.id ||
      tokenPayload.userId ||
      tokenPayload._id;

  } catch (error) {
    console.log("Unable to decode token:", error);
  }
}

console.log("CURRENT USER ID:", currentUserId);

 


  const [searchText, setSearchText] = useState("");
  const [searchLocation, setSearchLocation] =
    useState("");
  const [searchOccupation, setSearchOccupation] =
    useState("");
  const [maxAge, setMaxAge] = useState("");

  const [activeFilter, setActiveFilter] =
    useState("all");

  const [sortBy, setSortBy] =
    useState("recent");

  const filteredPartners = partners
  .filter((partner) => {
    const matchesSearch =
      searchText === "" ||
      partner.name
        ?.toLowerCase()
        .includes(searchText.toLowerCase()) ||
      partner.description
        ?.toLowerCase()
        .includes(searchText.toLowerCase());

    const matchesLocation =
      searchLocation === "" ||
      partner.location
        ?.toLowerCase()
        .includes(searchLocation.toLowerCase());

    const matchesOccupation =
      searchOccupation === "" ||
      partner.occupation
        ?.toLowerCase()
        .includes(searchOccupation.toLowerCase());

    const matchesAge =
      maxAge === "" ||
      Number(partner.age) <= Number(maxAge);

 const matchesQuickFilter =
  activeFilter === "all" ||
  (activeFilter === "student" &&
    partner.occupation?.toLowerCase() === "student") ||
  (activeFilter === "professional" &&
    partner.occupation?.toLowerCase() !== "student") ||
  (activeFilter === "male" &&
    partner.genderPreference?.toLowerCase() === "male") ||
  (activeFilter === "female" &&
    partner.genderPreference?.toLowerCase() === "female");

    return (
      matchesSearch &&
      matchesLocation &&
      matchesOccupation &&
      matchesAge &&
      matchesQuickFilter
    );
  })
  .sort((a, b) => {
    const aIsOwn =
      String(a.owner) === String(currentUserId);

    const bIsOwn =
      String(b.owner) === String(currentUserId);

    if (aIsOwn && !bIsOwn) {
      return -1;
    }

    if (!aIsOwn && bIsOwn) {
      return 1;
    }

    return 0;
  });

  const getGenderLabel = (partner) => {
    return (
      partner.gender ||
      partner.genderPreference ||
      "Not specified"
    );
  };

  const handleViewProfile = async (partnerId) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/partners/${partnerId}/view`,
      {
        method: "PATCH",

        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
  const errorData = await response.json();

  console.log(
    "PARTNER VIEW API ERROR:",
    response.status,
    errorData
  );

  return;
}

    const data = await response.json();

    console.log(
      "Partner profile view updated:",
      data
    );

  } catch (error) {

    console.log(
      "Partner profile view error:",
      error
    );

  }
};

  return (
    <main className="partners-page">

      <div className="partners-shell">

        {/* PAGE HEADER */}

        <section className="partners-hero">

          <h1>Find Your Room Partner</h1>

          <p>
            Connect with students and professionals
            looking for a compatible room partner.
          </p>

        </section>


        {/* SEARCH AND FILTERS */}

        <section className="partners-filter-panel">

          <div className="partners-search-row">

            <div className="partner-filter-field partner-search-field">

              <FiSearch />

              <input
                type="text"
                placeholder="Search by name or keyword..."
                value={searchText}
                onChange={(e) =>
                  setSearchText(e.target.value)
                }
              />

            </div>


            <div className="partner-filter-field">

              <FiMapPin />

              <input
                type="text"
                placeholder="Location"
                value={searchLocation}
                onChange={(e) =>
                  setSearchLocation(e.target.value)
                }
              />

            </div>


            <div className="partner-filter-field">

              <FiBriefcase />

              <input
                type="text"
                placeholder="Occupation"
                value={searchOccupation}
                onChange={(e) =>
                  setSearchOccupation(e.target.value)
                }
              />

            </div>


            <div className="partner-filter-field">

              <FiCalendar />

              <input
                type="number"
                placeholder="Max Age"
                min="18"
                value={maxAge}
                onChange={(e) =>
                  setMaxAge(e.target.value)
                }
              />

            </div>


            <button
              type="button"
              className="partners-search-button"
            >
              <FiSearch />

              Search
            </button>

          </div>


          <div className="partners-filter-bottom">

            <div className="partners-quick-filters">

              <button
                type="button"
                className={
                  activeFilter === "all"
                    ? "partner-filter-active"
                    : ""
                }
                onClick={() =>
                  setActiveFilter("all")
                }
              >
                All
              </button>

              <button
                type="button"
                className={
                  activeFilter === "student"
                    ? "partner-filter-active"
                    : ""
                }
                onClick={() =>
                  setActiveFilter("student")
                }
              >
                Student
              </button>

              <button
                type="button"
                className={
                  activeFilter === "professional"
                    ? "partner-filter-active"
                    : ""
                }
                onClick={() =>
                  setActiveFilter("professional")
                }
              >
                Working Professional
              </button>

              <button
                type="button"
                className={
                  activeFilter === "male"
                    ? "partner-filter-active"
                    : ""
                }
                onClick={() =>
                  setActiveFilter("male")
                }
              >
                Male
              </button>

              <button
                type="button"
                className={
                  activeFilter === "female"
                    ? "partner-filter-active"
                    : ""
                }
                onClick={() =>
                  setActiveFilter("female")
                }
              >
                Female
              </button>

            </div>


            <div className="partners-sort">

              <span>Sort by:</span>

              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value)
                }
              >
                <option value="recent">
                  Recently Posted
                </option>

                <option value="age-low">
                  Age: Low to High
                </option>

                <option value="age-high">
                  Age: High to Low
                </option>
              </select>

            </div>

          </div>

        </section>


        {/* RESULTS HEADER */}

        <section className="partners-results-header">

          <p>
            <strong>{filteredPartners.length}</strong>{" "}
            {filteredPartners.length === 1
              ? "partner"
              : "partners"}{" "}
            found
          </p>

          <Link
            to="/my-requirement"
            className="partners-my-listing-button"
          >
            <FiUser />

            My Listing
          </Link>

        </section>


        {/* PARTNER GRID */}

        {filteredPartners.length === 0 ? (

          <section className="partners-empty-state">

            <div className="partners-empty-icon">
              <FiUser />
            </div>

            <h2>No partner found</h2>

            <p>
              Try changing your search or filter
              preferences.
            </p>

          </section>

        ) : (

          <section className="partners-grid">

            {filteredPartners.map((partner) => (

              <article
                className="partner-profile-card"
                key={partner._id}
              >

                {String(partner.owner) === String(currentUserId) && (
  <span className="partner-own-badge">
    Your Listing
  </span>
)}

                <div className="partner-profile-image">

                  <img
                    src={partner.image}
                    alt={partner.name}
                  />


                  <div className="partner-image-overlay">

  <div className="partner-overlay-info">

    <div className="partner-overlay-views">

  <FiEye />

  <span>{partner.views || 0}</span>

</div>

    <span className="partner-overlay-location">
      <FiMapPin />
      {partner.location}
    </span>

    <span className="partner-overlay-price">
      {partner.occupation}
    </span>

  </div>

</div>

                  <span className="partner-available-badge">
                    Available
                  </span>

                  <button
                    type="button"
                    className="partner-heart-button"
                    aria-label="Save partner profile"
                  >
                    <FiHeart />
                  </button>

                </div>


                <div className="partner-profile-content">

                  <div className="partner-profile-name">

                    <h2>{partner.name}</h2>

                    <FiCheckCircle />

                  </div>


                  <p className="partner-basic-meta">
                    {partner.age || "N/A"}
                    <span>•</span>
                    {getGenderLabel(partner)}
                    <span>•</span>
                    {partner.occupation || "Not specified"}
                  </p>


                  <div className="partner-profile-details">

                    <p>
                      <FiMapPin />

                      <span>
                        {partner.location ||
                          "Location not specified"}
                      </span>
                    </p>

                    <p>
                      <FiBriefcase />

                      <span>
                        {partner.occupation ||
                          "Occupation not specified"}
                      </span>
                    </p>

                  </div>


                  <div className="partner-profile-divider" />

                  <div className="partner-card-meta">

  <div className="partner-meta-item">
    <FiEye />
    <span>{partner.views || 0} Views</span>
  </div>

  <div className="partner-meta-item">
    <FiClock />
    <span>
      {partner.createdAt
        ? new Date(
            partner.createdAt
          ).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
          })
        : "Recently"}
    </span>
  </div>

</div>


                  <p className="partner-looking-for">

                    Looking for:{" "}

                    <strong>
                      {partner.genderPreference ||
                        "Compatible Room Partner"}
                    </strong>

                  </p>


                  <div className="partner-profile-actions">

                   <Link
  to={`/partners/${partner._id}`}
  className="partner-view-profile"
  onClick={() =>
    handleViewProfile(partner._id)
  }
>
  View Profile
</Link>

                    {partner.contact ? (

                      <a
                        href={`tel:${partner.contact}`}
                        className="partner-contact-button"
                      >
                        <FiPhone />

                        Contact
                      </a>

                    ) : (

                      <button
                        type="button"
                        className="partner-contact-button"
                        disabled
                      >
                        Contact
                      </button>

                    )}

                  </div>

                </div>

              </article>

            ))}

          </section>

        )}


        {/* TRUST STRIP */}

        <section className="partners-trust-strip">

          <div>

            <span>
              <FiCheckCircle />
            </span>

            <section>
              <h3>Verified Partners</h3>

              <p>
                Browse partner profiles in one place.
              </p>
            </section>

          </div>


          <div>

            <span>
              <FiPhone />
            </span>

            <section>
              <h3>Direct Contact</h3>

              <p>
                Connect directly with potential
                room partners.
              </p>
            </section>

          </div>


          <div>

            <span>
              <FiArrowRight />
            </span>

            <section>
              <h3>Find the Right Match</h3>

              <p>
                Filter by location, occupation and age.
              </p>
            </section>

          </div>

        </section>

      </div>

    </main>
  );
}

export default Partners;