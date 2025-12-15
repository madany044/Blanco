import app from "./app.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send("Blanco Hiring Backend is running 🚀");
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

