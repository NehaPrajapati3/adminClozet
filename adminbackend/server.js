import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/database.js";
import adminRoute from "./routes/adminRoute.js";
import storeRoute from "./routes/storeInfoRoute.js";
import path from "path";
import { fileURLToPath } from "url";


dotenv.config({});

const app = express();

const PORT = process.env.PORT || 5000;

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// const corsOption = {
//   origin: "http://localhost:3001",
//   credentials: true,
// };
// app.use(cors(corsOption));

// Serve static files from 'uploads' folder
app.use("/uploads", express.static("uploads"));

// Routes

app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/store", storeRoute);



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientBuildPath = path.join(__dirname, "../clozetweb/build");
app.use(express.static(clientBuildPath));

const corsOption = {
  origin: "*",
  credentials: true,
};
app.use(cors(corsOption));

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is listening at port ${PORT}`);
});
