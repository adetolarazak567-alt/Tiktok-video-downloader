const express = require('express');
const cors = require('cors');
const axios = require('axios'); // for fetching TikTok video data
const app = express();

app.use(cors());
app.use(express.json());

app.post('/download', async (req, res) => {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: 'No URL provided' });

    try {
        // TikTok video fetch logic
        // Example using a public TikTok downloader API
        const apiResponse = await axios.get(`https://api.tiktokdownloaderapi.com/?url=${encodeURIComponent(url)}`);
        const videoUrl = apiResponse.data.video || null;

        if (!videoUrl) return res.status(500).json({ error: 'Video not found' });
        res.json({ videoUrl });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch video' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));