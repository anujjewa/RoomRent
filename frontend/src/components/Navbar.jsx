import { NavLink, Link } from "react-router-dom";
import { FiUser, FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";
import "../styles/Navbar.css";

function Navbar({ user }) {

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
    <NavLink to="/" className="logo">
  <div className="navbar-logo-icon">
    RR
  </div>

  <h2>RoomRent</h2>
</NavLink>

<div className="nav-links">

  <NavLink to="/">Home</NavLink>


  <NavLink to="/rooms">Rooms</NavLink>

  {!user && (
    <>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/signup">Signup</NavLink>
    </>
  )}

  {user?.role === "owner" && (
    <NavLink to="/add-room">Add Room</NavLink>
  )}

   {user?.role === "owner" && (
    <NavLink to="/my-rooms">
    
    <span>My Rooms</span>
  </NavLink>
   )}

  {user?.role === "renter" && (
    <>
      <NavLink to="/favorites">Favorites</NavLink>
      <NavLink to="/partners">Partners</NavLink>
     
    </>
  )}

</div>


<div
  className="menu-toggle"
  onClick={() => setMenuOpen(!menuOpen)}
>
  {menuOpen ? <FiX /> : <FiMenu />}
</div>
     
     <div className="nav-user">

  {user && (
    <Link to="/dashboard" className="navbar-profile">

      <div className="navbar-profile-icon">
        <FiUser />
      </div>

      <span>{user.name}</span>

    </Link>
  )}

</div>

<div className={`mobile-menu ${menuOpen ? "active" : ""}`}>

  <NavLink to="/" onClick={() => setMenuOpen(false)}>
    Home
  </NavLink>

  <NavLink to="/rooms" onClick={() => setMenuOpen(false)}>
    Rooms
  </NavLink>

  {!user && (
    <>
      <NavLink to="/login" onClick={() => setMenuOpen(false)}>
        Login
      </NavLink>

      <NavLink to="/signup" onClick={() => setMenuOpen(false)}>
        Signup
      </NavLink>
    </>
  )}

  {user?.role === "owner" && (
    <>
      <NavLink to="/add-room" onClick={() => setMenuOpen(false)}>
        Add Room
      </NavLink>

      <NavLink to="/my-rooms" onClick={() => setMenuOpen(false)}>
        My Rooms
      </NavLink>
    </>
  )}

  {user?.role === "renter" && (
    <>
      <NavLink to="/favorites" onClick={() => setMenuOpen(false)}>
        Favorites
      </NavLink>

      <NavLink to="/partners" onClick={() => setMenuOpen(false)}>
        Partners
      </NavLink>
    </>
  )}

  {user && (
    <Link
      to="/dashboard"
      className="mobile-profile"
      onClick={() => setMenuOpen(false)}
    >
      Dashboard
    </Link>
  )}

</div>
    </nav>
  );
}

export default Navbar;