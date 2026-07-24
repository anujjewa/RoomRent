const Room = require("../models/Room");

const getRooms = async (req, res) => {
    try {
       const rooms = await Room.find().populate(
    "owner",
    "name email"
);

        res.status(200).json(rooms);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const getRoomById = async (req, res) => {
    try {
       const room = await Room.findById(req.params.id).populate(
    "owner",
    "name email"
);

        res.status(200).json(room);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const createRoom = async (req, res) => {
    try {
        const room = await Room.create({
                 ...req.body,
                owner: req.user.id,
        });

        res.status(201).json(room);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const updateRoom = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);

        if (!room) {
            return res.status(404).json({
                message: "Room Not Found",
            });
        }

        if (room.owner.toString() !== req.user.id) {
            return res.status(403).json({
                message: "Access Denied",
            });
        }

        const updatedRoom = await Room.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
              new: true,
              runValidators: true,
            }// 
        );

        res.status(200).json(updatedRoom);

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const deleteRoom = async (req, res) => {
    try {

        const room = await Room.findById(req.params.id);

        if (!room) {
            return res.status(404).json({
                message: "Room Not Found",
            });
        }

        if (room.owner.toString() !== req.user.id) {
            return res.status(403).json({
                message: "Access Denied",
            });
        }

        await Room.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Room Deleted Successfully",
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const getMyRooms = async (req, res) => {

    try{

        const rooms = await Room.find({
            owner:req.user.id,
        });

        res.status(200).json(rooms);

    }

    catch(error){

        res.status(500).json({
            message:error.message,
        });

    }

};

const incrementRoomView = async (req, res) => {
  try {
    const roomId = req.params.id;

    const room = await Room.findByIdAndUpdate(
      roomId,
      {
        $inc: { views: 1 },
      },
      {
        new: true,
      }
    );

    if (!room) {
      return res.status(404).json({
        message: "Room not found",
      });
    }

    res.status(200).json({
      message: "Room view updated",
      views: room.views,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to update room views",
    });
  }
};

module.exports = {
    getRooms,
    getRoomById,
    createRoom,
    updateRoom,
    deleteRoom,
    getMyRooms,
    incrementRoomView,
};