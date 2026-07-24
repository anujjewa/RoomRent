import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";
import { useState } from "react";
import { useEffect } from "react";
import Footer from "./components/Footer";
import { useAuth } from "./context/AuthContext";
import { useLocation } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  
  const [rooms, setRooms] = useState([]);

  const [myRooms, setMyRooms] = useState([]);


const { user } = useAuth();

const location = useLocation();

const dashboardPages = [
  "/dashboard",
];

const isDashboard =
  dashboardPages.includes(location.pathname);

const[role, setRole] = useState("renter");

const [partners, setPartners] = useState([]);

const [favorites, setFavorites] = useState([]);

const fetchMyRooms = async () => {

  try {

    const token = localStorage.getItem("token");

    if (!token) return;

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/rooms/my-rooms`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) return;

    const data = await response.json();
   
    setMyRooms(data);

  } catch (error) {
    console.log(error);
  }

};

const fetchPartners = async () => {

  try {

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/partners`
    );

    if (!response.ok) {
      return;
    }

    const data = await response.json();

    console.log("PARTNERS FROM API:", data);

    setPartners(data);

  } catch (error) {

    console.log("PARTNERS FETCH ERROR:", error);

  }

};

 useEffect(() => {

  const fetchRooms = async () => {

    try {

      const response = await fetch(`${import.meta.env.VITE_API_URL}/rooms`);

      const data = await response.json();
      console.log(data);

      setRooms(data);

    } catch (error) {
      console.log(error);
    }

  };

  fetchRooms();
  fetchMyRooms();
  fetchPartners();

}, []);






useEffect(() => {

  if (!user) {
    setFavorites([]);
    return;
  }

  setFavorites(
    Array.isArray(user.favorites)
      ? user.favorites.map((favorite) =>
          typeof favorite === "object"
            ? String(favorite._id)
            : String(favorite)
        )
      : []
  );

}, [user]);




 console.log(user);

  return (
<>
  <ScrollToTop />

  {!isDashboard && <Navbar user={user} />}

  <AppRoutes
    rooms={rooms}
    setRooms={setRooms}
    user={user}
    favorites={favorites}
    setFavorites={setFavorites}
    partners={partners}
    setPartners={setPartners}
  />

  {!isDashboard && <Footer />}
</>
  );
}

export default App;