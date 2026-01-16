
import express from "express";
import authRoutes from "./routes/AuthRoute.js";
import userRoutes from "./routes/User.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();


app.use(cors({
  origin: [
    "https://parking.netlify.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.options("*", cors());

app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

export default app;