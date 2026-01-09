import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import convertRoute from "./src/routes/convert.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/convert/mp3", convertRoute);

app.get("/", (req, res) => {
  res.json({ status: "Youtube -> MP3 API running" });
});

app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
