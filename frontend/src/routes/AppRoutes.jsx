import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Rooms from "../pages/Rooms";
import RoomDetails from "../pages/RoomDetails";
import AddRoom from "../pages/AddRoom";
import Favorites from "../pages/Favorites";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";

import Partners from "../pages/Partners";
import PostRequirement from "../pages/PostRequirement";
import MyRequirement from "../pages/MyRequirement";
import MyRooms from "../pages/MyRooms";
import PartnerDetails from "../pages/PartnerDetails";


function AppRoutes({rooms, setRooms ,user, favorites, setFavorites, partners, setPartners }) {
  return (
    <Routes>
    <Route
  path="/"
  element={
    <Home
      user={user}
      rooms={rooms}
      favorites={favorites}
      setFavorites={setFavorites}
    />
  }
/>

<Route
  path="/my-rooms"
  element={
    <MyRooms
      favorites={favorites}
      setFavorites={setFavorites}
      setRooms={setRooms}
    />
  }
/>



      <Route path="/rooms" element={<Rooms rooms={rooms}  setRooms={setRooms} user={user} favorites={favorites} setFavorites={setFavorites}/>} />
      <Route path="/rooms/:id" element={<RoomDetails rooms={rooms} />} />
      <Route
  path="/add-room"
  element={
    user?.role === "owner" ? (
      <AddRoom rooms={rooms} setRooms={setRooms} />
    ) : (
      <Navigate to="/login" replace />
    )
  }
/>
   <Route
  path="/login"
  element={user ? <Navigate to="/" replace /> : <Login />}
/>

<Route
  path="/dashboard"
  element={
    user ? (
      <Dashboard user={user} />
    ) : (
      <Navigate to="/login" replace />
    )
  }
/>


<Route
  path="/signup"
  element={user ? <Navigate to="/" replace /> : <Signup />}
/>

    <Route 
    path="/partners" element={<Partners partners={partners}
     setPartners={setPartners}/>} />

   <Route
  path="/partners/:id"
  element={<PartnerDetails />}
/>

<Route
  path="/post-requirement"
  element={<PostRequirement />}
/>

    <Route  path="/favorites" element={ <Favorites rooms={rooms} favorites={favorites} setRooms={setRooms} role={user?.role} setFavorites={setFavorites} /> }/>
    
    <Route path="/my-requirement" element={<MyRequirement partners={partners} setPartners={setPartners}/>}/>
   
    </Routes>
  );
}

export default AppRoutes;

