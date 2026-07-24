import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiCheckCircle,
  FiShield,
  FiUsers,
  FiHeart,
  FiDollarSign,
  FiSearch,
  FiHome,
  FiPlus,
  FiMinus,
} from "react-icons/fi";
import heroRoom from "../assets/home/hero-room.png";

import partnerCta from "../assets/home/partner-cta.png";


import RoomCard from "../components/RoomCard";
import "../styles/Home.css";

function Home({ user, rooms, favorites, setFavorites }) {

  const navigate = useNavigate();

const [location, setLocation] = useState("");
const [category, setCategory] = useState("");
const [maxPrice, setMaxPrice] = useState("");

const handleRoomSearch = () => {
  const params = new URLSearchParams();

  if (location.trim()) {
    params.set("location", location.trim());
  }

  if (category) {
    params.set("category", category);
  }

  if (maxPrice) {
    params.set("maxPrice", maxPrice);
  }

  const queryString = params.toString();

  navigate(queryString ? `/rooms?${queryString}` : "/rooms");
};

const latestRooms = rooms?.slice(-4).reverse() || [];

const [activeFaq, setActiveFaq] = useState(null);

const faqItems = [
  {
    question: "How do I list my room?",
    answer:
      "Simply create an owner account, click 'Add Room', fill in the room details, upload images, and publish your listing."
  },
  {
    question: "Is RoomRent free to use?",
    answer:
      "Yes. Browsing rooms, finding roommates, and connecting with owners are completely free."
  },
  {
    question: "Can I contact room owners directly?",
    answer:
      "Yes. RoomRent allows direct communication between renters and owners without involving brokers."
  },
  {
    question: "How do I find compatible roommates?",
    answer:
      "Use the Partner Finder section to browse roommate profiles based on location, budget, and lifestyle preferences."
  },
  {
    question: "Is my personal information secure?",
    answer:
      "Yes. Your account is protected with secure authentication, and your personal information is handled safely."
  }
];


  return (
    <div className="home-page">

      <section className="home-hero">

        <div className="hero-content">

          <div className="hero-trust-badge">
            <FiCheckCircle />
            <span>
              Find rooms and compatible roommates in one place
            </span>
          </div>

          <h1>
            Find Your Perfect Room
            <br />
            & Ideal <span>Roommate</span>
          </h1>

          <p className="hero-description">
            Discover affordable rooms, connect with trusted people,
            and find a comfortable place that matches your lifestyle.
          </p>

          <div className="hero-actions">

            <Link to="/rooms" className="hero-primary-btn">
              Browse Rooms
            </Link>

            {user?.role === "renter" && (
              <Link to="/partners" className="hero-secondary-btn">
                Find Partners
              </Link>
            )}

            {user?.role === "owner" && (
              <Link to="/add-room" className="hero-secondary-btn">
                List Your Room
              </Link>
            )}

            {!user && (
              <Link to="/signup" className="hero-secondary-btn">
                Get Started
              </Link>
            )}

          </div>

        </div>

      <div className="hero-visual">

  <div className="hero-image-wrapper">

    <img
      src={heroRoom}
      alt="Modern rental room"
      className="hero-room-image"
    />

  </div>

</div>

      </section>


      <section className="home-search-section">
  <div className="home-search-bar">

    <div className="home-search-field">
      <label>Location</label>

      <input
        type="text"
        placeholder="Search location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
    </div>

    <div className="home-search-field">
      <label>For</label>

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">Anyone</option>
        <option value="student">Student</option>
        <option value="professional">Professional</option>
      </select>
    </div>

    <div className="home-search-field">
      <label>Budget</label>

      <input
        type="number"
        placeholder="Max budget"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
      />
    </div>

    <button
      className="home-search-btn"
      onClick={handleRoomSearch}
    >
      Search
    </button>

  </div>
</section>


      <section className="home-features">

        <div className="home-feature-item">

          <div className="home-feature-icon">
            <FiShield />
          </div>

          <div>
            <h3>Room Listings</h3>
            <p>Explore available rooms based on your needs.</p>
          </div>

        </div>


        <div className="home-feature-item">

          <div className="home-feature-icon">
            <FiUsers />
          </div>

          <div>
            <h3>Find Partners</h3>
            <p>Connect with people looking for roommates.</p>
          </div>

        </div>


        <div className="home-feature-item">

          <div className="home-feature-icon">
            <FiDollarSign />
          </div>

          <div>
            <h3>Affordable Options</h3>
            <p>Discover rooms that match your budget.</p>
          </div>

        </div>


        <div className="home-feature-item">

          <div className="home-feature-icon">
            <FiHeart />
          </div>

          <div>
            <h3>Save Favorites</h3>
            <p>Keep your preferred rooms saved for later.</p>
          </div>

        </div>

      </section>

      <section className="popular-rooms-section">

  <div className="popular-rooms-header">
    <div>
     <h2>Latest Rooms</h2>
<p>Discover recently added rooms available for rent.</p>
    </div>

    <Link to="/rooms" className="view-all-rooms">
      View all rooms →
    </Link>
  </div>

{latestRooms.length === 0 ? (
    <div className="popular-rooms-empty">
      <h3>No rooms available yet</h3>
      <p>New room listings will appear here.</p>
    </div>
  ) : (
    <div className="popular-rooms-grid">
     {latestRooms.map((room) => (
        <RoomCard
          key={room._id}
          room={room}
          role={user?.role}
          favorites={favorites}
          setFavorites={setFavorites}
        />
      ))}
    </div>
  )}

</section>

<section className="partner-cta-section">

  <div className="partner-cta-content">

    <span className="partner-cta-badge">
      Find Your Perfect Roommate
    </span>

    <h2>
      Find a Compatible Roommate
      <br />
      Before You Move In
    </h2>

    <p>
      Connect with verified students and professionals
      looking for shared accommodation. Discover people
      with similar lifestyles, budgets, and preferences
      before choosing your next home.
    </p>

    <div className="partner-cta-features">

      <div>
        <FiCheckCircle />
        Verified partner profiles
      </div>

      <div>
        <FiCheckCircle />
        Smart roommate matching
      </div>

      <div>
        <FiCheckCircle />
        Safe & trusted community
      </div>

    </div>

    <Link
      to="/partners"
      className="partner-cta-button"
    >
      Find Partners
    </Link>

  </div>

  <div className="partner-cta-image">

    <img
      src={partnerCta}
      alt="Roommate Matching"
    />

  </div>

</section>

{/* ===================================================
    HOW ROOMRENT WORKS
=================================================== */}

<section className="how-section">

  <div className="how-header">

    <span className="how-badge">
      Simple Process
    </span>

    <h2>
      How RoomRent Works
    </h2>

    <p>
      Finding your next room is quick, simple, and completely
      hassle-free. Just follow these three easy steps.
    </p>

  </div>

  <div className="how-timeline">

    <div className="how-line"></div>

    <div className="how-card">

      <div className="how-circle">
        1
      </div>

     <div className="how-icon">
  <FiSearch />
</div>

      <h3>
        Search Rooms
      </h3>

      <p>
        Browse verified room listings using
        location, budget and category filters.
      </p>

    </div>

    <div className="how-card">

      <div className="how-circle">
        2
      </div>

      <div className="how-icon">
  <FiUsers />
</div>

      <h3>
        Connect
      </h3>

      <p>
        Contact room owners or compatible
        roommates directly without brokers.
      </p>

    </div>

    <div className="how-card">

      <div className="how-circle">
        3
      </div>

     <div className="how-icon">
  <FiHome />
</div>

      <h3>
        Move In
      </h3>

      <p>
        Finalize your room confidently and
        move into your new home with ease.
      </p>

    </div>

  </div>

</section>

{/* ===================================================
    WHY + FAQ SECTION
=================================================== */}

<section className="info-section">

  {/* ================= LEFT ================= */}

  <div className="why-wrapper">

    <section className="why-section">

      <div className="why-header">

        <span className="why-badge">
          Why Choose Us
        </span>

        <h2>
          Why Thousands Choose RoomRent
        </h2>

        <p>
          Everything you need to find a room or a compatible
          roommate — securely, quickly, and without brokerage.
        </p>

      </div>

      <div className="why-grid">

        <div className="why-card">

          <div className="why-icon">
            <FiShield />
          </div>

          <h3>Verified Listings</h3>

          <p>
            Every room listing is reviewed to provide
            authentic and reliable information.
          </p>

        </div>

        <div className="why-card">

          <div className="why-icon">
            <FiDollarSign />
          </div>

          <h3>No Brokerage</h3>

          <p>
            Connect directly with owners and avoid
            unnecessary brokerage fees.
          </p>

        </div>

        <div className="why-card">

          <div className="why-icon">
            <FiUsers />
          </div>

          <h3>Smart Roommates</h3>

          <p>
            Find compatible roommates based on your
            lifestyle and preferences.
          </p>

        </div>

        <div className="why-card">

          <div className="why-icon">
            <FiHeart />
          </div>

          <h3>Save Favorites</h3>

          <p>
            Bookmark rooms and compare them before
            making a final decision.
          </p>

        </div>

        <div className="why-card">

          <div className="why-icon">
            <FiCheckCircle />
          </div>

          <h3>Trusted Platform</h3>

          <p>
            Designed for students and professionals
            looking for safe rentals.
          </p>

        </div>

        <div className="why-card">

          <div className="why-icon">
            <FiUsers />
          </div>

          <h3>Direct Communication</h3>

          <p>
            Contact owners and roommates instantly
            without middlemen.
          </p>

        </div>

      </div>

    </section>

  </div>

  {/* ================= RIGHT ================= */}

  <div className="faq-wrapper">

    <section className="faq-section">

      <div className="faq-header">

        <span className="faq-badge">
          Frequently Asked Questions
        </span>

        <h2>
          Got Questions?
          <br />
          We've Got Answers.
        </h2>

        <p>
          Everything you need to know before finding
          your next room or roommate.
        </p>

      </div>

      <div className="faq-list">

        {faqItems.map((item, index) => (

          <div
            key={index}
            className={`faq-item ${
              activeFaq === index ? "active" : ""
            }`}
          >

            <button
              className="faq-question"
              onClick={() =>
                setActiveFaq(
                  activeFaq === index ? null : index
                )
              }
            >

              <span>{item.question}</span>

              {activeFaq === index
                ? <FiMinus />
                : <FiPlus />}

            </button>

            <div
              className={`faq-answer ${
                activeFaq === index ? "show" : ""
              }`}
            >

              <p>{item.answer}</p>

            </div>

          </div>

        ))}

      </div>

    </section>

  </div>

</section>

    </div>
  );
}


export default Home;