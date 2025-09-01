import express from "express";
import cors from "cors";
import { getVideoMeta } from "downloadtiktok";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Setup __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve frontend files
app.use(express.static(path.join(__dirname, "public")));

// API endpoint to download TikTok video
app.post("/api/download-tiktok", async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "No URL provided" });

  try {
    const videoMeta = await getVideoMeta(url);
    const videoUrl = videoMeta.collector[0].videoUrl;
    res.json({ videoUrl });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch video", details: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));