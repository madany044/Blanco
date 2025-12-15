import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 4000;

/* =========================
   ROOT & HEALTH CHECK
   ========================= */
app.get("/", (req, res) => {
  res.send("Blanco Hiring Backend is running 🚀");
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

/* =========================
   START SERVER
   ========================= */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
