import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ConfirmModal from "../components/ConfirmModal";
import {
  FiHome,
  FiCheckCircle,
  FiEye,
  FiPlus,
} from "react-icons/fi";

import OwnerRoomCard from "../components/OwnerRoomCard";
import "../styles/MyRooms.css";
import toast from "react-hot-toast";

function MyRooms({ setRooms }) {
  const [myRooms, setMyRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showDeleteModal, setShowDeleteModal] =
  useState(false);

const [selectedRoomId, setSelectedRoomId] =
  useState(null);

  useEffect(() => {
    fetchMyRooms();
  }, []);

  const fetchMyRooms = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/rooms/my-rooms`,
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

      setMyRooms(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (roomId) => {
     setSelectedRoomId(roomId);

  setShowDeleteModal(true);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/rooms/${roomId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message);
        return;
      }

      setMyRooms((prev) =>
        prev.filter(
          (room) =>
            String(room._id) !== String(roomId)
        )
      );

      setRooms((prev) =>
        prev.filter(
          (room) =>
            String(room._id) !== String(roomId)
        )
      );
    } catch (error) {
      console.log(error);
    }
  };


  const confirmDelete = async () => {

  try {

    const token = localStorage.getItem("token");

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/rooms/${selectedRoomId}`,
      {
        method: "DELETE",

        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {

      toast.error(data.message);

      return;

    }

    setMyRooms((prev) =>
      prev.filter(
        (room) =>
          String(room._id) !==
          String(selectedRoomId)
      )
    );

    setRooms((prev) =>
      prev.filter(
        (room) =>
          String(room._id) !==
          String(selectedRoomId)
      )
    );

    toast.success("Room deleted successfully");

    setShowDeleteModal(false);

    setSelectedRoomId(null);

  } catch (error) {

    console.log(error);

    toast.error("Unable to delete room.");

  }

};



  const totalViews = myRooms.reduce(
  (total, room) => total + (room.views || 0),
  0
);

  if (loading) {
    return (
      <div className="my-rooms-loading">
        Loading...
      </div>
    );
  }

  return (
    <div className="my-rooms-page">

      <div className="my-rooms-top">
        <div>
          <h1>My Rooms</h1>

          <p>
            Manage all your room listings from one place.
          </p>
        </div>

        <Link
          to="/add-room"
          className="add-room-btn"
        >
          <FiPlus />
          Add New Room
        </Link>
      </div>

      <div className="my-room-stats">

        <div className="stats-card">
          <div className="stats-icon blue">
            <FiHome />
          </div>

          <div>
            <span>Total Rooms</span>
            <h2>{myRooms.length}</h2>
          </div>
        </div>

        <div className="stats-card">
          <div className="stats-icon green">
            <FiCheckCircle />
          </div>

          <div>
            <span>Active Rooms</span>
            <h2>{myRooms.length}</h2>
          </div>
        </div>

        <div className="stats-card">
          <div className="stats-icon purple">
            <FiEye />
          </div>

          <div>
            <span>Total Views</span>
           <h2>{totalViews}</h2>
          </div>
        </div>

      </div>

      {myRooms.length === 0 ? (
        <div className="my-rooms-empty">
          <h2>No Rooms Listed Yet</h2>

          <p>
            Start by adding your first room listing.
          </p>

          <Link
            to="/add-room"
            className="empty-add-btn"
          >
            Add Room
          </Link>
        </div>
      ) : (
        <div className="my-rooms-grid">
        {myRooms.map((room) => (
  <OwnerRoomCard
    key={room._id}
    room={room}
    onDelete={handleDelete}
  />
))}
        </div>
      )}

      {myRooms.length > 0 && (
        <div className="my-room-bottom-card">
          <div>
            <h3>Increase your reach</h3>

            <p>
              Keep your room listings updated with accurate
              details and attractive photos to get more tenant
              inquiries.
            </p>
          </div>
        </div>
      )}

      <ConfirmModal

  open={showDeleteModal}

  title="Delete Room"

  message="Are you sure you want to permanently delete this room listing? This action cannot be undone."

  confirmText="Delete"

  cancelText="Cancel"

  onConfirm={confirmDelete}

  onCancel={() => {

    setShowDeleteModal(false);

    setSelectedRoomId(null);

  }}

/>

    </div>
  );
}

export default MyRooms;