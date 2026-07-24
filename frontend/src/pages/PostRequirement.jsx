import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import Cropper from "react-easy-crop";

import {
  FiUpload,
  FiEdit2,
  FiUser,
  FiImage,
  FiMapPin,
  FiBriefcase,
  FiPhone,
  FiUsers,
  FiSave,
  FiX,
  FiZoomIn,
} from "react-icons/fi";

import "../styles/PostRequirement.css";
import toast from "react-hot-toast";

function PostRequirement() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [partnerData, setPartnerData] = useState({
    name: "",
    age: "",
    location: "",
    occupation: "",
    genderPreference: "",
    contact: "",
    description: "",
    image: "",
  });

  const [selectedImage, setSelectedImage] = useState(null);

  const [croppedImage, setCroppedImage] = useState(null);

  const [croppedImageFile, setCroppedImageFile] =
    useState(null);

  const [showCropper, setShowCropper] = useState(false);

  const [crop, setCrop] = useState({
    x: 0,
    y: 0,
  });

  const [zoom, setZoom] = useState(1);

  const [croppedAreaPixels, setCroppedAreaPixels] =
    useState(null);

  useEffect(() => {
    fetchMyProfile();
  }, []);

  const fetchMyProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/partners/my-listing`,
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

      setPartnerData(data);
    } catch (error) {
      console.log(
        "Fetch partner profile error:",
        error
      );
    }
  };

  const onCropComplete = useCallback(
    (croppedArea, croppedPixels) => {
      setCroppedAreaPixels(croppedPixels);
    },
    []
  );

  const createImage = (imageUrl) => {
    return new Promise((resolve, reject) => {
      const image = new Image();

      image.addEventListener("load", () =>
        resolve(image)
      );

      image.addEventListener("error", (error) =>
        reject(error)
      );

      image.src = imageUrl;
    });
  };

  const getCroppedImage = async (
    imageSource,
    pixelCrop
  ) => {
    const image = await createImage(imageSource);

    const canvas = document.createElement("canvas");

    const context = canvas.getContext("2d");

    const outputSize = 800;

    canvas.width = outputSize;
    canvas.height = outputSize;

    context.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      outputSize,
      outputSize
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(
              new Error(
                "Unable to create cropped image"
              )
            );

            return;
          }

          const file = new File(
            [blob],
            `partner-profile-${Date.now()}.jpg`,
            {
              type: "image/jpeg",
            }
          );

          resolve({
            file,
            previewUrl: URL.createObjectURL(blob),
          });
        },
        "image/jpeg",
        0.9
      );
    });
  };

  const handleImage = (event) => {
    const file = event.target.files?.[0];

    event.target.value = "";

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");

      return;
    }

    const maximumFileSize = 10 * 1024 * 1024;

    if (file.size > maximumFileSize) {
      toast.error("Image size should be less than 10 MB.");

      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setSelectedImage(reader.result);

      setCrop({
        x: 0,
        y: 0,
      });

      setZoom(1);

      setCroppedAreaPixels(null);

      setShowCropper(true);
    };

    reader.onerror = () => {
      toast.error("Unable to read selected image.");
    };

    reader.readAsDataURL(file);
  };

  const handleApplyCrop = async () => {
    if (
      !selectedImage ||
      !croppedAreaPixels
    ) {
      return;
    }

    try {
      const result = await getCroppedImage(
        selectedImage,
        croppedAreaPixels
      );

      if (
        croppedImage &&
        croppedImage.startsWith("blob:")
      ) {
        URL.revokeObjectURL(croppedImage);
      }

      setCroppedImage(result.previewUrl);

      setCroppedImageFile(result.file);

      setShowCropper(false);

      setSelectedImage(null);

      setZoom(1);

      setCrop({
        x: 0,
        y: 0,
      });
    } catch (error) {
      console.log("Crop image error:", error);

      toast.error("Unable to crop image.");
    }
  };

  const handleCancelCrop = () => {
    setShowCropper(false);

    setSelectedImage(null);

    setZoom(1);

    setCrop({
      x: 0,
      y: 0,
    });

    setCroppedAreaPixels(null);
  };

  const handleSubmit = async () => {
    if (
      !partnerData.name?.trim() ||
      !partnerData.age ||
      !partnerData.location?.trim() ||
      !partnerData.occupation?.trim() ||
      !partnerData.genderPreference ||
      !partnerData.contact?.trim() ||
      !partnerData.description?.trim()
    ) {
      toast.error("Please fill all fields.");

      return;
    }

    if (
      !partnerData._id &&
      !croppedImageFile
    ) {
      toast.error("Please select and crop a profile photo.");

      return;
    }

    if (Number(partnerData.age) < 18) {
      toast.error("Age should be at least 18.");

      return;
    }

    const contactNumber =
      partnerData.contact.replace(/\D/g, "");

    if (contactNumber.length !== 10) {
      toast.error("Enter a valid 10 digit mobile number.");

      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const formData = new FormData();

      formData.append(
        "name",
        partnerData.name.trim()
      );

      formData.append(
        "age",
        partnerData.age
      );

      formData.append(
        "location",
        partnerData.location.trim()
      );

      formData.append(
        "occupation",
        partnerData.occupation.trim()
      );

      formData.append(
        "genderPreference",
        partnerData.genderPreference
      );

      formData.append(
        "contact",
        contactNumber
      );

      formData.append(
        "description",
        partnerData.description.trim()
      );

      if (croppedImageFile) {
        formData.append(
          "image",
          croppedImageFile
        );
      }

      const response = await fetch(
        partnerData._id
          ? `${import.meta.env.VITE_API_URL}/partners/my-listing`
          : `${import.meta.env.VITE_API_URL}/partners`,
        {
          method: partnerData._id
            ? "PUT"
            : "POST",

          headers: {
            Authorization: `Bearer ${token}`,
          },

          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(
          data.message ||
            "Unable to save profile."
        );

        return;
      }

    toast.success(
  partnerData._id
    ? "Profile updated successfully"
    : "Profile created successfully"
);

      navigate("/my-requirement");
    } catch (error) {
      console.log(
        "Save partner profile error:",
        error
      );

      toast.success(
        "Something went wrong while saving profile."
      );
    } finally {
      setLoading(false);
    }
  };

  const profilePreview =
    croppedImage || partnerData.image;

  return (
    <main className="post-page">
      <section className="post-card">
        <div className="post-header">
          <div>
            <h1>
              {partnerData._id
                ? "Edit Partner Profile"
                : "Create Partner Profile"}
            </h1>

            <p className="subtitle">
              {partnerData._id
                ? "Keep your profile updated so people can easily connect with you."
                : "Tell other users about yourself so they can find a compatible room partner."}
            </p>
          </div>

          {partnerData._id && (
            <span className="editing-badge">
              <FiEdit2 />

              Editing Profile
            </span>
          )}
        </div>

        <div className="profile-upload-card">
          <div className="upload-preview">
            {profilePreview ? (
              <img
                src={profilePreview}
                alt="Profile preview"
                className="partner-preview"
              />
            ) : (
              <div className="empty-preview">
                <FiUser />
              </div>
            )}
          </div>

          <div className="upload-content">
            <h3>
              <FiImage />

              Profile Photo
            </h3>

            <p>
              Upload a clear profile picture. You can
              move and zoom the image before applying
              the crop.
            </p>

            <label className="custom-upload-button">
              <FiUpload />

              {profilePreview
                ? "Change Photo"
                : "Choose Photo"}

              <input
                type="file"
                accept="image/*"
                onChange={handleImage}
                hidden
              />
            </label>
          </div>
        </div>

        <div className="form-grid">
          <div className="field">
            <label>
              Full Name
              <span className="required">*</span>
            </label>

            <input
              type="text"
              placeholder="Enter full name"
              value={partnerData.name || ""}
              onChange={(event) =>
                setPartnerData({
                  ...partnerData,
                  name: event.target.value,
                })
              }
            />
          </div>

          <div className="field">
            <label>Age</label>

            <input
              type="number"
              min="18"
              placeholder="Age"
              value={partnerData.age || ""}
              onChange={(event) =>
                setPartnerData({
                  ...partnerData,
                  age: event.target.value,
                })
              }
            />
          </div>

          <div className="field">
            <label>
              <FiMapPin />

              Location
            </label>

            <input
              type="text"
              placeholder="City"
              value={partnerData.location || ""}
              onChange={(event) =>
                setPartnerData({
                  ...partnerData,
                  location: event.target.value,
                })
              }
            />
          </div>

          <div className="field">
            <label>
              <FiBriefcase />

              Occupation
            </label>

            <input
              type="text"
              placeholder="Student / Working Professional"
              value={partnerData.occupation || ""}
              onChange={(event) =>
                setPartnerData({
                  ...partnerData,
                  occupation: event.target.value,
                })
              }
            />
          </div>  
                    <div className="field">
            <label>
              <FiUsers />

              Gender Preference
            </label>

            <select
              value={
                partnerData.genderPreference || ""
              }
              onChange={(event) =>
                setPartnerData({
                  ...partnerData,
                  genderPreference:
                    event.target.value,
                })
              }
            >
              <option value="">
                Select Preference
              </option>

              <option value="Male">
                Male
              </option>

              <option value="Female">
                Female
              </option>

              <option value="No Preference">
                No Preference
              </option>
            </select>
          </div>

          <div className="field">
            <label>
              <FiPhone />

              Contact Number
            </label>

            <input
              type="tel"
              placeholder="9876543210"
              value={partnerData.contact || ""}
              onChange={(event) =>
                setPartnerData({
                  ...partnerData,
                  contact: event.target.value,
                })
              }
            />
          </div>

          <div className="field full-width">
            <label>About Yourself</label>

            <textarea
              placeholder="Tell other users about yourself, your lifestyle, expectations and preferences..."
              value={
                partnerData.description || ""
              }
              onChange={(event) =>
                setPartnerData({
                  ...partnerData,
                  description:
                    event.target.value,
                })
              }
            />
          </div>
        </div>

        <div className="post-actions">
          {partnerData._id && (
            <button
              type="button"
              className="cancel-button"
              onClick={() =>
                navigate("/my-requirement")
              }
              disabled={loading}
            >
              <FiX />

              Cancel
            </button>
          )}

          <button
            type="button"
            className="submit-button"
            onClick={handleSubmit}
            disabled={loading}
          >
            <FiSave />

            {loading
              ? partnerData._id
                ? "Updating..."
                : "Creating..."
              : partnerData._id
              ? "Save Changes"
              : "Create Profile"}
          </button>
        </div>
      </section>

      {showCropper && selectedImage && (
        <div
          className="crop-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Crop profile photo"
        >
          <section className="crop-modal">
            <div className="crop-modal-header">
              <div>
                <h2>Crop Profile Photo</h2>

                <p>
                  Move the image and adjust zoom to
                  choose your profile photo.
                </p>
              </div>

              <button
                type="button"
                className="crop-close-button"
                onClick={handleCancelCrop}
                aria-label="Close crop editor"
              >
                <FiX />
              </button>
            </div>

            <div className="crop-container">
              <Cropper
                image={selectedImage}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                showGrid={false}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>

            <div className="crop-controls">
              <div className="crop-zoom-control">
                <FiZoomIn />

                <span>Zoom</span>

                <input
                  type="range"
                  min={1}
                  max={3}
                  step={0.1}
                  value={zoom}
                  onChange={(event) =>
                    setZoom(
                      Number(event.target.value)
                    )
                  }
                />
              </div>

              <div className="crop-modal-actions">
                <button
                  type="button"
                  className="crop-cancel-button"
                  onClick={handleCancelCrop}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="crop-apply-button"
                  onClick={handleApplyCrop}
                >
                  <FiImage />

                  Apply Crop
                </button>
              </div>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}

export default PostRequirement;