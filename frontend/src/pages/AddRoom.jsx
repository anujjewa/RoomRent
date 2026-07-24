import { useEffect, useState } from "react";
import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import {
  FiHome,
  FiMapPin,
  FiPhone,
  FiUploadCloud,
  FiX,
  FiCheck,
  FiInfo,
} from "react-icons/fi";

import "../styles/AddRoom.css";
import toast from "react-hot-toast";

const AMENITIES = [
  {
    value: "wifi",
    label: "WiFi",
  },
  {
    value: "parking",
    label: "Parking",
  },
  {
    value: "water-supply",
    label: "Water Supply",
  },
  {
    value: "kitchen",
    label: "Kitchen",
  },
  {
    value: "security",
    label: "Security",
  },
  {
    value: "power-backup",
    label: "Power Backup",
  },
];

const initialFormData = {
  title: "",
  location: "",
  price: "",
  category: "",
  description: "",
  contact: "",

  roomType: "",
  bedrooms: 1,
  bathrooms: 1,
  furnishing: "unfurnished",
  area: "",
  floor: "",

  amenities: [],

  images: [],
};

function AddRoom({ rooms, setRooms }) {
  const [formData, setFormData] =
    useState(initialFormData);

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);

  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const editId = searchParams.get("edit");

  const isEditMode = Boolean(editId);


  /* =========================
     LOAD ROOM FOR EDIT
  ========================= */

  useEffect(() => {
    if (!editId || !rooms?.length) {
      return;
    }

    const roomToEdit = rooms.find(
      (room) =>
        String(room._id) === String(editId)
    );

    if (!roomToEdit) {
      return;
    }

    setFormData({
      title: roomToEdit.title || "",

      location: roomToEdit.location || "",

      price: roomToEdit.price || "",

      category: roomToEdit.category || "",

      description:
        roomToEdit.description || "",

      contact: roomToEdit.contact || "",

      roomType: roomToEdit.roomType || "",

      bedrooms: roomToEdit.bedrooms ?? 1,

      bathrooms: roomToEdit.bathrooms ?? 1,

      furnishing:
        roomToEdit.furnishing ||
        "unfurnished",

      area: roomToEdit.area || "",

      floor: roomToEdit.floor ?? "",

      amenities:
        roomToEdit.amenities || [],

      images: roomToEdit.images || [],
    });
  }, [editId, rooms]);




  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,

      [name]: value,
    }));
  };


  

  const handleAmenityChange = (amenity) => {
    setFormData((prev) => {
      const isSelected =
        prev.amenities.includes(amenity);

      return {
        ...prev,

        amenities: isSelected
          ? prev.amenities.filter(
              (item) => item !== amenity
            )
          : [...prev.amenities, amenity],
      };
    });
  };


  

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () =>
        resolve(reader.result);

      reader.onerror = reject;
    });
  };


  const handleImages = (e) => {
    const selectedFiles = Array.from(
      e.target.files
    );

    setFormData((prev) => ({
      ...prev,

      images: [
        ...prev.images,
        ...selectedFiles,
      ],
    }));

    e.target.value = "";
  };


  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,

      images: prev.images.filter(
        (_, imageIndex) =>
          imageIndex !== index
      ),
    }));
  };


  const getImagePreview = (image) => {
    if (typeof image === "string") {
      return image;
    }

    return URL.createObjectURL(image);
  };


  

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const processedImages =
        await Promise.all(
          formData.images.map((image) => {
            if (typeof image === "string") {
              return image;
            }

            return convertToBase64(image);
          })
        );

      const token =
        localStorage.getItem("token");

      const roomPayload = {
        ...formData,

        price: Number(formData.price),

        bedrooms: Number(
          formData.bedrooms
        ),

        bathrooms: Number(
          formData.bathrooms
        ),

        area: formData.area
          ? Number(formData.area)
          : undefined,

        floor:
          formData.floor !== ""
            ? Number(formData.floor)
            : undefined,

        images: processedImages,
      };

      const endpoint = isEditMode
        ? `${import.meta.env.VITE_API_URL}/rooms/${editId}`
        : `${import.meta.env.VITE_API_URL}/rooms`;

      const response = await fetch(endpoint, {
        method: isEditMode ? "PUT" : "POST",

        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(roomPayload),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(
          data.message ||
            "Unable to save room"
        );

        return;
      }

      if (isEditMode) {
        setRooms((prev) =>
          prev.map((room) =>
            room._id === editId
              ? data
              : room
          )
        );
      } else {
        setRooms((prev) => [
          ...prev,
          data,
        ]);
      }

      setSuccess(true);

      setFormData(initialFormData);

      navigate(
        isEditMode
          ? `/rooms/${data._id}`
          : "/rooms"
      );
    } catch (error) {
      console.error(
        "Room save error:",
        error
      );

      toast.error(
        "Something went wrong while saving the room."
      );
    } finally {
      setLoading(false);
    }
  };


  return (
    <main className="add-room-page">

      <div className="add-room-shell">

        <header className="add-room-header">

          <span className="add-room-header-label">
            Room Listing
          </span>

          <h1>
            {isEditMode
              ? "Update Your Room"
              : "List Your Room"}
          </h1>

          <p>
            {isEditMode
              ? "Update your room information and keep your listing accurate."
              : "Add accurate property details to help renters find the right room."}
          </p>

        </header>


        {success && (
          <div className="add-room-success">
            <FiCheck />

            Room saved successfully.
          </div>
        )}


        <form
          className="add-room-form"
          onSubmit={handleSubmit}
        >

          {/* BASIC INFORMATION */}

          <section className="add-room-form-section">

            <div className="form-section-header">

              <div className="form-section-icon">
                <FiHome />
              </div>

              <div>
                <h2>Basic Information</h2>

                <p>
                  Add the main details about your
                  room listing.
                </p>
              </div>

            </div>


            <div className="add-room-fields">

              <div className="add-room-field add-room-field-full">

                <label htmlFor="title">
                  Room Title
                </label>

                <input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Example: 2 BHK Apartment near LNCT"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />

              </div>


              <div className="add-room-field add-room-field-full">

                <label htmlFor="location">
                  Location
                </label>

                <div className="input-with-icon">

                  <FiMapPin />

                  <input
                    id="location"
                    name="location"
                    type="text"
                    placeholder="Area, City"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />

                </div>

              </div>


              <div className="add-room-field">

                <label htmlFor="price">
                  Monthly Rent
                </label>

                <div className="input-with-icon">

                 
<div className="price-input-wrapper">

  <span className="rupee-input-icon">
    ₹
  </span>

  <input
    id="price"
    name="price"
    type="number"
    min="0"
    placeholder="12000"
    value={formData.price}
    onChange={handleChange}
    required
  />

</div>

                </div>

              </div>


              <div className="add-room-field">

                <label htmlFor="contact">
                  Contact Number
                </label>

                <div className="input-with-icon">

                  <FiPhone />

                  <input
                    id="contact"
                    name="contact"
                    type="tel"
                    placeholder="9876543210"
                    value={formData.contact}
                    onChange={handleChange}
                    required
                  />

                </div>

              </div>


              <div className="add-room-field">

                <label htmlFor="category">
                  Suitable For
                </label>

                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Select category
                  </option>

                  <option value="student">
                    Student
                  </option>

                  <option value="professional">
                    Working Professional
                  </option>

                </select>

              </div>


              <div className="add-room-field">

                <label htmlFor="roomType">
                  Room Type
                </label>

                <select
                  id="roomType"
                  name="roomType"
                  value={formData.roomType}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Select room type
                  </option>

                  <option value="single">
                    Single Room
                  </option>

                  <option value="shared">
                    Shared Room
                  </option>

                  <option value="1bhk">
                    1 BHK
                  </option>

                  <option value="2bhk">
                    2 BHK
                  </option>

                  <option value="3bhk">
                    3 BHK
                  </option>

                  <option value="pg">
                    PG
                  </option>

                </select>

              </div>


              <div className="add-room-field add-room-field-full">

                <label htmlFor="description">
                  Description
                </label>

                <textarea
                  id="description"
                  name="description"
                  placeholder="Describe the room, nearby places and important details..."
                  value={formData.description}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>

          </section>


          {/* PROPERTY DETAILS */}

          <section className="add-room-form-section">

            <div className="form-section-header">

              <div className="form-section-icon">
                <FiInfo />
              </div>

              <div>
                <h2>Property Details</h2>

                <p>
                  Provide additional information
                  about the property.
                </p>
              </div>

            </div>


            <div className="add-room-fields add-room-property-grid">

              <div className="add-room-field">

                <label htmlFor="bedrooms">
                  Bedrooms
                </label>

                <input
                  id="bedrooms"
                  name="bedrooms"
                  type="number"
                  min="0"
                  value={formData.bedrooms}
                  onChange={handleChange}
                />

              </div>


              <div className="add-room-field">

                <label htmlFor="bathrooms">
                  Bathrooms
                </label>

                <input
                  id="bathrooms"
                  name="bathrooms"
                  type="number"
                  min="0"
                  value={formData.bathrooms}
                  onChange={handleChange}
                />

              </div>


              <div className="add-room-field">

                <label htmlFor="furnishing">
                  Furnishing
                </label>

                <select
                  id="furnishing"
                  name="furnishing"
                  value={formData.furnishing}
                  onChange={handleChange}
                >
                  <option value="furnished">
                    Furnished
                  </option>

                  <option value="semi-furnished">
                    Semi-Furnished
                  </option>

                  <option value="unfurnished">
                    Unfurnished
                  </option>

                </select>

              </div>


              <div className="add-room-field">

                <label htmlFor="area">
                  Area (sq.ft.)
                </label>

                <input
                  id="area"
                  name="area"
                  type="number"
                  min="0"
                  placeholder="850"
                  value={formData.area}
                  onChange={handleChange}
                />

              </div>


              <div className="add-room-field">

                <label htmlFor="floor">
                  Floor
                </label>

                <input
                  id="floor"
                  name="floor"
                  type="number"
                  min="0"
                  placeholder="0 for ground floor"
                  value={formData.floor}
                  onChange={handleChange}
                />

              </div>

            </div>

          </section>


          {/* AMENITIES */}

          <section className="add-room-form-section">

            <div className="form-section-header">

              <div className="form-section-icon">
                <FiCheck />
              </div>

              <div>
                <h2>Amenities</h2>

                <p>
                  Select the facilities available
                  with this room.
                </p>
              </div>

            </div>


            <div className="amenities-selection-grid">

              {AMENITIES.map((amenity) => {

                const isSelected =
                  formData.amenities.includes(
                    amenity.value
                  );

                return (
                  <button
                    key={amenity.value}
                    type="button"
                    className={`amenity-selection-item ${
                      isSelected
                        ? "amenity-selection-active"
                        : ""
                    }`}
                    onClick={() =>
                      handleAmenityChange(
                        amenity.value
                      )
                    }
                  >

                    <span className="amenity-checkbox">

                      {isSelected && <FiCheck />}

                    </span>

                    {amenity.label}

                  </button>
                );
              })}

            </div>

          </section>


          {/* IMAGES */}

          <section className="add-room-form-section">

            <div className="form-section-header">

              <div className="form-section-icon">
                <FiUploadCloud />
              </div>

              <div>
                <h2>Room Photos</h2>

                <p>
                  Upload clear photos of the room
                  and property.
                </p>
              </div>

            </div>


            <label
              htmlFor="roomImages"
              className="room-upload-box"
            >

              <FiUploadCloud />

              <h3>
                Click to upload room photos
              </h3>

              <p>
                PNG, JPG or JPEG images
              </p>

              <span>
                {formData.images.length} photo(s)
                selected
              </span>

            </label>


            <input
              id="roomImages"
              type="file"
              multiple
              accept="image/*"
              hidden
              onChange={handleImages}
            />


            {formData.images.length > 0 && (

              <div className="room-image-preview-grid">

                {formData.images.map(
                  (image, index) => (

                    <div
                      className="room-image-preview-card"
                      key={index}
                    >

                      <img
                        src={getImagePreview(image)}
                        alt={`Room preview ${index + 1}`}
                      />

                      <button
                        type="button"
                        className="remove-room-image"
                        onClick={() =>
                          removeImage(index)
                        }
                        aria-label="Remove image"
                      >
                        <FiX />
                      </button>

                      {index === 0 && (
                        <span className="primary-image-label">
                          Cover Photo
                        </span>
                      )}

                    </div>

                  )
                )}

              </div>

            )}

          </section>


          {/* SUBMIT */}

          <div className="add-room-submit-section">

            <div>

              <h3>
                {isEditMode
                  ? "Ready to update?"
                  : "Ready to publish?"}
              </h3>

              <p>
                Make sure all room information is
                accurate before saving.
              </p>

            </div>


            <button
              type="submit"
              className="save-room-button"
              disabled={loading}
            >
              {loading
                ? "Saving Room..."
                : isEditMode
                ? "Update Room"
                : "Publish Room"}
            </button>

          </div>

        </form>

      </div>

    </main>
  );
}

export default AddRoom;