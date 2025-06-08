import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
const app = express();


app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser()); 
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(5000, () => console.log("Backend run"));
  })
  .catch((err) => console.error("MongoDB connection error:", err));