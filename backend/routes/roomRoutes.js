const protect = require("../middleware/authMiddleware");
const authorizeRole = require("../middleware/roleMiddleware");

const express = require("express");

const router = express.Router();

const {
    getRooms,
    getRoomById,
    getMyRooms,
    createRoom,
    updateRoom,
    deleteRoom,
    incrementRoomView,
} = require("../controllers/roomController");

router.get("/", getRooms);

router.get(
    "/my-rooms",
    protect,
    authorizeRole("owner"),
    getMyRooms
);

router.patch("/:id/view", incrementRoomView);

router.get("/:id", getRoomById);

router.post("/", protect, authorizeRole("owner"), createRoom);

router.put(
    "/:id",
    protect,
    authorizeRole("owner"),
    updateRoom
);

router.delete(
    "/:id",
    protect,
    authorizeRole("owner"),
    deleteRoom
);

module.exports = router;