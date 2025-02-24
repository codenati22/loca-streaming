const fs = require("fs");
const path = require("path");

const streamVideo = (req, res) => {
  const videoId = req.params.videoId;
  const videoPath = path.join(__dirname, "../../public/assets/videos", videoId);

  if (!fs.existsSync(videoPath)) {
    return res.status(404).json({ error: "Video not found" });
  }

  const stat = fs.statSync(videoPath);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunkSize = end - start + 1;

    const stream = fs.createReadStream(videoPath, { start, end });

    res.writeHead(206, {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunkSize,
      "Content-Type": "video/mp4",
    });

    stream.pipe(res);
  } else {
    res.writeHead(200, {
      "Content-Length": fileSize,
      "Content-Type": "video/mp4",
    });

    fs.createReadStream(videoPath).pipe(res);
  }
};

const listVideos = (req, res) => {
  const videosDir = path.join(__dirname, "../../public/assets/videos");
  const imagesDir = path.join(__dirname, "../../public/assets/images");

  fs.readdir(videosDir, (err, files) => {
    if (err) {
      console.error("Error reading videos directory:", err);
      return res.status(500).json({ error: "Failed to fetch video list" });
    }

    const videos = files
      .filter((file) => file.endsWith(".mp4"))
      .map((file) => {
        const baseName = file.replace(".mp4", "");
        let thumbnail = `/assets/logo.png`;
        if (fs.existsSync(path.join(imagesDir, `${file}.png`))) {
          thumbnail = `/assets/images/${file}.png`;
        } else if (fs.existsSync(path.join(imagesDir, `${file}.jpeg`))) {
          thumbnail = `/assets/images/${file}.jpeg`;
        }

        return {
          filename: file,
          thumbnail,
          url: `/api/stream/${file}`,
        };
      });

    res.status(200).json({ videos });
  });
};

module.exports = { streamVideo, listVideos };
