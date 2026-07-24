import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

import {
  FiHome,
  FiUsers,
  FiDroplet,
  FiTag,
  FiMaximize2,
  FiLayers,
  FiWifi,
  FiTruck,
  FiCoffee,
  FiShield,
  FiZap,
  FiCheckCircle,
  FiChevronLeft,
  FiChevronRight,
  FiImage,
  FiMapPin,
  FiPhone,
  FiX,
  FiMail,
FiCalendar,
} from "react-icons/fi";

import "../styles/RoomDetails.css";

function RoomDetails({ rooms }) {
  const { id } = useParams();

  const { user } = useAuth();

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);

  const room = rooms.find((r) => r._id === id);

  useEffect(() => {
  if (!id || user?.role !== "renter") {
    return;
  }

  const incrementView = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/rooms/${id}/view`,
        {
          method: "PATCH",
        }
      );

      if (!response.ok) {
        console.log("Failed to update room view");
        return;
      }

      const data = await response.json();

      console.log("Room view updated:", data);
    } catch (error) {
      console.log("View update error:", error);
    }
  };

  incrementView();
}, [id, user?.role]);

  if (!room) {
    return (
      <div className="room-details-not-found">
        <h2>Room not found</h2>

        <p>
          The room you are looking for may no longer be available.
        </p>

        <Link to="/rooms">
          Browse Rooms
        </Link>
      </div>
    );
  }

  const images =
    room.images?.length > 0
      ? room.images
      : room.image
      ? [room.image]
      : [];

      const amenityConfig = {
  wifi: {
    label: "WiFi",
    icon: <FiWifi />,
  },

  parking: {
    label: "Parking",
    icon: <FiTruck />,
  },

  "water-supply": {
    label: "Water Supply",
    icon: <FiDroplet />,
  },

  kitchen: {
    label: "Kitchen",
    icon: <FiCoffee />,
  },

  security: {
    label: "Security",
    icon: <FiShield />,
  },

  "power-backup": {
    label: "Power Backup",
    icon: <FiZap />,
  },
};

  const currentImage = images[selectedIndex];

  const previousImage = () => {
    setSelectedIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const nextImage = () => {
    setSelectedIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const openLightbox = (index = selectedIndex) => {
    setSelectedIndex(index);
    setShowLightbox(true);
  };

  const closeLightbox = () => {
    setShowLightbox(false);
  };

  const getCategoryLabel = () => {
    if (room.category === "student") {
      return "Student Friendly";
    }

    if (room.category === "professional") {
      return "Working Professional";
    }

    return "Available for Anyone";
  };

  const ownerName =
  typeof room.owner === "object"
    ? room.owner?.name
    : null;

const ownerEmail =
  typeof room.owner === "object"
    ? room.owner?.email
    : null;

const ownerInitial =
  ownerName?.charAt(0)?.toUpperCase() || "O";

const postedDate = room.createdAt
  ? new Date(room.createdAt).toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    )
  : "Not available";

  const formattedPrice = Number(
  room.price
).toLocaleString("en-IN");

const categoryLabel = getCategoryLabel();


  return (
    <main className="room-details-page">

      <div className="room-details-shell">

        {/* BREADCRUMB */}

        <nav className="room-details-breadcrumb">
          <Link to="/rooms">Rooms</Link>

          <span>›</span>

          <span>{room.location}</span>

          <span>›</span>

          <strong>{room.title}</strong>
        </nav>


        {/* MAIN LAYOUT */}

        <div className="room-details-layout">

          <div className="room-details-main">

            {/* IMAGE GALLERY */}

            <section className="room-gallery">

              {images.length > 0 ? (
                <>

                  <div
                    className="room-gallery-main"
                    onClick={() => openLightbox(selectedIndex)}
                  >

                    <img
                      src={currentImage}
                      alt={room.title}
                    />

                    {images.length > 1 && (
                      <>
                        <button
                          type="button"
                          className="gallery-navigation gallery-navigation-left"
                          onClick={(e) => {
                            e.stopPropagation();
                            previousImage();
                          }}
                          aria-label="Previous image"
                        >
                          <FiChevronLeft />
                        </button>

                        <button
                          type="button"
                          className="gallery-navigation gallery-navigation-right"
                          onClick={(e) => {
                            e.stopPropagation();
                            nextImage();
                          }}
                          aria-label="Next image"
                        >
                          <FiChevronRight />
                        </button>
                      </>
                    )}

                    <button
                      type="button"
                      className="view-gallery-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        openLightbox(selectedIndex);
                      }}
                    >
                      <FiImage />

                      View all photos ({images.length})
                    </button>

                  </div>


                  {images.length > 1 && (
                    <div className="room-gallery-side">

                      {images.slice(0, 3).map((image, index) => (
                        <button
                          type="button"
                          key={`${image}-${index}`}
                          className={`room-gallery-thumbnail ${
                            selectedIndex === index
                              ? "room-gallery-thumbnail-active"
                              : ""
                          }`}
                          onClick={() => setSelectedIndex(index)}
                        >
                          <img
                            src={image}
                            alt={`${room.title} ${index + 1}`}
                          />
                        </button>
                      ))}

                    </div>
                  )}

                </>
              ) : (
                <div className="room-gallery-empty">
                  <FiImage />

                  <p>No room images available</p>
                </div>
              )}

            </section>


            {/* ROOM HEADER */}

            <section className="room-content-header">

              <h1>{room.title}</h1>

              <div className="room-content-meta">

                <p>
                  <FiMapPin />

                  {room.location}
                </p>

                <span className="room-details-category">
                  {getCategoryLabel()}
                </span>

                {room.roomType && (
                  <span className="room-details-type">
                    {room.roomType}
                  </span>
                )}

              </div>

            </section>


            {/* ABOUT */}

            <section className="room-information-section">

              <h2>About this room</h2>

              <p className="room-description">
                {room.description ||
                  "No additional description has been provided for this room."}
              </p>

            </section>


            {/* ROOM DETAILS */}

            <section className="room-information-section">

              <h2>Room Details</h2>

<div className="room-specs-grid">

  <div className="room-spec-item">
    <div className="room-spec-icon">
      <FiHome />
    </div>

    <div>
      <span>Room Type</span>
      <strong>
        {room.roomType || "Not specified"}
      </strong>
    </div>
  </div>


  <div className="room-spec-item">
    <div className="room-spec-icon">
      <FiUsers />
    </div>

    <div>
      <span>Bedrooms</span>
      <strong>
        {room.bedrooms ?? "Not specified"}
      </strong>
    </div>
  </div>


  <div className="room-spec-item">
    <div className="room-spec-icon">
      <FiDroplet />
    </div>

    <div>
      <span>Bathrooms</span>
      <strong>
        {room.bathrooms ?? "Not specified"}
      </strong>
    </div>
  </div>


  <div className="room-spec-item">
    <div className="room-spec-icon">
      <FiTag />
    </div>

    <div>
      <span>Furnishing</span>
      <strong>
        {room.furnishing || "Not specified"}
      </strong>
    </div>
  </div>


  <div className="room-spec-item">
    <div className="room-spec-icon">
      <FiMaximize2 />
    </div>

    <div>
      <span>Area</span>
      <strong>
        {room.area
          ? `${room.area} sq.ft.`
          : "Not specified"}
      </strong>
    </div>
  </div>


  <div className="room-spec-item">
    <div className="room-spec-icon">
      <FiLayers />
    </div>

    <div>
      <span>Floor</span>
      <strong>
        {room.floor !== undefined &&
        room.floor !== null
          ? room.floor === 0
            ? "Ground Floor"
            : `Floor ${room.floor}`
          : "Not specified"}
      </strong>
    </div>
  </div>

</div>

            </section>


            {room.amenities?.length > 0 && (
  <section className="room-content-section">

    <div className="room-section-heading">

      <h2>Amenities</h2>

      <p>
        Facilities available with this room.
      </p>

    </div>


    <div className="room-amenities-grid">

      {room.amenities.map((amenity) => {

        const amenityDetails =
          amenityConfig[amenity];

        return (
          <div
            className="room-amenity-item"
            key={amenity}
          >

            <div className="room-amenity-icon">

              {amenityDetails?.icon || (
                <FiCheckCircle />
              )}

            </div>


            <span>
              {amenityDetails?.label ||
                amenity}
            </span>

          </div>
        );
      })}

    </div>

  </section>
)}

            


            {/* CONTACT MOBILE / CONTENT */}

            <section className="room-information-section room-contact-section">

              <h2>Contact Owner</h2>

              <div className="room-owner-contact">

                <div className="room-owner-contact-icon">
                  <FiPhone />
                </div>

                <div>
                  <span>Phone Number</span>

                  <strong>
                    {room.contact || "Not available"}
                  </strong>
                </div>

              </div>

              {room.contact && (
                <a
                  href={`tel:${room.contact}`}
                  className="room-inline-call-button"
                >
                  <FiPhone />

                  Call Owner
                </a>
              )}

            </section>

          </div>


          {/* RIGHT SIDEBAR */}

          <aside className="room-details-sidebar">

  <div className="room-price-card">

    <div className="room-sidebar-price">
      ₹{formattedPrice}
      <span>/ month</span>
    </div>

    <div className="room-availability">
      <span></span>
      {categoryLabel}
    </div>

    <a
      href={`tel:${room.contact}`}
      className="room-contact-primary"
    >
      <FiPhone />
      Contact Owner
    </a>

    <div className="room-contact-number">
      <FiPhone />
      <span>{room.contact}</span>
    </div>

  </div>


  {/* OWNER CARD */}

  <div className="room-owner-card">

    <div className="room-owner-card-header">

      <h3>Listed By</h3>

      <span className="owner-verified-label">
        <FiCheckCircle />
        Owner
      </span>

    </div>

    <div className="room-owner-profile">

      <div className="room-owner-avatar">
        {ownerInitial}
      </div>

      <div className="room-owner-details">

        <h4>
          {ownerName || "Room Owner"}
        </h4>

        <p>Property Owner</p>

      </div>

    </div>

    <div className="room-owner-meta">

      {ownerEmail && (
        <div className="room-owner-meta-item">

          <FiMail />

          <span>{ownerEmail}</span>

        </div>
      )}

      <div className="room-owner-meta-item">

        <FiCalendar />

        <span>
          Posted on {postedDate}
        </span>

      </div>

    </div>

  </div>


  {/* SAFETY CARD */}

  <div className="room-sidebar-card">

    <h3>Safety & Trust</h3>

    <div className="room-trust-list">

      <div className="room-trust-item">
        <FiCheckCircle />
        <span>Registered Room Listing</span>
      </div>

      <div className="room-trust-item">
        <FiCheckCircle />
        <span>Direct Owner Contact</span>
      </div>

      <div className="room-trust-item">
        <FiShield />
        <span>RoomRent Platform</span>
      </div>

    </div>

  </div>


  {/* STAY SAFE CARD */}

  <div className="room-safety-note">

    <FiShield />

    <div>

      <h4>Stay Safe</h4>

      <p>
        Verify the room and owner details before
        making any payment.
      </p>

    </div>

  </div>

</aside>

        </div>

      </div>


      {/* LIGHTBOX */}

      {showLightbox && images.length > 0 && (

        <div
          className="room-lightbox"
          onClick={closeLightbox}
        >

          <button
            type="button"
            className="room-lightbox-close"
            onClick={closeLightbox}
            aria-label="Close gallery"
          >
            <FiX />
          </button>


          {images.length > 1 && (
            <button
              type="button"
              className="room-lightbox-navigation room-lightbox-left"
              onClick={(e) => {
                e.stopPropagation();
                previousImage();
              }}
              aria-label="Previous image"
            >
              <FiChevronLeft />
            </button>
          )}


          <img
            src={currentImage}
            alt={room.title}
            className="room-lightbox-image"
            onClick={(e) => e.stopPropagation()}
          />


          {images.length > 1 && (
            <button
              type="button"
              className="room-lightbox-navigation room-lightbox-right"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              aria-label="Next image"
            >
              <FiChevronRight />
            </button>
          )}


          <div className="room-lightbox-count">
            {selectedIndex + 1} / {images.length}
          </div>

        </div>

      )}

    </main>
  );
}

export default RoomDetails;