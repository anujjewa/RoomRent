import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import {
  FiMapPin,
  FiSearch,
  FiRefreshCw,
  FiShield,
  FiMessageCircle,
  FiSlash,
} from "react-icons/fi";

import RoomCard from "../components/RoomCard";

import "../styles/Rooms.css";

function Rooms({
  rooms,
  setRooms,
  user,
  favorites,
  setFavorites,
}) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState(
    searchParams.get("location") || ""
  );

  const [category, setCategory] = useState(
    searchParams.get("category") || ""
  );

  const [maxPrice, setMaxPrice] = useState(
    searchParams.get("maxPrice") || ""
  );

  const [sortOrder, setSortOrder] = useState("");

  const filteredRooms = rooms.filter((room) => {
    const matchesLocation = room.location
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "" || room.category === category;

    const matchesPrice =
      maxPrice === "" || room.price <= Number(maxPrice);

    return (
      matchesLocation &&
      matchesCategory &&
      matchesPrice
    );
  });

 const sortedRooms = [...filteredRooms].sort((a, b) => {
  // Owner ke apne rooms ko sabse pehle show karo
  if (user?.role === "owner") {
    const aOwnerId =
      typeof a.owner === "object"
        ? a.owner?._id
        : a.owner;

    const bOwnerId =
      typeof b.owner === "object"
        ? b.owner?._id
        : b.owner;

    const isARoomMine =
      String(aOwnerId) === String(user?._id);

    const isBRoomMine =
      String(bOwnerId) === String(user?._id);

    if (isARoomMine && !isBRoomMine) {
      return -1;
    }

    if (!isARoomMine && isBRoomMine) {
      return 1;
    }
  }

  // Selected price sorting
  if (sortOrder === "low") {
    return Number(a.price) - Number(b.price);
  }

  if (sortOrder === "high") {
    return Number(b.price) - Number(a.price);
  }

  return 0;
});

  const handleReset = () => {
    setSearch("");
    setCategory("");
    setMaxPrice("");
    setSortOrder("");

    setSearchParams({});
  };

  return (
    <div className="rooms-page">

      {/* PAGE HEADER */}

     <section className="rooms-hero">

    <div className="rooms-hero-content">

        <span className="rooms-badge">

            Verified Listings

        </span>

        <h1>

            Browse Rooms

        </h1>

        <p>

            Explore verified rooms that match your
            budget, lifestyle and preferred location.

        </p>

    

    </div>

</section>


      {/* FILTER WORKSPACE */}

      <section className="rooms-filter-section">

        <div className="rooms-filter-card">

          <div className="rooms-filter-title">

  <div>

    <h3>Find Your Ideal Room</h3>

<p>
  Search verified rooms by location, category and monthly budget.
</p>

  </div>

</div>

          

          <div className="rooms-primary-filters">

            <div className="rooms-location-field">

              <FiMapPin />

              <input
                type="text"
                placeholder="Search location (e.g. Bhopal)"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

            </div>

            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
            >
              <option value="">All Categories</option>
              <option value="student">Student</option>
              <option value="professional">
                Working Professional
              </option>
              <option value="all">Anyone</option>
            </select>

            <input
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) =>
                setMaxPrice(e.target.value)
              }
            />

           <button
  className="rooms-search-btn"
  onClick={() => window.scrollTo({
    top: document.querySelector(".rooms-results")?.offsetTop - 90,
    behavior: "smooth"
  })}
>
              <FiSearch />

              Search

            </button>

          </div>


          <div className="rooms-secondary-filters">

            <div className="rooms-category-chips">

              <button
                className={
                  category === ""
                    ? "filter-chip active"
                    : "filter-chip"
                }
                onClick={() => setCategory("")}
              >
                All
              </button>

              <button
                className={
                  category === "student"
                    ? "filter-chip active"
                    : "filter-chip"
                }
                onClick={() =>
                  setCategory("student")
                }
              >
                Student
              </button>

              <button
                className={
                  category === "professional"
                    ? "filter-chip active"
                    : "filter-chip"
                }
                onClick={() =>
                  setCategory("professional")
                }
              >
                Working Professional
              </button>

              <button
                className={
                  category === "all"
                    ? "filter-chip active"
                    : "filter-chip"
                }
                onClick={() =>
                  setCategory("all")
                }
              >
                Anyone
              </button>

            </div>


            <div className="rooms-filter-actions">

              <select
                value={sortOrder}
                onChange={(e) =>
                  setSortOrder(e.target.value)
                }
              >
                <option value="">
                  Sort by: Recommended
                </option>

                <option value="low">
                  Price: Low to High
                </option>

                <option value="high">
                  Price: High to Low
                </option>

              </select>

              <button
                className="rooms-reset-btn"
                onClick={handleReset}
                disabled={
                  !search &&
                  !category &&
                  !maxPrice &&
                  !sortOrder
                }
              >
                <FiRefreshCw />

                Reset
              </button>

            </div>

          </div>

        </div>

      </section>


      {/* ROOM RESULTS */}

      <main className="rooms-results">

     <div className="rooms-results-header">

  <div>

    <span className="results-badge">

      Browse Results

    </span>

    <h2>

      {sortedRooms.length} Verified{" "}

      {sortedRooms.length === 1
        ? "Room"
        : "Rooms"}

    </h2>

    <p>

      {search
        ? `Showing rooms available in ${search}.`
        : "Showing all verified room listings."}

    </p>

  </div>

</div>


        {sortedRooms.length === 0 ? (

          <div className="rooms-empty-state">

            <div className="rooms-empty-icon">

              <FiSearch />

            </div>

            <h2>No rooms found</h2>

            <p>
              We couldn't find rooms matching your current
              filters. Try changing your search criteria.
            </p>

            <button onClick={handleReset}>
              Clear all filters
            </button>

          </div>

        ) : (

          <div className="rooms-grid">

            {sortedRooms.map((room) => (

              <RoomCard
                key={room._id}
                room={room}
                setRooms={setRooms}
                role={user?.role}
                favorites={favorites}
                setFavorites={setFavorites}
              />

            ))}

          </div>

        )}

      </main>


      {/* TRUST STRIP */}

      <section className="rooms-trust-strip">

        <div className="rooms-trust-item">

          <div className="rooms-trust-icon">
            <FiShield />
          </div>

          <div>
            <h3>Verified Rooms</h3>

            <p>
              Explore trusted room listings.
            </p>
          </div>

        </div>


        <div className="rooms-trust-item">

          <div className="rooms-trust-icon">
            <FiMessageCircle />
          </div>

          <div>
            <h3>Direct Connections</h3>

            <p>
              Connect with room owners directly.
            </p>
          </div>

        </div>


        <div className="rooms-trust-item">

          <div className="rooms-trust-icon">
            <FiSlash />
          </div>

          <div>
            <h3>No Brokerage</h3>

            <p>
              Find rooms without hidden charges.
            </p>
          </div>

        </div>

      </section>

    </div>
  );
}

export default Rooms;