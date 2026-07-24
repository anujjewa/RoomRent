import { NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import {
  FiGrid,
  FiHome,
  FiHeart,
  FiUsers,
  FiUser,
  FiPlusCircle,
  FiLogOut,
} from "react-icons/fi";

import "../../styles/Sidebar.css";

function Sidebar({ user }) {
  const navigate = useNavigate();

  const { logout } = useAuth();

  const logoutHandler = () => {
    logout();

    navigate("/");
  };

  return (
    <aside className="sidebar">

      <div className="sidebar-top">

        <div className="sidebar-logo">

          <div className="logo-icon">
            RR
          </div>

          <div className="logo-content">

            <h2>RoomRent</h2>

            <span>
              Rental Workspace
            </span>

          </div>

        </div>


        <nav className="sidebar-nav">

          <NavLink to="/dashboard">
            <FiGrid />
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/rooms">
            <FiHome />
            <span>Browse Rooms</span>
          </NavLink>


          {user?.role === "owner" && (

            <NavLink to="/add-room">

              <FiPlusCircle />

              <span>Add Room</span>

            </NavLink>

          )}

          <NavLink to="/my-rooms">
  <FiHome />
  <span>My Rooms</span>
</NavLink>


          {user?.role === "renter" && (

            <>

              <NavLink to="/favorites">

                <FiHeart />

                <span>Favorites</span>

              </NavLink>


              <NavLink to="/partners">

                <FiUsers />

                <span>Partners</span>

              </NavLink>


              <NavLink to="/my-requirement">

                <FiUser />

                <span>My Listing</span>

              </NavLink>

            </>

          )}

        </nav>

      </div>


      <div className="sidebar-bottom">

        <div className="workspace-card">

          <FiGrid />

          <h4>Workspace</h4>

          <p>
            Manage your account,
            rooms and activities
            from one place.
          </p>

        </div>


        <button
          type="button"
          className="sidebar-logout"
          onClick={logoutHandler}
        >

          <FiLogOut />

          Logout

        </button>

      </div>

    </aside>
  );
}

export default Sidebar;