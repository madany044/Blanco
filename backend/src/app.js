import express from "express";
import cors from "cors";
import morgan from "morgan";

import authRoutes from "./routes/authRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

const app = express();

/* =========================
   CORS CONFIG (PRODUCTION SAFE)
   ========================= */
const allowedOrigins = [
  "http://localhost:5173",
  "https://blanco-hiring.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow non-browser clients (Postman, curl)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

/* =========================
   MIDDLEWARE
   ========================= */
app.use(express.json());
app.use(morgan("dev"));

/* =========================
   ROUTES
   ========================= */
app.use("/api/auth", authRoutes);
app.use("/api/application", applicationRoutes);
app.use("/api/admin", adminRoutes);

/* =========================
   FALLBACK (OPTIONAL)
   ========================= */
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

export default app;
