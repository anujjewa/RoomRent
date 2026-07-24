import { Link } from "react-router-dom";

import ConfirmModal from "../components/ConfirmModal";

import { useState } from "react";

import {
  FiHeart,
  FiTrash2,
  FiArrowRight,
  FiShield,
  FiMessageCircle,
  FiDollarSign,
} from "react-icons/fi";

import RoomCard from "../components/RoomCard";

import "../styles/Favorites.css";
import toast from "react-hot-toast";


function Favorites({
  rooms = [],
  favorites = [],
  setRooms,
  role,
  setFavorites,
}) {

  const [clearLoading, setClearLoading] =
    useState(false);

    const [showClearModal, setShowClearModal] =
  useState(false);


  /* =========================================================
     GET FAVORITE ROOMS
  ========================================================= */

  const favRooms = rooms.filter((room) =>

    favorites.some(

      (favoriteId) =>

        String(favoriteId) ===
        String(room._id)

    )

  );


  /* =========================================================
     CLEAR ALL FAVORITES
  ========================================================= */
const clearFavorites = () => {

  if (clearLoading) {
    return;
  }

  setShowClearModal(true);

};
 

const confirmClearFavorites = async () => {

  const token =
    localStorage.getItem("token");

  if (!token) {

    toast.error(
      "Please login to manage favorites."
    );

    setShowClearModal(false);

    return;

  }

  try {

    setClearLoading(true);

    const response = await fetch(

      `${import.meta.env.VITE_API_URL}/favorites`,

      {

        method: "DELETE",

        headers: {

          Authorization:
            `Bearer ${token}`,

        },

      }

    );

    const data =
      await response.json();

    if (!response.ok) {

      toast.error(

        data.message ||
        "Failed to clear favorites"

      );

      setShowClearModal(false);

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

    toast.success(
      "Favorites cleared successfully"
    );

    setShowClearModal(false);

  } catch (error) {

    console.log(
      "Clear favorites error:",
      error
    );

    toast.error(
      "Unable to clear favorites. Please try again."
    );

    setShowClearModal(false);

  } finally {

    setClearLoading(false);

  }

};


  return (

    <main className="favorites-page">

      <div className="favorites-shell">


        {/* ===================================================
            PAGE HEADER
        =================================================== */}

        <section className="favorites-header">

          <div className="favorites-heading">

            <h1>
              My Favorites
            </h1>


            <p>
              Rooms you've saved for later
            </p>


            {favRooms.length > 0 && (

              <span className="favorites-count">

                {favRooms.length} saved{" "}

                {favRooms.length === 1
                  ? "room"
                  : "rooms"}

              </span>

            )}

          </div>


          {favRooms.length > 0 && (

            <button

              type="button"

              className="clear-favorites-button"

              onClick={clearFavorites}

              disabled={clearLoading}

            >

              <FiTrash2 />


              {clearLoading
                ? "Clearing..."
                : "Clear All"}

            </button>

          )}

        </section>


        {/* ===================================================
            FAVORITE ROOMS
        =================================================== */}

        {favRooms.length > 0 ? (

          <section className="favorites-grid">

            {favRooms.map((room) => (

              <RoomCard

                key={room._id}

                room={room}

                setRooms={setRooms}

                role={role}

                favorites={favorites}

                setFavorites={setFavorites}

              />

            ))}

          </section>

        ) : (

          /* =================================================
             EMPTY FAVORITES
          ================================================= */

          <section className="favorites-empty">

            <div className="favorites-empty-icon">

              <FiHeart />

            </div>


            <h2>
              No saved rooms yet
            </h2>


            <p>

              Explore available rooms and save the ones
              you like to compare them later.

            </p>


            <Link

              to="/rooms"

              className="favorites-empty-button"

            >

              Browse Rooms

              <FiArrowRight />

            </Link>

          </section>

        )}


        {/* ===================================================
            FAVORITES CTA
        =================================================== */}

        {favRooms.length > 0 && (

          <section className="favorites-cta">

            <div className="favorites-cta-content">

              <div className="favorites-cta-icon">

                <FiHeart />

              </div>


              <div>

                <h3>
                  Save rooms you love
                </h3>


                <p>

                  Save your favorite rooms and compare
                  them easily anytime.

                </p>

              </div>

            </div>


            <Link

              to="/rooms"

              className="favorites-explore-button"

            >

              Explore More Rooms

              <FiArrowRight />

            </Link>

          </section>

        )}


        {/* ===================================================
            TRUST FEATURES
        =================================================== */}

        <section className="favorites-trust">


          <div className="favorites-trust-item">

            <div className="favorites-trust-icon">

              <FiShield />

            </div>


            <div>

              <h4>
                Verified Rooms
              </h4>


              <p>

                Browse registered room listings
                with trusted information.

              </p>

            </div>

          </div>


          <div className="favorites-trust-item">

            <div className="favorites-trust-icon">

              <FiMessageCircle />

            </div>


            <div>

              <h4>
                Direct Connections
              </h4>


              <p>

                Connect directly with room owners
                without unnecessary intermediaries.

              </p>

            </div>

          </div>


          <div className="favorites-trust-item">

            <div className="favorites-trust-icon">

              <FiDollarSign />

            </div>


            <div>

              <h4>
                No Brokerage
              </h4>


              <p>

                Discover rooms without hidden
                brokerage charges.

              </p>

            </div>

          </div>


        </section>


      </div>

      <ConfirmModal

  open={showClearModal}

  title="Clear Favorites"

  message="Are you sure you want to remove all saved rooms from your favorites?"

  confirmText="Clear"

  cancelText="Cancel"

  onConfirm={confirmClearFavorites}

  onCancel={() => {

    setShowClearModal(false);

  }}

/>

    </main>

  );

}


export default Favorites;