require("dotenv").config();

const express = require("express");

const connectDB = require("./config/db");

const roomRoutes = require("./routes/roomRoutes");


const userRoutes = require("./routes/userRoutes");

const partnerRoutes = require("./routes/partnerRoutes");

const { notFound, errorHandler,} = require("./middleware/errorMiddleware");
const cors = require("cors");
const app = express();

app.use(express.json({limit: "10mb"})); // ye bahut bada data ko padne ke liye jo req.body ke through bheja jata hai
//Incoming JSON data ko JavaScript object me convert karta hai.

app.use(cors());

connectDB();

// they are the base base path
app.use("/rooms", roomRoutes);
app.use("/", userRoutes);       
app.use("/partners", partnerRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
   console.log(`Server running on port ${PORT}`);
});
