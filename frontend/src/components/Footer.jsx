import { Link } from "react-router-dom";

import {
  FiHome,
  FiGrid,
  FiUsers,
  FiHeart,
  FiUser,
  FiHelpCircle,
  FiShield,
  FiFileText,
  FiInfo,
  FiMapPin,
  FiMail,
  FiPhone,
  FiClock,
} from "react-icons/fi";

import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaXTwitter,
  FaReact,
  FaNodeJs,
} from "react-icons/fa6";

import { SiExpress, SiMongodb } from "react-icons/si";

import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* ===========================
            BRAND
        ========================== */}

        <div className="footer-column footer-brand">

          <div className="footer-logo">

            <div className="footer-logo-icon">
              RR
            </div>

            <h2>
              Room<span>Rent</span>
            </h2>

          </div>

          <p>
            Helping students and professionals
            find verified rooms and compatible
            roommates with ease.
          </p>

          <div className="footer-trust-card">

            <div className="footer-stars">
              ★★★★★
            </div>

            <div className="footer-trust-users">

              <div className="footer-user-group">

                <span></span>
                <span></span>
                <span></span>

              </div>

              <p>
                Trusted by 1000+ renters
              </p>

            </div>

          </div>

        </div>

        {/* ===========================
            QUICK LINKS
        ========================== */}

        <div className="footer-column">

          <h3>Quick Links</h3>

          <Link to="/">
            <FiHome />
            Home
          </Link>

          <Link to="/rooms">
            <FiGrid />
            Browse Rooms
          </Link>

          <Link to="/partners">
            <FiUsers />
            Partners
          </Link>

          <Link to="/favorites">
            <FiHeart />
            Favorites
          </Link>

          <Link to="/dashboard">
            <FiUser />
            Dashboard
          </Link>

        </div>

        {/* ===========================
            RESOURCES
        ========================== */}

        <div className="footer-column">

          <h3>Resources</h3>

          <a href="#">
            <FiHelpCircle />
            Help Center
          </a>

          <a href="#">
            <FiFileText />
            FAQs
          </a>

          <a href="#">
            <FiShield />
            Privacy Policy
          </a>

          <a href="#">
            <FiFileText />
            Terms of Service
          </a>

          <a href="#">
            <FiInfo />
            About Us
          </a>

        </div>

        {/* ===========================
            CONTACT
        ========================== */}

        <div className="footer-column">

          <h3>Contact Us</h3>

          <div className="footer-contact">

            <p>

              <FiMapPin />

              Bhopal, Madhya Pradesh, India

            </p>

            <p>

              <FiMail />

              support@roomrent.com

            </p>

            <p>

              <FiPhone />

              +91 90000 00000

            </p>

            <p>

              <FiClock />

              Mon - Sat: 9:00 AM - 8:00 PM

            </p>

          </div>

          <h4>
            Follow Us
          </h4>

          <div className="footer-social">

            <a href="#">
              <FaGithub />
            </a>

            <a href="#">
              <FaLinkedin />
            </a>

            <a href="#">
              <FaInstagram />
            </a>

            <a href="#">
              <FaXTwitter />
            </a>

          </div>

        </div>

      </div>

      {/* ===========================
          BOTTOM
      ========================== */}

      <div className="footer-bottom">

        <p>
          © 2026 <strong>RoomRent.</strong> All rights reserved.
        </p>

        <div className="footer-tech">

          <span>
            ♡ Built with
          </span>

          <span className="footer-heart">
            ❤
          </span>

          <span>
            using
          </span>

          <span>
            <FaReact />
            React
          </span>

          <span>
            <FaNodeJs />
            Node.js
          </span>

          <span>
            <SiExpress />
            Express
          </span>

          <span>
            <SiMongodb />
            MongoDB
          </span>

        </div>

      </div>

    </footer>
  );
}

export default Footer;