import express from "express";
import ytdl from "ytdl-core";
import ffmpeg from "fluent-ffmpeg";

const router = express.Router();

router.post("/mp3", async (req, res) => {
    const { url } = req.body;

    if (!url || !ytdl.validateURL(url)) {
        return res.status(400).json({ error: "Invalid Youtube URL" });
    }

    try {
        res.setHeader("Content-Type", "audio/mpeg");
        res.setHeader("Content-Disposition", 'attachment; filename="audio.mp3"');

        const stream = ytdl(url, {
            quality: "highestaudio",
            filter: "audioonly",
        });

        ffmpeg(stream)
            .audioBitrate(128)
            .format("mp3")
            .pipe(res, { end: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to process video"});
    }
    
});

export default router;