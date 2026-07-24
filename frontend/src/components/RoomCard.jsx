import { Link } from "react-router-dom";

import { useState } from "react";

import toast from "react-hot-toast";

import { useAuth } from "../context/AuthContext";

import {
  FiHeart,
  FiMapPin,
  FiCheckCircle,
  FiArrowRight,
  FiEdit2,
  FiTrash2,
  FiHome,
  FiDroplet,
  FiTag,
} from "react-icons/fi";

import "../styles/RoomCard.css";


function RoomCard({
  room,
  setRooms,
  favorites = [],
  setFavorites,
}) {

  const { user } = useAuth();


  const [favoriteLoading, setFavoriteLoading] =
    useState(false);


  const ownerId =
    typeof room.owner === "object"
      ? room.owner?._id
      : room.owner;


  const isRoomOwner =
    user?.role === "owner" &&
    String(ownerId) === String(user?._id);


  const isFavorite = favorites.some(
    (favoriteId) =>
      String(favoriteId) ===
      String(room._id)
  );


  const formattedPrice = Number(
    room.price
  ).toLocaleString("en-IN");


  const categoryLabel =
    room.category === "professional"
      ? "Professional"
      : room.category === "student"
      ? "Student"
      : "Anyone";


  /* =========================================================
     TOGGLE FAVORITE
  ========================================================= */

  const toggleFavorite = async () => {

    if (!setFavorites) {
      return;
    }


    if (favoriteLoading) {
      return;
    }


    const token =
      localStorage.getItem("token");


    if (!token) {

      toast.error(
        "Please login to save rooms."
      );

      return;

    }


    try {

      setFavoriteLoading(true);


      const response = await fetch(

        `${import.meta.env.VITE_API_URL}/favorites/${room._id}`,

        {

          method: "PATCH",

          headers: {

            Authorization:
              `Bearer ${token}`,

          },

        }

      );


      const data =
        await response.json();


      if (!response.ok) {

        toast.eroor(
          data.message ||
          "Failed to update favorites"
        );

        return;

      }


      setFavorites(

        Array.isArray(data.favorites)

          ? data.favorites.map(
              (favoriteId) =>
                String(favoriteId)
            )

          : []

      );


    } catch (error) {

      console.log(
        "Toggle favorite error:",
        error
      );


      toast.error(
        "Unable to update favorites. Please try again."
      );


    } finally {

      setFavoriteLoading(false);

    }

  };


  /* =========================================================
     REMOVE ROOM FROM LOCAL LIST
  ========================================================= */

  const handleDelete = () => {

    if (!setRooms) {
      return;
    }


    setRooms((prev) =>

      prev.filter(

        (currentRoom) =>

          String(currentRoom._id) !==
          String(room._id)

      )

    );

  };


  return (

    <article className="browse-room-card">


      {/* =====================================================
          ROOM IMAGE
      ===================================================== */}

      <div className="browse-room-image">

        <img

          src={
            room.images?.[0] ||
            room.image
          }

          alt={room.title}

          onError={(event) => {

            event.currentTarget.src =
              "https://via.placeholder.com/600x400?text=No+Image";

          }}

        />


        <span className="browse-room-verified">

          <FiCheckCircle />

          Verified

        </span>


        {user?.role !== "owner" && (

          <button

            type="button"

            className={`browse-room-favorite ${
              isFavorite
                ? "browse-room-favorite-active"
                : ""
            }`}

            onClick={toggleFavorite}

            disabled={favoriteLoading}

            aria-label={
              isFavorite
                ? "Remove from favorites"
                : "Add to favorites"
            }

          >

            <FiHeart />

          </button>

        )}

      </div>


      {/* =====================================================
          ROOM CONTENT
      ===================================================== */}

      <div className="browse-room-content">

        <h3>
          {room.title}
        </h3>


        <div className="browse-room-location">

          <FiMapPin />

          <span>
            {room.location}
          </span>

        </div>


        <div className="browse-room-price">

          ₹{formattedPrice}

          <span>
            / month
          </span>

        </div>


        {/* ===================================================
            ROOM SPECS
        =================================================== */}

        <div className="browse-room-specs">

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

            <span>
              {categoryLabel}
            </span>

          </div>

        </div>


        {/* ===================================================
            ROOM ACTIONS
        =================================================== */}

        <div className="browse-room-actions">

          <Link

            to={`/rooms/${room._id}`}

            className="browse-room-view"

          >

            View Details

            <FiArrowRight />

          </Link>


          {isRoomOwner && (

            <div className="browse-owner-actions">

              <Link

                to={`/add-room?edit=${room._id}`}

                className="browse-owner-edit"

              >

                <FiEdit2 />

                Edit

              </Link>


              <button

                type="button"

                className="browse-owner-delete"

                onClick={handleDelete}

              >

                <FiTrash2 />

                Delete

              </button>

            </div>

          )}

        </div>

      </div>

    </article>

  );

}


export default RoomCard;