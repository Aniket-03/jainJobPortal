import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import dummyRoute from "./routes/dummy.route.js";
import cron from "node-cron";
import axios from "axios";

dotenv.config({});

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
  origin: ["http://localhost:5173", "https://jainjobportal.netlify.app"],
  credentials: true,
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

// api's
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);
app.use("/api/v1/dummy", dummyRoute);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running at port ${PORT}`);
});

cron.schedule("*/15 * * * *", async () => {
  try {
    const response = await axios.get(
      "http://localhost:8000/api/v1/dummy/getDummy"
    );
    console.log("API call successful:", response.data);
  } catch (error) {
    console.error("Error making API call:", error.message);
  }
});
