import { Link } from "react-router-dom";

import {
  FiMapPin,
  FiEye,
  FiEdit2,
  FiTrash2,
  FiCalendar,
  FiHome,
  FiDroplet,
  FiTag,
} from "react-icons/fi";

import "../styles/OwnerRoomCard.css";

function OwnerRoomCard({ room, onDelete }) {
  const formattedPrice = Number(
    room.price
  ).toLocaleString("en-IN");

  const postedDate = room.createdAt
    ? new Date(room.createdAt).toLocaleDateString(
        "en-IN",
        {
          day: "numeric",
          month: "short",
          year: "numeric",
        }
      )
    : "Recently";

  const categoryLabel =
    room.category === "professional"
      ? "Professional"
      : room.category === "student"
      ? "Student"
      : "Anyone";

  return (
    <article className="owner-listing-card">

      <div className="owner-listing-image">

        <img
          src={room.images?.[0] || room.image}
          alt={room.title}
          onError={(e) => {
            e.currentTarget.src =
              "https://via.placeholder.com/600x400?text=No+Image";
          }}
        />

        <span className="owner-listing-status">
          Active
        </span>

      </div>

      <div className="owner-listing-content">

        <h3>{room.title}</h3>

        <div className="owner-listing-location">
          <FiMapPin />

          <span>{room.location}</span>
        </div>

        <div className="owner-listing-price">
          ₹{formattedPrice}

          <span>/ month</span>
        </div>

        <div className="owner-listing-specs">

          <div>
            <FiHome />

            <span>
              {room.bedrooms || 1}{" "}
              {Number(room.bedrooms) === 1
                ? "Bed"
                : "Beds"}
            </span>
          </div>

          <div>
            <FiDroplet />

            <span>
              {room.bathrooms || 1}{" "}
              {Number(room.bathrooms) === 1
                ? "Bath"
                : "Baths"}
            </span>
          </div>

          <div>
            <FiTag />

            <span>{categoryLabel}</span>
          </div>

        </div>

        <div className="owner-listing-views">
  <FiEye />

  <span>
    {room.views || 0} Views
  </span>
</div>

        <div className="owner-listing-date">
          <FiCalendar />

          <span>
            Posted on {postedDate}
          </span>
        </div>

        <div className="owner-listing-actions">

          <Link
            to={`/rooms/${room._id}`}
            className="owner-listing-view"
          >
            <FiEye />
            View
          </Link>

          <Link
            to={`/add-room?edit=${room._id}`}
            className="owner-listing-edit"
          >
            <FiEdit2 />
            Edit
          </Link>

          <button
            type="button"
            className="owner-listing-delete"
            onClick={() => onDelete(room._id)}
          >
            <FiTrash2 />
            Delete
          </button>

        </div>

      </div>

    </article>
  );
}

export default OwnerRoomCard;